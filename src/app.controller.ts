import { Controller, Get } from '@nestjs/common';
import { Public } from '@/src/auth/constants';
import { ApiExtraModels } from '@nestjs/swagger';
import { UserDto } from '@/src/user/user.entity';
import { ProjectDto } from '@/src/project/project.entity';
import { AccessKeyDto } from '@/src/access-key/access-key.entity';

export class PaginationResultDto {
  list: object[];
  total: number;
  current: number;
}

@ApiExtraModels(PaginationResultDto, UserDto, ProjectDto, AccessKeyDto)
@Controller()
export class AppController {
  constructor() {}

  @Public()
  @Get()
  async health() {
    return {
      status: 'ok',
    };
  }
}
