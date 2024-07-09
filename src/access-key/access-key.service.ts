import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/src/prisma/prisma.service';
import { AccessKey } from '@prisma/client';
import {
  AccessKeyListDTO,
  CreateAccessKeyDTO,
  EnableAccessKeyDTO,
  UpdateAccessKeyDTO,
} from '@/src/access-key/access-key.model';
import { nanoid } from 'nanoid';
import { getSkip, PaginationVO } from '@/src/share/model';
import { AuthUser } from '@/src/auth/auth.model';
import { ShareService } from '@/src/share/share.service';

@Injectable()
export class AccessKeyService {
  constructor(
    private prisma: PrismaService,
    private shareService: ShareService,
  ) {}

  async getAccessKeyList(authUser: AuthUser, body: AccessKeyListDTO) {
    const user = await this.shareService.getAuthUser(authUser);
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
    const user = await this.shareService.getAuthUser(authUser);
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
    const user = await this.shareService.getAuthUser(authUser);
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
    const user = await this.shareService.getAuthUser(authUser);
    const accountId = user.account.id;
    const { id, status } = body;
    return this.prisma.accessKey.update({
      data: {
        enabled: status,
      },
      where: {
        id,
        accountId,
      },
    });
  }

  async updateAccessKey(authUser: AuthUser, body: UpdateAccessKeyDTO) {
    const user = await this.shareService.getAuthUser(authUser);
    const accountId = user.account.id;
    const { id, expiration, description } = body;
    return this.prisma.accessKey.update({
      data: {
        expiration: expiration ? new Date(expiration) : undefined,
        description,
      },
      where: {
        id,
        accountId,
      },
    });
  }
}
