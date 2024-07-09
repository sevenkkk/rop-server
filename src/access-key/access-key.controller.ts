import { Body, Controller, Delete, Param, Post, Put } from '@nestjs/common';
import { AccessKeyService } from '@/src/access-key/access-key.service';
import { ApiBearerAuth } from '@nestjs/swagger';
import {
  AccessKeyListDTO,
  CreateAccessKeyDTO,
  EnableAccessKeyDTO,
  UpdateAccessKeyDTO,
} from '@/src/access-key/access-key.model';
import { Auth } from '@/src/auth/auth.decorator';
import { AuthUser } from '@/src/auth/auth.model';

@ApiBearerAuth()
@Controller('access-key')
export class AccessKeyController {
  constructor(private accessKeyService: AccessKeyService) {}

  @Post('list')
  getAccessKeys(@Auth() user: AuthUser, @Body() body: AccessKeyListDTO) {
    return this.accessKeyService.getAccessKeyList(user, body);
  }

  @Post()
  creatAccessKey(@Auth() user: AuthUser, @Body() body: CreateAccessKeyDTO) {
    return this.accessKeyService.createAccessKey(user, body);
  }

  @Delete(':accessKey')
  deleteAccessKey(
    @Auth() user: AuthUser,
    @Param('accessKey') accessKey: string,
  ) {
    return this.accessKeyService.deleteAccessKey(user, accessKey);
  }

  @Put('enabled')
  enableAccessKey(@Auth() user: AuthUser, @Body() body: EnableAccessKeyDTO) {
    return this.accessKeyService.enableAccessKey(user, body);
  }

  @Put()
  updateAccessKey(@Auth() user: AuthUser, @Body() body: UpdateAccessKeyDTO) {
    return this.accessKeyService.updateAccessKey(user, body);
  }
}
