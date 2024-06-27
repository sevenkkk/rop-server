import { Module } from '@nestjs/common';
import { ShareModule } from '@/src/share/share.module';
import { UserController } from './user.controller';
import { UserService } from '@/src/user/user.service';

@Module({
  imports: [ShareModule],
  providers: [UserService],
  exports: [UserService],
  controllers: [UserController],
})
export class UserModule {}
