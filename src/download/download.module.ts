import { Module } from '@nestjs/common';
import { DownloadService } from './download.service';
import { DownloadController } from './download.controller';
import { ShareModule } from '@/src/share/share.module';
import { EnvModule } from '@/src/env/env.module';

@Module({
  imports: [ShareModule, EnvModule],
  providers: [DownloadService],
  controllers: [DownloadController],
})
export class DownloadModule {}
