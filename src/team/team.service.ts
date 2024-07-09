import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/src/prisma/prisma.service';
import { CreateTeamDTO } from '@/src/team/team.model';
import { nanoid } from 'nanoid';
import { AuthUser } from '@/src/auth/auth.model';
import { Role } from '@prisma/client';

@Injectable()
export class TeamService {
  constructor(private prisma: PrismaService) {}

  async create(user: AuthUser, body: CreateTeamDTO) {
    const { key, name, description } = body;
    const accountId = `${key}-${nanoid(8)}`;
    const team = await this.prisma.team.create({
      data: {
        key: key,
        name,
        description,
        account: {
          connectOrCreate: {
            where: { id: accountId },
            create: { id: accountId },
          },
        },
      },
    });
    await this.prisma.userTeam.create({
      data: {
        userId: user.sub,
        teamId: team.id,
        role: Role.ADMIN,
      },
    });
    return {
      team: team,
    };
  }
}
