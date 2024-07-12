import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserService } from '@/src/user/user.service';
import { AuthUserDto } from '@/src/auth/auth.entity';
import { Auth } from '@/src/auth/auth.decorator';
import { ApiBearerAuth, ApiExtraModels, ApiOkResponse } from '@nestjs/swagger';
import { UserDto, UserListDto } from '@/src/user/user.entity';
import { ApiListResponse } from '@/src/share/api-list-response.decorator';

@ApiBearerAuth()
@Controller('user')
@ApiExtraModels(UserDto)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOkResponse({
    type: UserDto,
  })
  @Get()
  async userInfo(@Auth() authUser: AuthUserDto): Promise<UserDto> {
    const user = await this.userService.getUser({ id: authUser.sub });
    return { ...user, password: undefined };
  }

  @ApiListResponse(UserDto)
  @Post('list')
  userList(@Body() body: UserListDto) {
    return this.userService.getUserList(body);
  }
}
