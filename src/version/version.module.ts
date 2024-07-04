import { Module } from '@nestjs/common';
import { VersionService } from './version.service';
import { VersionController } from './version.controller';
import { ShareModule } from '@/src/share/share.module';
import { EnvModule } from '@/src/env/env.module';

@Module({
  imports: [ShareModule, EnvModule],
  providers: [VersionService],
  controllers: [VersionController],
})
export class VersionModule {}
