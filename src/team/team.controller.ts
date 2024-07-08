import { Body, Controller, Post } from '@nestjs/common';
import { TeamService } from '@/src/team/team.service';
import { ApiBearerAuth } from '@nestjs/swagger';
import { CreateTeamBody } from '@/src/team/team.model';

@ApiBearerAuth()
@Controller('team')
export class TeamController {
  constructor(private readonly teamService: TeamService) {}

  @Post()
  createTeam(@Body() body: CreateTeamBody) {
    return this.teamService.create(body);
  }
}
