import { IsNotEmpty } from 'class-validator';

export class CreateTeamBody {
  @IsNotEmpty({ message: '请输入team关键字' })
  teamKey: string;
  @IsNotEmpty({ message: '请输入team描述' })
  teamDesc: string;
}
