import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from '@/src/auth/auth.service';
import { Public } from '@/src/auth/constants';
import { AuthVO, LoginDTO, LoginVO, RegisterDTO } from '@/src/auth/auth.model';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() body: LoginDTO): Promise<LoginVO> {
    return this.authService.signIn(body);
  }

  @Public()
  @Post('register')
  async signUp(@Body() body: RegisterDTO): Promise<LoginVO> {
    return this.authService.register(body);
  }

  @Public()
  @Post('refresh')
  async refresh(@Body() { token }: { token: string }): Promise<AuthVO> {
    return this.authService.refreshToken(token);
  }
}
