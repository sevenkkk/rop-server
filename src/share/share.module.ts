import { Module } from '@nestjs/common';
import { PrismaService } from '@/src/prisma/prisma.service';
import { ShareService } from './share.service';

@Module({
  providers: [PrismaService, ShareService],
  exports: [PrismaService, ShareService],
})
export class ShareModule {}
