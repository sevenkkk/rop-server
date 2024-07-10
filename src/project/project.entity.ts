import { IsIn, IsNotEmpty } from 'class-validator';
import { PaginationDto } from '@/src/share/share.entity';
import { $Enums, Project } from '@prisma/client';

export class CreateProjectDTO {
  @IsNotEmpty({ message: '请输入项目名称' })
  name: string;
  @IsIn(['TAURI', 'IONIC', 'FLUTTER'], { message: '请选择正确的框架' })
  framework: 'TAURI' | 'IONIC' | 'FLUTTER';
  description: string;
}

export class ProjectListDTO extends PaginationDto {
  name: string;
}

export class UpdateProjectDTO {
  @IsNotEmpty({ message: '请输入项目id' })
  id: string;
  @IsIn(['TAURI', 'IONIC', 'FLUTTER'], { message: '请选择正确的框架' })
  framework: 'TAURI' | 'IONIC' | 'FLUTTER';
  description: string;
}

export class ProjectDto implements Project {
  id: string;
  name: string;
  framework: Framework;
  description: string;
  accountId: string;
  createdAt: Date;
  updatedAt: Date;
}

export enum Framework {
  TAURI = 'TAURI',
  IONIC = 'IONIC',
  FLUTTER = 'FLUTTER',
}
