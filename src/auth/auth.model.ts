import { Prisma, Role, User } from '@prisma/client';

export type LoginBody = Pick<Prisma.UserCreateInput, 'username' | 'password'>;

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

export type RegisterBody = {
  username: string;
  password: string;
};
