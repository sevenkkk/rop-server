import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '@/src/prisma/prisma.service';
import { CreateTeamBody } from '@/src/team/team.model';
import { nanoid } from 'nanoid';

@Injectable()
export class TeamService {
  constructor(private prisma: PrismaService) {}

  async create(body: CreateTeamBody) {
    const { teamKey, teamDesc } = body;
    const team = await this.prisma.team.findUnique({
      where: { key: teamKey },
    });
    if (team) {
      throw new HttpException('用户名已存在', HttpStatus.BAD_REQUEST);
    }
    const accountId = `${teamKey}-${nanoid(8)}`;
    const newTeam = await this.prisma.team.create({
      data: {
        key: teamKey,
        description: teamDesc,
        Account: {
          connectOrCreate: {
            where: { id: accountId },
            create: { id: accountId },
          },
        },
      },
    });
    return {
      team: newTeam,
    };
  }
}
