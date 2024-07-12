import { IsArray, IsNotEmpty, IsNumber, ValidateNested } from 'class-validator';
import { $Enums, Version } from '@prisma/client';
import { PaginationDto } from '@/src/share/share.entity';

export class VersionListDto extends PaginationDto {
  @IsNotEmpty({
    message: '请输入项目Id',
  })
  projectId: string;
  branchId?: number;
  platform?: 'Android' | 'IOS' | 'Windows' | 'MacOS' | 'H5';
}

export class NotReleaseVersionListDto {
  @IsNotEmpty({ message: '请输入项目Id' })
  projectId: string;
  @IsNumber(
    { allowNaN: false, allowInfinity: false, maxDecimalPlaces: 0 },
    { message: '请输入正确的分支Id' },
  )
  branchId: number;
  @IsNotEmpty({ message: '请输入项目版本号' })
  version: string;
}

export class ReleaseVersionReqDto {
  @IsNotEmpty({ message: '请输入项目Id' })
  projectId: string;
  @IsArray({
    message: 'versionItems is require',
  })
  @ValidateNested({
    each: true,
  })
  versionItems: releaseVersionItem[];
}

export class releaseVersionItem {
  @IsNumber(
    { allowNaN: false, allowInfinity: false, maxDecimalPlaces: 0 },
    { message: '请输入正确的分支Id' },
  )
  id: number;
  notes?: string;
}

export class VersionDto implements Version {
  id: number;
  version: string;
  path: string;
  sigPath: string;
  platform: $Enums.Platform;
  arch: string;
  notes: string;
  projectId: string;
  release: boolean;
  branchId: number;
  createdAt: Date;
  updatedAt: Date;
}
