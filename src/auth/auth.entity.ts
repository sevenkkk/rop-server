import { IsNotEmpty } from 'class-validator';
import { UserDto } from '@/src/user/user.entity';

export class LoginDto {
  @IsNotEmpty({
    message: '请输入用户名',
  })
  username: string;
  @IsNotEmpty({
    message: '请输入密码',
  })
  password: string;
}

export class RegisterDto {
  @IsNotEmpty({
    message: '请输入用户名',
  })
  username: string;
  @IsNotEmpty({
    message: '请输入密码',
  })
  password: string;
}

export class LoginResultDto {
  auth: AuthDto;
  user: UserDto;
}

export class AuthDto {
  accessToken: string;
  refreshToken: string;
}

export class AuthUserDto {
  sub: number;
  username: string;
}
