import { IsBoolean, IsNotEmpty, IsNumber } from 'class-validator';
import { PaginationDTO } from '@/src/share/model';

export class CreateAccessKeyDTO {
  description: string;
  @IsNotEmpty({ message: '请输入过期时间' })
  expiration: string;
}

export class AccessKeyListDTO extends PaginationDTO {
  accessKey: string;
}

export class EnableAccessKeyDTO {
  @IsNumber(
    { allowNaN: false, allowInfinity: false, maxDecimalPlaces: 0 },
    { message: '请输入正确的id' },
  )
  id: number;
  @IsBoolean({ message: '请输入正确的状态' })
  status: boolean;
}

export class UpdateAccessKeyDTO {
  @IsNumber(
    { allowNaN: false, allowInfinity: false, maxDecimalPlaces: 0 },
    { message: '请输入正确的id' },
  )
  id: number;
  description: string;
  expiration: string;
}
