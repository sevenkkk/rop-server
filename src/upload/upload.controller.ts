import {
  Body,
  Controller,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { Public } from '../auth/constants';
import {
  UploadDto,
  uploadFileDto,
  VersionDto,
} from '@/src/upload/upload.entity';
import { UploadService } from '@/src/upload/upload.service';
import { ApiOkResponse } from '@nestjs/swagger';

@Controller('upload')
export class UploadController {
  constructor(private uploadService: UploadService) {}

  @ApiOkResponse({
    type: VersionDto,
  })
  @Public()
  @Post()
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'releaseFile', maxCount: 1 },
      { name: 'updateFile', maxCount: 1 },
    ]),
  )
  uploadFile(
    @UploadedFiles()
    files: uploadFileDto,
    @Body() body: UploadDto,
  ) {
    return this.uploadService.uploadFile(files, body);
  }
}
