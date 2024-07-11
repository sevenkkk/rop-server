import { IsIn, IsNotEmpty } from 'class-validator';
import { $Enums, Version } from '@prisma/client';

export class UploadDto {
  @IsNotEmpty({ message: '请输入密钥' })
  accessKey: string;
  @IsNotEmpty({ message: '请输入项目名称' })
  projectName: string;
  @IsNotEmpty({ message: '请输入分支名称' })
  branch: string;
  @IsNotEmpty({ message: '请输入版本号' })
  version: string;
  @IsIn(['Android', 'IOS', 'Windows', 'MacOS', 'H5'], {
    message: '请选择正确的框架',
  })
  platform: 'Android' | 'IOS' | 'Windows' | 'MacOS' | 'H5';
}

export type uploadFileDto = {
  releaseFile: Express.Multer.File;
  updateFile: Express.Multer.File;
};

export enum Platform {
  Android = 'Android',
  IOS = 'IOS',
  Windows = 'Windows',
  MacOS = 'MacOS',
  H5 = 'H5',
}

export class VersionDto implements Version {
  id: number;
  version: string;
  path: string;
  sigPath: string;
  platform: $Enums.Platform;
  projectId: string;
  release: boolean;
  branchId: number;
  createdAt: Date;
  updatedAt: Date;
}
