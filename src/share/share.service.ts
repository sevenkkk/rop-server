import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/src/prisma/prisma.service';
import { AuthUser } from '@/src/auth/auth.model';

@Injectable()
export class ShareService {
  constructor(private prisma: PrismaService) {}

  getAuthUser(authUser: AuthUser) {
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
