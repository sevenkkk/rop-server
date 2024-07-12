import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/src/prisma/prisma.service';
import { AuthUserDto } from '@/src/auth/auth.entity';
import {
  NotReleaseVersionListDto,
  ReleaseVersionReqDto,
  VersionListDto,
} from '@/src/version/version.entity';
import { ShareService } from '@/src/share/share.service';
import { getSkip, PaginationResultDto } from '@/src/share/share.entity';
import { Prisma } from '@prisma/client';

@Injectable()
export class VersionService {
  constructor(
    private prisma: PrismaService,
    private shareService: ShareService,
  ) {}

  async getVersionList(authUser: AuthUserDto, body: VersionListDto) {
    const { projectId, platform, branchId } = body;
    await this.shareService.checkProjectPermission(authUser, projectId);
    const { page, pageSize: take, skip } = getSkip(body);
    const where = {
      projectId,
      branchId: branchId ? branchId : undefined,
      platform: platform ? platform : undefined,
    };
    const list = await this.prisma.version.findMany({
      skip,
      take,
      where,
      orderBy: {
        createdAt: Prisma.SortOrder.desc,
      },
    });
    const count = await this.prisma.version.count({
      where,
    });
    return new PaginationResultDto(list, count, page);
  }

  async getNotReleaseVersionList(
    authUser: AuthUserDto,
    body: NotReleaseVersionListDto,
  ) {
    const { projectId, branchId, version } = body;
    await this.shareService.checkProjectPermission(authUser, projectId);
    return this.prisma.version.findMany({
      where: {
        projectId,
        branchId,
        version,
      },
    });
  }

  async releaseVersion(authUser: AuthUserDto, body: ReleaseVersionReqDto) {
    const { projectId, versionItems } = body;
    await this.shareService.checkProjectPermission(authUser, projectId);

    for (let i = 0; i < versionItems.length; i++) {
      const version = await this.prisma.version.findUnique({
        where: {
          id: versionItems[i].id,
        },
      });
      if (!version) {
        continue;
      }
      if (versionItems[i].notes) {
        await this.prisma.version.update({
          where: {
            id: versionItems[i].id,
          },
          data: {
            notes: versionItems[i].notes,
          },
        });
      }
      await this.prisma.releaseVersion.upsert({
        where: {
          projectId_branchId_platform: {
            projectId,
            branchId: version.branchId,
            platform: version.platform,
          },
        },
        create: {
          projectId,
          branchId: version.branchId,
          platform: version.platform,
          versionId: version.id,
        },
        update: {
          versionId: version.id,
        },
      });
    }
  }
}
