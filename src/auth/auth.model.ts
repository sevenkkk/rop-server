import { User } from '@prisma/client';
import { IsNotEmpty } from 'class-validator';

export class LoginBody {
  @IsNotEmpty({
    message: '请输入用户名',
  })
  username: string;
  @IsNotEmpty({
    message: '请输入密码',
  })
  password: string;
}

export class RegisterBody {
  @IsNotEmpty({
    message: '请输入用户名',
  })
  username: string;
  @IsNotEmpty({
    message: '请输入密码',
  })
  password: string;
}

export type LoginResult = {
  auth: AuthResult;
  user: User;
};

export type AuthResult = {
  accessToken: string;
  refreshToken: string;
};

export type AuthUser = {
  sub: number;
  username: string;
};
