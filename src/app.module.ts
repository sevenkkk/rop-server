import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ShareModule } from './share/share.module';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from '@/src/user/user.module';
import { UploadModule } from './upload/upload.module';
import { DownloadModule } from './download/download.module';
import { ProjectModule } from './project/project.module';
import { VersionModule } from './version/version.module';
import { AccessKeyModule } from './access-key/accessKey.module';
import { TeamModule } from './team/team.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule,
    UserModule,
    ShareModule,
    UploadModule,
    DownloadModule,
    ProjectModule,
    VersionModule,
    AccessKeyModule,
    TeamModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
