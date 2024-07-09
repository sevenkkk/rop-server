import { IsIn, IsNotEmpty } from 'class-validator';
import { PaginationDTO } from '@/src/share/model';

export class CreateProjectDTO {
  @IsNotEmpty({ message: '请输入项目名称' })
  name: string;
  @IsIn(['TAURI', 'IONIC', 'FLUTTER'], { message: '请选择正确的框架' })
  framework: 'TAURI' | 'IONIC' | 'FLUTTER';
  description: string;
}

export class ProjectListDTO extends PaginationDTO {
  name: string;
}

export class UpdateProjectDTO {
  @IsNotEmpty({ message: '请输入项目id' })
  id: string;
  @IsIn(['TAURI', 'IONIC', 'FLUTTER'], { message: '请选择正确的框架' })
  framework: 'TAURI' | 'IONIC' | 'FLUTTER';
  description: string;
}
