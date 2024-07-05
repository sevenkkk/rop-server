import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/src/prisma/prisma.service';
import { Prisma, Env, Version } from '@prisma/client';

@Injectable()
export class EnvService {
  constructor(private prisma: PrismaService) {}

  // getEnv(
  //   whereUniqueInput: Prisma.EnvWhereUniqueInput,
  // ): Promise<(Env & { lastVersion: Version }) | null> {
  //   return this.prisma.env.findUnique({
  //     where: whereUniqueInput,
  //     include: {
  //       lastVersion: true,
  //     },
  //   });
  // }
  //
  // getEnvList(params: {
  //   skip?: number;
  //   take?: number;
  //   cursor?: Prisma.EnvWhereUniqueInput;
  //   where?: Prisma.EnvWhereInput;
  //   orderBy?: Prisma.EnvOrderByWithRelationInput;
  // }): Promise<Env[]> {
  //   const { skip, take, cursor, where, orderBy } = params;
  //   return this.prisma.env.findMany({
  //     skip,
  //     take,
  //     cursor,
  //     where,
  //     orderBy,
  //   });
  // }
  //
  // createEnv(data: Prisma.EnvCreateInput): Promise<Env | null> {
  //   return this.prisma.env.create({
  //     data,
  //   });
  // }
  //
  // deleteEnv(where: Prisma.EnvWhereUniqueInput): Promise<Env | null> {
  //   return this.prisma.env.delete({
  //     where,
  //   });
  // }
  //
  // updateEnv(params: {
  //   where: Prisma.EnvWhereUniqueInput;
  //   data: Prisma.EnvUpdateInput;
  // }): Promise<Env | null> {
  //   const { where, data } = params;
  //   return this.prisma.env.update({
  //     data,
  //     where,
  //   });
  // }
}
