import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from '@/src/auth/auth.service';
import { Public } from '@/src/auth/constants';
import { Prisma } from '@prisma/client';
import { AuthResult, LoginBody, LoginResult } from '@/src/auth/auth.model';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() body: LoginBody): Promise<LoginResult> {
    return this.authService.signIn(body);
  }

  @Public()
  @Post('register')
  async signUp(@Body() body: Prisma.UserCreateInput): Promise<LoginResult> {
    return this.authService.register(body);
  }

  @Public()
  @Post('refresh')
  async refresh(@Body() { token }: { token: string }): Promise<AuthResult> {
    return this.authService.refreshToken(token);
  }
}
