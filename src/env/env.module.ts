import { Module } from '@nestjs/common';
import { EnvService } from './env.service';
import { EnvController } from './env.controller';
import { ShareModule } from '@/src/share/share.module';

@Module({
  imports: [ShareModule],
  providers: [EnvService],
  exports: [EnvService],
  controllers: [EnvController],
})
export class EnvModule {}
