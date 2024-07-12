import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '@/src/prisma/prisma.service';
import { AuthUserDto } from '@/src/auth/auth.entity';

@Injectable()
export class ShareService {
  constructor(private prisma: PrismaService) {}

  getAuthUser(authUser: AuthUserDto) {
    return this.prisma.user.findUnique({
      where: {
        id: authUser.sub,
      },
      include: {
        account: true,
      },
    });
  }

  async checkProjectPermission(authUser: AuthUserDto, projectId: string) {
    const user = await this.getAuthUser(authUser);
    const accountId = user.account.id;
    const project = await this.prisma.project.findUnique({
      where: {
        id: projectId,
        accountId,
      },
    });
    if (!project) {
      throw new HttpException('项目不存在', HttpStatus.BAD_REQUEST);
    }
    return {
      user,
      project,
    };
  }

  async checkAccessKeyPermission(authUser: AuthUserDto, accessKeyId: number) {
    const user = await this.getAuthUser(authUser);
    const accountId = user.account.id;
    const accessKeyObj = await this.prisma.accessKey.findUnique({
      where: {
        id: accessKeyId,
      },
      include: {
        project: true,
      },
    });
    if (accessKeyObj || accessKeyObj.project.accountId == accountId) {
      throw new HttpException('accessKey不存在', HttpStatus.BAD_REQUEST);
    }
  }
}
