import { User } from '@prisma/client';
import { IsNotEmpty } from 'class-validator';

export class LoginDTO {
  @IsNotEmpty({
    message: '请输入用户名',
  })
  username: string;
  @IsNotEmpty({
    message: '请输入密码',
  })
  password: string;
}

export class RegisterDTO {
  @IsNotEmpty({
    message: '请输入用户名',
  })
  username: string;
  @IsNotEmpty({
    message: '请输入密码',
  })
  password: string;
}

export type LoginVO = {
  auth: AuthVO;
  user: User;
};

export type AuthVO = {
  accessToken: string;
  refreshToken: string;
};

export type AuthUser = {
  sub: number;
  username: string;
};
