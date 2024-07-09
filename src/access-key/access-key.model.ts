import { IsBoolean, IsNotEmpty, IsNumber } from 'class-validator';
import { Pagination } from '@/src/share/model';

export class CreateAccessKeyBody {
  @IsNotEmpty({ message: '请输入账户ID' })
  accountId: string;
  description: string;
  @IsNotEmpty({ message: '请输入过期时间' })
  expiration: string;
}

export class AccessKeyListBody extends Pagination {
  @IsNotEmpty({ message: '请输入账户ID' })
  accountId: string;
  accessKey: string;
}

export class EnableAccessKeyBody {
  @IsNumber(
    { allowNaN: false, allowInfinity: false, maxDecimalPlaces: 0 },
    { message: '请输入正确的id' },
  )
  id: number;
  @IsBoolean({ message: '请输入正确的状态' })
  status: boolean;
}
