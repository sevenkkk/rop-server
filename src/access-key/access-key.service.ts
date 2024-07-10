import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/src/prisma/prisma.service';
import { AccessKey } from '@prisma/client';
import {
  AccessKeyListDto,
  CreateAccessKeyDto,
  EnableAccessKeyDto,
  UpdateAccessKeyDto,
} from '@/src/access-key/access-key.entity';
import { nanoid } from 'nanoid';
import { getSkip, PaginationResultDto } from '@/src/share/share.entity';
import { AuthUserDto } from '@/src/auth/auth.entity';
import { ShareService } from '@/src/share/share.service';

@Injectable()
export class AccessKeyService {
  constructor(
    private prisma: PrismaService,
    private shareService: ShareService,
  ) {}

  async getAccessKeyList(authUser: AuthUserDto, body: AccessKeyListDto) {
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
    return new PaginationResultDto(list, count, page);
  }

  async createAccessKey(
    authUser: AuthUserDto,
    body: CreateAccessKeyDto,
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
    authUser: AuthUserDto,
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

  async enableAccessKey(authUser: AuthUserDto, body: EnableAccessKeyDto) {
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

  async updateAccessKey(authUser: AuthUserDto, body: UpdateAccessKeyDto) {
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
