import { Body, Controller, Delete, Param, Post, Put } from '@nestjs/common';
import { EnvService } from '@/src/env/env.service';
import { ApiBearerAuth } from '@nestjs/swagger';

@ApiBearerAuth()
@Controller('env')
export class EnvController {
  constructor(private envService: EnvService) {}
  @Post('list')
  envList(@Body() body: { projectId: string }) {
    return this.envService.getEnvList({ where: { projectId: body.projectId } });
  }

  @Delete(':id')
  deleteEnv(@Param() body: { id: string }) {
    return this.envService.deleteEnv({ id: body.id });
  }

  @Put()
  updateEnv(@Body() body: { id: string; alias?: string }) {
    const { id, alias } = body;
    return this.envService.updateEnv({ where: { id }, data: { alias } });
  }
}
