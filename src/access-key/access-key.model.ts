import { IsBoolean, IsNotEmpty, IsNumber } from 'class-validator';
import { PaginationDTO } from '@/src/share/model';

export class CreateAccessKeyDTO {
  description: string;
  @IsNotEmpty({ message: '请输入过期时间' })
  expiration: string;
}

export class AccessKeyListDTO extends PaginationDTO {
  @IsNotEmpty({ message: '请输入账户ID' })
  accountId: string;
  accessKey: string;
}

export class EnableAccessKeyDTO {
  @IsNotEmpty({ message: '请输入密钥' })
  accessKey: string;
  @IsBoolean({ message: '请输入正确的状态' })
  status: boolean;
}
