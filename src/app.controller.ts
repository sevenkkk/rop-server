import { Controller, Get } from '@nestjs/common';
import { Public } from '@/src/auth/constants';

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
