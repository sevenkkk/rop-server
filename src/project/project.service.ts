import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '@/src/prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { nanoid } from 'nanoid';
import {
  CreateProjectDTO,
  ProjectListDTO,
  UpdateProjectDTO,
} from '@/src/project/project.model';
import { getSkip, PaginationVO } from '@/src/share/model';
import { AuthUser } from '@/src/auth/auth.model';
import { ShareService } from '@/src/share/share.service';

@Injectable()
export class ProjectService {
  constructor(
    private prisma: PrismaService,
    private shareService: ShareService,
  ) {}

  async getProjectList(authUser: AuthUser, body: ProjectListDTO) {
    const user = await this.shareService.getAuthUser(authUser);
    const accountId = user.account.id;
    const { name } = body;
    const { page, pageSize: take, skip } = getSkip(body);
    const where = {
      accountId,
      name: name
        ? {
            contains: name,
          }
        : undefined,
    };
    const list = await this.prisma.project.findMany({
      skip,
      take,
      where,
      orderBy: {
        createdAt: Prisma.SortOrder.desc,
      },
    });
    const count = await this.prisma.project.count({
      where,
    });
    return new PaginationVO(list, count, page);
  }

  async createProject(authUser: AuthUser, body: CreateProjectDTO) {
    const { name, description, framework } = body;
    const user = await this.shareService.getAuthUser(authUser);
    const accountId = user.account.id;
    const project = await this.prisma.project.findUnique({
      where: {
        name_accountId: {
          name,
          accountId,
        },
      },
    });
    if (project) {
      throw new HttpException('项目已存在', HttpStatus.BAD_REQUEST);
    }
    if (!/^[A-Za-z0-9\/-]+$/.test(name)) {
      throw new HttpException('项目名称只能由英文组成', HttpStatus.BAD_REQUEST);
    }
    const id = `${name}-${nanoid(8)}`;
    return this.prisma.project.create({
      data: {
        id,
        name,
        framework,
        description,
        accountId: user.account.id,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });
  }

  async updateProject(authUser: AuthUser, body: UpdateProjectDTO) {
    const { id, description, framework } = body;
    const user = await this.shareService.getAuthUser(authUser);
    const accountId = user.account.id;
    return this.prisma.project.update({
      data: {
        description,
        framework,
        updatedAt: new Date(),
      },
      where: {
        id,
        accountId,
      },
    });
  }

  async deleteProject(authUser: AuthUser, id: string) {
    const user = await this.shareService.getAuthUser(authUser);
    const accountId = user.account.id;
    return this.prisma.project.delete({
      where: {
        id,
        accountId,
      },
    });
  }
}
