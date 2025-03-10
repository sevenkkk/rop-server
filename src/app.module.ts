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
import { AccessKeyModule } from './access-key/access-key.module';
import { TeamModule } from './team/team.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { BranchModule } from './branch/branch.module';
import { TauriModule } from './tauri/tauri.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ServeStaticModule.forRoot({
      serveRoot: '/public',
      rootPath: join(__dirname, '../', 'public'),
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
    BranchModule,
    TauriModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
