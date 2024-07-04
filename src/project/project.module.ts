import { Module } from '@nestjs/common';
import { ProjectService } from './project.service';
import { ProjectController } from './project.controller';
import { ShareModule } from '@/src/share/share.module';

@Module({
  imports: [ShareModule],
  providers: [ProjectService],
  controllers: [ProjectController],
})
export class ProjectModule {}
