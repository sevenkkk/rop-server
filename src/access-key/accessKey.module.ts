import { Module } from '@nestjs/common';
import { AccessKeyService } from './accessKey.service';
import { AccessKeyController } from './accessKey.controller';
import { ShareModule } from '@/src/share/share.module';

@Module({
  imports: [ShareModule],
  providers: [AccessKeyService],
  controllers: [AccessKeyController],
})
export class AccessKeyModule {}
