import { Controller, Get } from '@nestjs/common';
import { Public } from '@/src/auth/constants';
import { ApiExtraModels } from '@nestjs/swagger';

export class PaginationResultDto {
  list: object[];
  total: number;
  current: number;
}

@ApiExtraModels(PaginationResultDto)
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
