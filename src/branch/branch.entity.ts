import { $Enums, Branch, ReleaseVersion } from '@prisma/client';
import { IsNotEmpty } from 'class-validator';
import { VersionDto } from '@/src/version/version.entity';

export class BranchListDto {
  @IsNotEmpty({ message: '请输入项目Id' })
  projectId: string;
}

export class BranchDto implements Branch {
  id: number;
  branch: string;
  projectId: string;
  releaseVersions: ReleaseVersionDto[];
}

export class ReleaseVersionDto implements ReleaseVersion {
  projectId: string;
  branchId: number;
  platform: $Enums.Platform;
  versionId: number;
  version: VersionDto;
}
