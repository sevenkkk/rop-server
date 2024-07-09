import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/src/prisma/prisma.service';
import { AccessKey } from '@prisma/client';
import {
  AccessKeyListDTO,
  CreateAccessKeyDTO,
  EnableAccessKeyDTO,
} from '@/src/access-key/access-key.model';
import { nanoid } from 'nanoid';
import { getSkip, PaginationVO } from '@/src/share/model';
import { AuthUser } from '@/src/auth/auth.model';

@Injectable()
export class AccessKeyService {
  constructor(private prisma: PrismaService) {}

  async getAccessKeyList(authUser: AuthUser, body: AccessKeyListDTO) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: authUser.sub,
      },
      include: {
        account: true,
      },
    });
    const accountId = user.account.id;
    const { accessKey } = body;
    const { page, pageSize: take, skip } = getSkip(body);
    const where = { accountId, accessKey: accessKey ? accessKey : undefined };
    const list = await this.prisma.accessKey.findMany({
      skip,
      take,
      where,
    });
    const count = await this.prisma.accessKey.count({
      where,
    });
    return new PaginationVO(list, count, page);
  }

  async createAccessKey(
    authUser: AuthUser,
    body: CreateAccessKeyDTO,
  ): Promise<AccessKey> {
    const user = await this.prisma.user.findUnique({
      where: {
        id: authUser.sub,
      },
      include: {
        account: true,
      },
    });
    const accountId = user.account.id;
    const { description, expiration } = body;
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

  async deleteAccessKey(
    authUser: AuthUser,
    accessKey: string,
  ): Promise<AccessKey> {
    const user = await this.prisma.user.findUnique({
      where: {
        id: authUser.sub,
      },
      include: {
        account: true,
      },
    });
    const accountId = user.account.id;
    return this.prisma.accessKey.delete({
      where: {
        accountId_accessKey: {
          accountId,
          accessKey,
        },
      },
    });
  }

  async enableAccessKey(authUser: AuthUser, body: EnableAccessKeyDTO) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: authUser.sub,
      },
      include: {
        account: true,
      },
    });
    const accountId = user.account.id;
    const { accessKey, status } = body;
    return this.prisma.accessKey.update({
      data: {
        enabled: status,
      },
      where: {
        accountId_accessKey: {
          accountId,
          accessKey,
        },
      },
    });
  }
}
