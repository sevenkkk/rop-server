import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '@/src/prisma/prisma.service';
import { Prisma, AccessKey } from '@prisma/client';
import { CreateAccessKeyBody } from '@/src/access-key/access-key.model';
import { nanoid } from 'nanoid';

@Injectable()
export class AccessKeyService {
  constructor(private prisma: PrismaService) {}

  getAccessKeys(params: {
    where?: Prisma.AccessKeyWhereInput;
    orderBy?: Prisma.AccessKeyOrderByWithRelationInput;
  }): Promise<AccessKey[]> {
    const { orderBy, where } = params;
    return this.prisma.accessKey.findMany({
      orderBy,
      where,
    });
  }

  async createAccessKey(body: CreateAccessKeyBody): Promise<AccessKey> {
    const { accountId, description, expiration } = body;
    const account = await this.prisma.account.findUnique({
      where: { id: accountId },
    });
    if (!account) {
      throw new HttpException('账户不存在', HttpStatus.BAD_REQUEST);
    }
    const accessKey = nanoid(32);
    return this.prisma.accessKey.create({
      data: {
        accessKey,
        description,
        expiration: new Date(expiration),
        accountId,
        enabled: true,
      },
    });
  }

  deleteAccessKey(where: Prisma.AccessKeyWhereUniqueInput): Promise<AccessKey> {
    return this.prisma.accessKey.delete({
      where,
    });
  }
}
