import { IsNotEmpty } from 'class-validator';

export class CreateAccessKeyBody {
  @IsNotEmpty({ message: '请输入账户ID' })
  accountId: string;
  description: string;
  @IsNotEmpty({ message: '请输入过期时间' })
  expiration: string;
}
