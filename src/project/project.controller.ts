import { Body, Controller, Delete, Param, Post, Put } from '@nestjs/common';
import { ProjectService } from '@/src/project/project.service';
import { ApiBearerAuth } from '@nestjs/swagger';
import {
  CreateProjectDTO,
  ProjectListDTO,
  UpdateProjectDTO,
} from '@/src/project/project.model';
import { Auth } from '@/src/auth/auth.decorator';
import { AuthUser } from '@/src/auth/auth.model';

@ApiBearerAuth()
@Controller('project')
export class ProjectController {
  constructor(private projectService: ProjectService) {}

  @Post('list')
  projectList(@Auth() user: AuthUser, @Body() body: ProjectListDTO) {
    return this.projectService.getProjectList(user, body);
  }

  @Post()
  createProject(@Auth() user: AuthUser, @Body() body: CreateProjectDTO) {
    return this.projectService.createProject(user, body);
  }

  @Put()
  putProject(@Auth() user: AuthUser, @Body() body: UpdateProjectDTO) {
    return this.projectService.updateProject(user, body);
  }

  @Delete(':id')
  deleteProject(@Auth() user: AuthUser, @Param('id') id: string) {
    return this.projectService.deleteProject(user, id);
  }
}
