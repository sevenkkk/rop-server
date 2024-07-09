import { Body, Controller, Param, Post, Put } from '@nestjs/common';
import { PaginationDTO } from '@/src/share/model';
import { VersionSearchRequest } from '@/src/version/version.model';
import { VersionService } from '@/src/version/version.service';
import { ApiBearerAuth } from '@nestjs/swagger';

@ApiBearerAuth()
@Controller('version')
export class VersionController {
  constructor(private versionService: VersionService) {}
  // @Post('list')
  // versionList(@Body() body: Pagination<VersionSearchRequest>) {
  //   const { limit: skip, pageSize: take, projectId, envId } = body;
  //   return this.versionService.getVersions({
  //     skip,
  //     take,
  //     where: { projectId, envId },
  //   });
  // }
  //
  // @Post(':id')
  // deleteVersion(@Param() id: number) {
  //   return this.versionService.deleteVersion({ id });
  // }
  //
  // @Put(':id')
  // releaseVersion(@Body() body: { id: number; envId: string }) {
  //   const { id, envId } = body;
  //   this.envService.updateEnv({
  //     where: { id: envId },
  //     data: {
  //       lastVersion: {
  //         connect: { id },
  //       },
  //     },
  //   });
  //   this.versionService.updateVersion({
  //     where: { id },
  //     data: { release: true },
  //   });
  // }
}
