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
}
