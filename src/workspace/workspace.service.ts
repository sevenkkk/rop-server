import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/src/prisma/prisma.service';
import { Prisma, Workspace } from '@prisma/client';

@Injectable()
export class WorkspaceService {
  constructor(private prisma: PrismaService) {}

  getWorkspace(
    whereUniqueInput: Prisma.WorkspaceWhereUniqueInput,
  ): Promise<Workspace | null> {
    return this.prisma.workspace.findUnique({
      where: whereUniqueInput,
    });
  }

  createWorkspace(data: Prisma.WorkspaceCreateInput): Promise<Workspace> {
    return this.prisma.workspace.create({
      data,
    });
  }

  updateWorkspace(params: {
    where: Prisma.WorkspaceWhereUniqueInput;
    data: Prisma.WorkspaceUpdateInput;
  }): Promise<Workspace> {
    const { where, data } = params;
    return this.prisma.workspace.update({
      data,
      where,
    });
  }
}
