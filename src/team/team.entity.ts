import { IsNotEmpty } from 'class-validator';
import { Team } from '@prisma/client';

export class CreateTeamDto {
  @IsNotEmpty({ message: '请输入关键字' })
  key: string;
  name: string;
  description: string;
}

export class TeamDto implements Team {
  id: number;
  key: string;
  name: string;
  description: string;
}
