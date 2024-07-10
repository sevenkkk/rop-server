import { Body, Controller, Delete, Param, Post, Put } from '@nestjs/common';
import { ProjectService } from '@/src/project/project.service';
import { ApiBearerAuth } from '@nestjs/swagger';
import {
  CreateProjectDTO,
  ProjectDto,
  ProjectListDTO,
  UpdateProjectDTO,
} from '@/src/project/project.entity';
import { Auth } from '@/src/auth/auth.decorator';
import { AuthUserDto } from '@/src/auth/auth.entity';
import { ApiListResponse } from '@/src/share/api-list-response.decorator';

@ApiBearerAuth()
@Controller('project')
export class ProjectController {
  constructor(private projectService: ProjectService) {}

  @ApiListResponse(ProjectDto)
  @Post('list')
  projectList(@Auth() user: AuthUserDto, @Body() body: ProjectListDTO) {
    return this.projectService.getProjectList(user, body);
  }

  @Post()
  createProject(@Auth() user: AuthUserDto, @Body() body: CreateProjectDTO) {
    return this.projectService.createProject(user, body);
  }

  @Put()
  putProject(@Auth() user: AuthUserDto, @Body() body: UpdateProjectDTO) {
    return this.projectService.updateProject(user, body);
  }

  @Delete(':id')
  deleteProject(@Auth() user: AuthUserDto, @Param('id') id: string) {
    return this.projectService.deleteProject(user, id);
  }
}
