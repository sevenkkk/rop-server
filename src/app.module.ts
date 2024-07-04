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
import { EnvModule } from './env/env.module';
import { WorkspaceModule } from './workspace/workspace.module';
import { AccessKeyModule } from './access-key/access-key.module';

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
    EnvModule,
    WorkspaceModule,
    AccessKeyModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
