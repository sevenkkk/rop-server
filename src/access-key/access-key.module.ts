import { Module } from '@nestjs/common';
import { AccessKeyService } from './access-key.service';
import { AccessKeyController } from './access-key.controller';
import { ShareModule } from '@/src/share/share.module';

@Module({
  imports: [ShareModule],
  providers: [AccessKeyService],
  controllers: [AccessKeyController],
})
export class AccessKeyModule {}
