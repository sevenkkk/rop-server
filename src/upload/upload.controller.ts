import {
  Body,
  Controller,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { Public } from '../auth/constants';
import { UploadDto, uploadFileDto } from '@/src/upload/upload.entity';
import { UploadService } from '@/src/upload/upload.service';
import { ApiOkResponse, ApiParam } from '@nestjs/swagger';
import { VersionDto } from '@/src/version/version.entity';

@Controller('upload')
export class UploadController {
  constructor(private uploadService: UploadService) {}

  @ApiOkResponse({
    type: VersionDto,
  })
  @ApiParam({
    name: 'UploadDto',
    type: UploadDto,
  })
  @Public()
  @Post()
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'releaseFile', maxCount: 1 },
      { name: 'sigFile', maxCount: 1 },
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
