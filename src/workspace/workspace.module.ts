import { Module } from '@nestjs/common';
import { WorkspaceService } from './workspace.service';
import { ShareModule } from '@/src/share/share.module';

@Module({
  imports: [ShareModule],
  providers: [WorkspaceService],
})
export class WorkspaceModule {}
