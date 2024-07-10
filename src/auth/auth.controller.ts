import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from '@/src/auth/auth.service';
import { Public } from '@/src/auth/constants';
import {
  AuthDto,
  LoginDto,
  LoginResultDto,
  RegisterDto,
} from '@/src/auth/auth.entity';
import { ApiOkResponse } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOkResponse({
    type: LoginResultDto,
  })
  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() body: LoginDto): Promise<LoginResultDto> {
    return this.authService.signIn(body);
  }

  @ApiOkResponse({
    type: LoginResultDto,
  })
  @Public()
  @Post('register')
  async signUp(@Body() body: RegisterDto): Promise<LoginResultDto> {
    return this.authService.register(body);
  }

  @ApiOkResponse({
    type: AuthDto,
  })
  @Public()
  @Post('refresh')
  async refresh(@Body() { token }: { token: string }): Promise<AuthDto> {
    return this.authService.refreshToken(token);
  }
}
