import { PaginationDto } from '@/src/share/share.entity';
import { User, Account, UserTeam, $Enums } from '@prisma/client';
import { ApiHideProperty } from '@nestjs/swagger';

export class UserListDto extends PaginationDto {
  username?: string;
}

export class UserDto implements User {
  id: number;
  username: string;
  @ApiHideProperty()
  password: string;
  account?: AccountDto;
  userTeams?: UserTeamDto[];
}

export class AccountDto implements Account {
  id: string;
  userId: number;
  teamId: number;
}

export class UserTeamDto implements UserTeam {
  userId: number;
  teamId: number;
  role: $Enums.Role;
}
