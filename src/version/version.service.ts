import { Injectable } from '@nestjs/common';
import { Prisma, Version } from '@prisma/client';
import { PrismaService } from '@/src/prisma/prisma.service';

@Injectable()
export class VersionService {
  constructor(private prisma: PrismaService) {}

  getVersions(params: {
    skip?: number;
    take?: number;
    where?: Prisma.VersionWhereInput;
    orderBy?: Prisma.VersionOrderByWithRelationInput;
  }): Promise<Version[]> {
    const { orderBy, skip, take, where } = params;
    return this.prisma.version.findMany({
      orderBy,
      skip,
      take,
      where,
    });
  }

  createVersion(data: Prisma.VersionCreateInput): Promise<Version> {
    return this.prisma.version.create({
      data,
    });
  }

  updateVersion(params: {
    where: Prisma.VersionWhereUniqueInput;
    data: Prisma.VersionUpdateInput;
  }): Promise<Version> {
    const { where, data } = params;
    return this.prisma.version.update({
      data,
      where,
    });
  }

  deleteVersion(where: Prisma.VersionWhereUniqueInput): Promise<Version> {
    return this.prisma.version.delete({
      where,
    });
  }
}
