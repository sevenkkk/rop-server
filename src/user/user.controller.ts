import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserService } from '@/src/user/user.service';
import { AuthUser } from '@/src/auth/auth.model';
import { Auth } from '@/src/auth/auth.decorator';
import { ApiBearerAuth } from '@nestjs/swagger';
import { UserListBody } from '@/src/user/user.model';

@ApiBearerAuth()
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  userInfo(@Auth() user: AuthUser): Promise<any> {
    return this.userService.getUser({ id: user.sub });
  }

  @Post('list')
  userList(@Body() body: UserListBody) {
    return this.userService.getUserList(body);
  }
}
