import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/src/prisma/prisma.service';
import { Prisma, AccessKey } from '@prisma/client';

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

  createAccessKey(params: {
    data: Prisma.AccessKeyCreateInput;
  }): Promise<AccessKey> {
    const { data } = params;
    return this.prisma.accessKey.create({
      data,
    });
  }

  deleteAccessKey(where: Prisma.AccessKeyWhereUniqueInput): Promise<AccessKey> {
    return this.prisma.accessKey.delete({
      where,
    });
  }
}
