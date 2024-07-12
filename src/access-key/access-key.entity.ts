import { IsBoolean, IsNotEmpty, IsNumber } from 'class-validator';
import { PaginationDto } from '@/src/share/share.entity';
import { AccessKey } from '@prisma/client';

export class CreateAccessKeyDto {
  @IsNotEmpty({ message: '请输入项目Id' })
  projectId: string;
  description?: string;
  @IsNotEmpty({ message: '请输入过期时间' })
  expiration: string;
}

export class AccessKeyListDto extends PaginationDto {
  accessKey?: string;
}

export class AccessKeyDto implements AccessKey {
  id: number;
  accessKey: string;
  description: string;
  expiration: Date;
  enabled: boolean;
  projectId: string;
}

export class EnableAccessKeyDto {
  @IsNumber(
    { allowNaN: false, allowInfinity: false, maxDecimalPlaces: 0 },
    { message: '请输入正确的id' },
  )
  id: number;
  @IsBoolean({ message: '请输入正确的状态' })
  status: boolean;
}

export class UpdateAccessKeyDto {
  @IsNumber(
    { allowNaN: false, allowInfinity: false, maxDecimalPlaces: 0 },
    { message: '请输入正确的id' },
  )
  id: number;
  description?: string;
  expiration?: string;
}
