import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '@/src/user/user.service';
import {
  AuthResult,
  AuthUser,
  LoginBody,
  LoginResult,
} from '@/src/auth/auth.model';
import { Prisma, User } from '@prisma/client';
import { jwtConstants } from '@/src/auth/constants';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async signIn({ username, password }: LoginBody): Promise<LoginResult> {
    const user = await this.userService.getUser({ username });
    if (user?.password !== password) {
      throw new UnauthorizedException();
    }
    return {
      auth: await this.createAuth(user),
      user: { ...user, password: undefined },
    };
  }

  async register(body: Prisma.UserCreateInput): Promise<LoginResult> {
    const user = await this.userService.createUser(body);
    return {
      auth: await this.createAuth(user),
      user: { ...user, password: undefined },
    };
  }

  async refreshToken(token: string): Promise<AuthResult> {
    // 验证refresh_token
    const payload = await this.jwtService.verifyAsync(token, {
      secret: jwtConstants.secret,
    });
    const user = await this.userService.getUser({ id: payload.sub });
    return this.createAuth(user);
  }

  async createAuth(user: User): Promise<AuthResult> {
    const payload: AuthUser = { sub: user.id, username: user.username };
    return {
      accessToken: await this.jwtService.signAsync(payload, {
        expiresIn: '1h',
      }),
      refreshToken: await this.jwtService.signAsync(
        { sub: user.id },
        {
          expiresIn: '30d',
        },
      ),
    };
  }
}
