import { Branch } from '@prisma/client';
import { IsNotEmpty } from 'class-validator';

export class BranchListDto {
  @IsNotEmpty({ message: '请输入项目Id' })
  projectId: string;
}

export class BranchDto implements Branch {
  id: number;
  branch: string;
  projectId: string;
  releaseVersionId: number;
}
