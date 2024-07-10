import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/src/prisma/prisma.service';
import { Prisma, User } from '@prisma/client';
import { getSkip, PaginationResultDto } from '@/src/share/share.entity';
import { UserListDto } from '@/src/user/user.entity';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async getUser(
    whereUniqueInput: Prisma.UserWhereUniqueInput,
  ): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: whereUniqueInput,
      include: {
        account: true,
        userTeams: true,
      },
    });
  }

  async getUserList(body: UserListDto) {
    const { username } = body;
    const { page, pageSize: take, skip } = getSkip(body);
    const where: Prisma.UserWhereInput = username
      ? {
          username: {
            contains: username,
          },
        }
      : undefined;
    const userList = await this.prisma.user.findMany({
      skip,
      take,
      where,
      select: {
        id: true,
        username: true,
        account: true,
      },
    });
    const count = await this.prisma.user.count({
      where,
    });
    return new PaginationResultDto(userList, count, page);
  }

  async createUser(data: Prisma.UserCreateInput): Promise<User> {
    return this.prisma.user.create({
      data,
    });
  }

  async updateUser(params: {
    where: Prisma.UserWhereUniqueInput;
    data: Prisma.UserUpdateInput;
  }): Promise<User> {
    const { where, data } = params;
    return this.prisma.user.update({
      data,
      where,
    });
  }

  async deleteUser(where: Prisma.UserWhereUniqueInput): Promise<User> {
    return this.prisma.user.delete({
      where,
    });
  }
}
