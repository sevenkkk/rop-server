import { Injectable } from '@nestjs/common';
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
    await this.shareService.checkProjectPermission(authUser, projectId);
    return this.prisma.branch.findMany({
      where: {
        projectId,
      },
      include: {
        releaseVersions: {
          include: {
            version: true,
          },
        },
      },
    });
  }
}
