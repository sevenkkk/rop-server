import { Module } from '@nestjs/common';
import { TauriService } from './tauri.service';
import { TauriController } from './tauri.controller';
import { ShareModule } from '@/src/share/share.module';

@Module({
  imports: [ShareModule],
  providers: [TauriService],
  controllers: [TauriController],
})
export class TauriModule {}
