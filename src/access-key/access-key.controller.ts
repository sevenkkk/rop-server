import { Body, Controller, Delete, Param, Post, Put } from '@nestjs/common';
import { AccessKeyService } from '@/src/access-key/access-key.service';
import { ApiBearerAuth } from '@nestjs/swagger';
import {
  AccessKeyListBody,
  CreateAccessKeyBody,
  EnableAccessKeyBody,
} from '@/src/access-key/access-key.model';

@ApiBearerAuth()
@Controller('access-key')
export class AccessKeyController {
  constructor(private accessKeyService: AccessKeyService) {}

  @Post('list')
  getAccessKeys(@Body() body: AccessKeyListBody) {
    return this.accessKeyService.getAccessKeyList(body);
  }

  @Post()
  creatAccessKey(@Body() body: CreateAccessKeyBody) {
    return this.accessKeyService.createAccessKey(body);
  }

  @Delete(':id')
  deleteAccessKey(@Param() params: { id: string }) {
    return this.accessKeyService.deleteAccessKey(parseInt(params.id));
  }

  @Put('enabled')
  enableAccessKey(@Body() body: EnableAccessKeyBody) {
    return this.accessKeyService.enableAccessKey(body);
  }
}
