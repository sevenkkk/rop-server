import {
  Body,
  Controller,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { Public } from '../auth/constants';
import { uploadFile, UploadModel } from '@/src/upload/upload.model';
import { UploadService } from '@/src/upload/upload.service';

@Controller('upload')
export class UploadController {
  constructor(private uploadService: UploadService) {}
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
    files: uploadFile,
    @Body() body: UploadModel,
  ) {
    return this.uploadService.uploadFile(files, body);
    // return 'ok';
  }
}
