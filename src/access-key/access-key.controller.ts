import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { AccessKeyService } from '@/src/access-key/access-key.service';
import { Auth } from '@/src/auth/auth.decorator';
import { AuthUser } from '@/src/auth/auth.model';
import { Prisma } from '@prisma/client';
import { ApiBearerAuth } from '@nestjs/swagger';
import { CreateAccessKeyBody } from '@/src/access-key/access-key.model';

@ApiBearerAuth()
@Controller('access-key')
export class AccessKeyController {
  constructor(private accessKeyService: AccessKeyService) {}

  // @Get('list')
  // getAccessKeys(@Auth() authUser: AuthUser) {
  //   return this.accessKeyService.getAccessKeys({
  //     where: { workspaceId: authUser.workspace },
  //   });
  // }
  //
  @Post()
  creatAccessKey(@Body() body: CreateAccessKeyBody) {
    console.log(typeof body.expiration); // true
    return this.accessKeyService.createAccessKey(body);
  }
  //
  // @Delete(':id')
  // deleteAccessKey(@Param() accessKey: string, @Auth() authUser: AuthUser) {
  //   return this.accessKeyService.deleteAccessKey({
  //     accessKey,
  //     workspaceId: authUser.workspace,
  //   });
  // }
}
