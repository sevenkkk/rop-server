import { Module } from '@nestjs/common';
import { UploadService } from './upload.service';
import { UploadController } from './upload.controller';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { mkdirsSync } from 'fs-extra';
import { ShareModule } from '@/src/share/share.module';

@Module({
  imports: [
    // MulterModule.register({
    //   storage: diskStorage({
    //     destination: (req, file, cb) => {
    //       console.log(req.body);
    //       const filePath = `public/${req.body}/${req.body}/${req.params.version}`;
    //       mkdirsSync(filePath);
    //       return cb(null, `./${filePath}`);
    //     },
    //     filename: (req, file, cb) => {
    //       return cb(null, file.originalname);
    //     },
    //   }),
    // }),
    ShareModule,
  ],
  providers: [UploadService],
  controllers: [UploadController],
})
export class UploadModule {}
