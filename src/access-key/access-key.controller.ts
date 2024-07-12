import {
  Body,
  Controller,
  Delete,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { AccessKeyService } from '@/src/access-key/access-key.service';
import { ApiBearerAuth, ApiExtraModels } from '@nestjs/swagger';
import {
  AccessKeyDto,
  AccessKeyListDto,
  CreateAccessKeyDto,
  EnableAccessKeyDto,
  UpdateAccessKeyDto,
} from '@/src/access-key/access-key.entity';
import { Auth } from '@/src/auth/auth.decorator';
import { AuthUserDto } from '@/src/auth/auth.entity';
import { ApiListResponse } from '@/src/share/api-list-response.decorator';

@ApiBearerAuth()
@Controller('access-key')
@ApiExtraModels(AccessKeyDto)
export class AccessKeyController {
  constructor(private accessKeyService: AccessKeyService) {}

  @ApiListResponse(AccessKeyDto)
  @Post('list')
  getAccessKeys(@Auth() user: AuthUserDto, @Body() body: AccessKeyListDto) {
    return this.accessKeyService.getAccessKeyList(user, body);
  }

  @Post()
  creatAccessKey(@Auth() user: AuthUserDto, @Body() body: CreateAccessKeyDto) {
    return this.accessKeyService.createAccessKey(user, body);
  }

  @Delete(':id')
  deleteAccessKey(
    @Auth() user: AuthUserDto,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.accessKeyService.deleteAccessKey(user, id);
  }

  @Put('enabled')
  enableAccessKey(@Auth() user: AuthUserDto, @Body() body: EnableAccessKeyDto) {
    return this.accessKeyService.enableAccessKey(user, body);
  }

  @Put()
  updateAccessKey(@Auth() user: AuthUserDto, @Body() body: UpdateAccessKeyDto) {
    return this.accessKeyService.updateAccessKey(user, body);
  }
}
