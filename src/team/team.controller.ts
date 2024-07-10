import { Body, Controller, Post } from '@nestjs/common';
import { TeamService } from '@/src/team/team.service';
import { ApiBearerAuth } from '@nestjs/swagger';
import { CreateTeamDto } from '@/src/team/team.entity';
import { Auth } from '@/src/auth/auth.decorator';
import { AuthUserDto } from '@/src/auth/auth.entity';

@ApiBearerAuth()
@Controller('team')
export class TeamController {
  constructor(private readonly teamService: TeamService) {}

  @Post()
  createTeam(@Auth() user: AuthUserDto, @Body() body: CreateTeamDto) {
    return this.teamService.create(user, body);
  }
}
