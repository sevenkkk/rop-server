import { Injectable } from '@nestjs/common';
import { join } from 'path';
import { UploadModel } from '@/src/upload/upload.model';
import { mkdirsSync, writeFileSync } from 'fs-extra';

@Injectable()
export class UploadService {
  // 单个文件上传
  async uploadFile(file: Express.Multer.File, body: UploadModel) {
    const dir = `public/download/${body.version}`;
    mkdirsSync(join(__dirname, '../../', dir));
    const path = `${dir}/${file.originalname}`;
    const filePath = join(__dirname, '../../', path); // 构造文件路径
    writeFileSync(filePath, file.buffer); // 写入文件内容
    return {
      success: true,
      data: `/${path}`,
    };
  }
}
