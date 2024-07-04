import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Res,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { Public } from '../auth/constants';
import { UploadModel } from '@/src/upload/upload.model';
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
    files: {
      releaseFile: Express.Multer.File[];
      updateFile: Express.Multer.File[];
    },
    @Body() body: UploadModel,
  ) {
    this.uploadService.uploadFile(files[0], body);
    return 'ok';
  }
}
