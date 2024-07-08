import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '@/src/user/user.service';
import {
  AuthResult,
  AuthUser,
  LoginBody,
  LoginResult,
  RegisterBody,
} from '@/src/auth/auth.model';
import { User } from '@prisma/client';
import { jwtConstants } from '@/src/auth/constants';
import { nanoid } from 'nanoid';

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

  async register(body: RegisterBody): Promise<LoginResult> {
    const { username, password } = body;
    const user = await this.userService.getUser({ username });
    if (user) {
      throw new HttpException('用户名已存在', HttpStatus.BAD_REQUEST);
    }
    const accountId = `${username}-${nanoid(8)}`;
    const newUser = await this.userService.createUser({
      username,
      password,
      Account: {
        connectOrCreate: {
          where: { id: accountId },
          create: { id: accountId },
        },
      },
    });
    return {
      auth: await this.createAuth(newUser),
      user: { ...newUser, password: undefined },
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
    const payload: AuthUser = {
      sub: user.id,
      username: user.username,
    };
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
