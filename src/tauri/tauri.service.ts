import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '@/src/prisma/prisma.service';
import { TauriSigReqDto, TauriSigResDto } from '@/src/tauri/tauri.entity';
import { format } from 'date-fns';

@Injectable()
export class TauriService {
  constructor(private prisma: PrismaService) {}

  async uriSigJson(params: TauriSigReqDto) {
    const { project, branch, platform, arch, version } = params;

    const branchObj = await this.prisma.branch.findUnique({
      where: {
        branch_projectId: {
          branch,
          projectId: project,
        },
      },
    });

    if (!branchObj) {
      throw new HttpException('分支不存在', HttpStatus.BAD_REQUEST);
    }

    const versionObj = await this.prisma.version.findUnique({
      where: {
        projectId_branchId_version_platform_arch: {
          projectId: project,
          branchId: branchObj.id,
          version,
          platform,
          arch,
        },
      },
    });

    if (!versionObj) {
      throw new HttpException('版本不存在', HttpStatus.BAD_REQUEST);
    }

    return new TauriSigResDto(
      versionObj.version,
      format(versionObj.createdAt, "yyyy-MM-dd'T'HH:mm:ssXXX"),
      versionObj.sigPath,
      versionObj.signature,
      versionObj.notes ? versionObj.notes : '',
    );
  }
}
