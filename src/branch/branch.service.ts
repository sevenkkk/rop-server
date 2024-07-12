import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '@/src/prisma/prisma.service';
import { ShareService } from '@/src/share/share.service';
import { AuthUserDto } from '@/src/auth/auth.entity';
import { BranchListDto } from '@/src/branch/branch.entity';

@Injectable()
export class BranchService {
  constructor(
    private prisma: PrismaService,
    private shareService: ShareService,
  ) {}

  async getBranchList(authUser: AuthUserDto, body: BranchListDto) {
    const { projectId } = body;
    const user = await this.shareService.getAuthUser(authUser);
    const accountId = user.account.id;
    const project = this.prisma.project.findUnique({
      where: {
        id: projectId,
        accountId,
      },
    });
    if (!project) {
      throw new HttpException('项目不存在', HttpStatus.BAD_REQUEST);
    }
    return this.prisma.branch.findMany({
      where: {
        projectId,
      },
      include: {
        versions: true,
      },
    });
  }
}
