import { Body, Controller, Post } from '@nestjs/common';
import { TeamService } from '@/src/team/team.service';
import { ApiBearerAuth } from '@nestjs/swagger';
import { CreateTeamDTO } from '@/src/team/team.model';
import { Auth } from '@/src/auth/auth.decorator';
import { AuthUser } from '@/src/auth/auth.model';

@ApiBearerAuth()
@Controller('team')
export class TeamController {
  constructor(private readonly teamService: TeamService) {}

  @Post()
  createTeam(@Auth() user: AuthUser, @Body() body: CreateTeamDTO) {
    return this.teamService.create(user, body);
  }
}
