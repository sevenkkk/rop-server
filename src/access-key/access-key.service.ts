import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '@/src/prisma/prisma.service';
import { AccessKey } from '@prisma/client';
import {
  AccessKeyListDto,
  CreateAccessKeyDto,
  EnableAccessKeyDto,
  UpdateAccessKeyDto,
} from '@/src/access-key/access-key.entity';
import { nanoid } from 'nanoid';
import { getSkip, PaginationResultDto } from '@/src/share/share.entity';
import { AuthUserDto } from '@/src/auth/auth.entity';
import { ShareService } from '@/src/share/share.service';

@Injectable()
export class AccessKeyService {
  constructor(
    private prisma: PrismaService,
    private shareService: ShareService,
  ) {}

  async getAccessKeyList(authUser: AuthUserDto, body: AccessKeyListDto) {
    const user = await this.shareService.getAuthUser(authUser);
    const accountId = user.account.id;
    const { accessKey } = body;
    const { page, pageSize: take, skip } = getSkip(body);
    const where = { accountId, accessKey: accessKey ? accessKey : undefined };
    const list = await this.prisma.accessKey.findMany({
      skip,
      take,
      where,
    });
    const count = await this.prisma.accessKey.count({
      where,
    });
    return new PaginationResultDto(list, count, page);
  }

  async createAccessKey(
    authUser: AuthUserDto,
    body: CreateAccessKeyDto,
  ): Promise<AccessKey> {
    const { projectId, description, expiration } = body;
    await this.shareService.checkProjectPermission(authUser, projectId);
    const accessKey = nanoid(32);
    return this.prisma.accessKey.create({
      data: {
        accessKey,
        description,
        expiration: new Date(expiration),
        projectId,
        enabled: true,
      },
    });
  }

  async deleteAccessKey(authUser: AuthUserDto, id: number): Promise<AccessKey> {
    await this.shareService.checkAccessKeyPermission(authUser, id);
    return this.prisma.accessKey.delete({
      where: {
        id,
      },
    });
  }

  async enableAccessKey(authUser: AuthUserDto, body: EnableAccessKeyDto) {
    const user = await this.shareService.getAuthUser(authUser);
    const accountId = user.account.id;
    const { id, status } = body;
    const accessKeyObj = await this.prisma.accessKey.findUnique({
      where: {
        id,
      },
      include: {
        project: true,
      },
    });
    if (accessKeyObj || accessKeyObj.project.accountId == accountId) {
      throw new HttpException('accessKey不存在', HttpStatus.BAD_REQUEST);
    }
    return this.prisma.accessKey.update({
      data: {
        enabled: status,
      },
      where: {
        id,
      },
    });
  }

  async updateAccessKey(authUser: AuthUserDto, body: UpdateAccessKeyDto) {
    const { id, expiration, description } = body;
    await this.shareService.checkAccessKeyPermission(authUser, id);
    return this.prisma.accessKey.update({
      data: {
        expiration: expiration ? new Date(expiration) : undefined,
        description,
      },
      where: {
        id,
      },
    });
  }
}
