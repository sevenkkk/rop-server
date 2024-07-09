import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '@/src/prisma/prisma.service';
import { Prisma, AccessKey } from '@prisma/client';
import {
  AccessKeyListBody,
  CreateAccessKeyBody,
  EnableAccessKeyBody,
} from '@/src/access-key/access-key.model';
import { nanoid } from 'nanoid';
import { getSkip, PaginationResult } from '@/src/share/model';

@Injectable()
export class AccessKeyService {
  constructor(private prisma: PrismaService) {}

  async getAccessKeyList(body: AccessKeyListBody) {
    const { accountId, accessKey } = body;
    const account = await this.prisma.account.findUnique({
      where: { id: accountId },
    });
    if (!account) {
      throw new HttpException('账户不存在', HttpStatus.BAD_REQUEST);
    }
    const { page, pageSize: take, skip } = getSkip(body);
    const where = { accountId, accessKey: accessKey ? accessKey : undefined };
    const list = await this.prisma.accessKey.findMany({
      skip,
      take,
      where,
    });
    const count = await this.prisma.accessKey.count({});
    return new PaginationResult(list, count, page);
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

  deleteAccessKey(id: number): Promise<AccessKey> {
    return this.prisma.accessKey.delete({
      where: {
        id,
      },
    });
  }

  enableAccessKey(body: EnableAccessKeyBody) {
    const { id, status } = body;
    return this.prisma.accessKey.update({
      data: {
        enabled: status,
      },
      where: {
        id,
      },
    });
  }
}
