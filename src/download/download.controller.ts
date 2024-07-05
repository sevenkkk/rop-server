import { Controller, Get, Param, Res } from '@nestjs/common';
import { Public } from '@/src/auth/constants';
import { Response } from 'express';
import fs from 'node:fs';
import { EnvService } from '@/src/env/env.service';
import { DownloadParamType } from '@/src/download/download.model';

@Controller('download')
export class DownloadController {
  constructor(private envService: EnvService) {}

  // @Public()
  // @Get('/:workspace/:project/:.env/:version/:fileName')
  // downloadFile(@Param() params: DownloadParamType, @Res() res: Response) {
  //   const { workspace, project, version, fileName, env } = params;
  //   const filePath = `./public/${workspace}/${project}/${env}/${version}/${fileName}`;
  //   const stream = fs.createReadStream(filePath);
  //   stream.pipe(res);
  // }
  //
  // @Public()
  // @Get('/:workspace/:project/:.env/last/:fileName')
  // async downloadLastFile(
  //   @Param() params: Omit<DownloadParamType, 'version'>,
  //   @Res() res: Response,
  // ) {
  //   const { workspace, project, fileName, env } = params;
  //   const result = await this.envService.getEnv({ id: env });
  //   if (result && result.lastVersion) {
  //     const version = result.lastVersion.version;
  //     const filePath = `./public/${workspace}/${project}/${env}/${version}/${fileName}`;
  //     const stream = fs.createReadStream(filePath);
  //     stream.pipe(res);
  //   } else {
  //     return 'not found';
  //   }
  // }
}
