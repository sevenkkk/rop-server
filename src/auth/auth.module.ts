import { Module } from '@nestjs/common';
import { AuthController } from '@/src/auth/auth.controller';
import { AuthService } from '@/src/auth/auth.service';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from '@/src/auth/constants';
import { AuthGuard } from '@/src/auth/auth.guard';
import { APP_GUARD } from '@nestjs/core';
import { UserModule } from '@/src/user/user.module';

@Module({
  imports: [
    UserModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '30d' },
    }),
  ],
  controllers: [AuthController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    AuthService,
  ],
})
export class AuthModule {}
