import { IsNotEmpty } from 'class-validator';

export class CreateTeamDTO {
  @IsNotEmpty({ message: '请输入关键字' })
  key: string;
  name: string;
  description: string;
}
