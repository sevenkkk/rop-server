import { Module } from '@nestjs/common';
import { UploadService } from './upload.service';
import { UploadController } from './upload.controller';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { mkdirsSync } from 'fs-extra';

@Module({
  imports: [
    MulterModule.register({
      storage: diskStorage({
        destination: (req, file, cb) => {
          console.log(req.params);
          const filePath = `public/download/${req.params.version}`;
          mkdirsSync(filePath);
          return cb(null, `./${filePath}`);
        },
        filename: (req, file, cb) => {
          return cb(null, file.originalname);
        },
      }),
    }),
  ],
  providers: [UploadService],
  controllers: [UploadController],
})
export class UploadModule {}
