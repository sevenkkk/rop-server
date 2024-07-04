import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ProjectService } from '@/src/project/project.service';
import {
  CreateProjectRequest,
  UpdateProjectRequest,
} from '@/src/project/project.model';
import { Project } from '@prisma/client';
import { ApiBearerAuth } from '@nestjs/swagger';

@ApiBearerAuth()
@Controller('project')
export class ProjectController {
  constructor(private projectService: ProjectService) {}

  @Get(':id')
  project(@Param() id: string): Promise<Project> {
    return this.projectService.getProject({ id });
  }

  @Get('list')
  projectList(): Promise<Project[]> {
    return this.projectService.getProjects({ orderBy: { createdAt: 'desc' } });
  }

  @Post()
  createProject(@Body() body: CreateProjectRequest) {
    return this.projectService.createProject({
      ...body,
      workspace: { connect: { id: body.workspaceId } },
    });
  }

  @Put()
  putProject(@Body() body: UpdateProjectRequest) {
    return this.projectService.updateProject({
      where: { id: body.id },
      data: body,
    });
  }

  @Delete(':id')
  deleteProject(@Param() id: string) {
    return this.projectService.deleteProject({ id });
  }
}
