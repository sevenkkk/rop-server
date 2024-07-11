import { Module } from '@nestjs/common';
import { UploadService } from './upload.service';
import { UploadController } from './upload.controller';
import { ShareModule } from '@/src/share/share.module';

@Module({
  imports: [ShareModule],
  providers: [UploadService],
  controllers: [UploadController],
})
export class UploadModule {}
