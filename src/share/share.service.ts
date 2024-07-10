import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/src/prisma/prisma.service';
import { AuthUserDto } from '@/src/auth/auth.entity';

@Injectable()
export class ShareService {
  constructor(private prisma: PrismaService) {}

  getAuthUser(authUser: AuthUserDto) {
    return this.prisma.user.findUnique({
      where: {
        id: authUser.sub,
      },
      include: {
        account: true,
      },
    });
  }
}
