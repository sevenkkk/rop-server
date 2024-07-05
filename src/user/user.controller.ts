import { Controller, Get } from '@nestjs/common';
import { UserService } from '@/src/user/user.service';
import { AuthUser } from '@/src/auth/auth.model';
import { Auth } from '@/src/auth/auth.decorator';
import { ApiBearerAuth } from '@nestjs/swagger';

@ApiBearerAuth()
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  userInfo(@Auth() user: AuthUser): Promise<any> {
    console.log(user);
    return this.userService.getUser({ id: user.sub });
  }
}
