import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { join } from 'path';
import { uploadFileDto, UploadDto } from '@/src/upload/upload.entity';
import { mkdirsSync, writeFileSync } from 'fs-extra';
import { PrismaService } from '@/src/prisma/prisma.service';
import { ShareService } from '@/src/share/share.service';

@Injectable()
export class UploadService {
  constructor(
    private prisma: PrismaService,
    private shareService: ShareService,
  ) {}

  // 单个文件上传
  async uploadFile(file: uploadFileDto, body: UploadDto) {
    const { accessKey, branch, version, platform, arch, signature } = body;
    const { releaseFile, sigFile } = file;
    const accessKeyObj = await this.prisma.accessKey.findUnique({
      where: { accessKey },
    });
    if (!accessKeyObj) {
      throw new HttpException('密钥错误', HttpStatus.BAD_REQUEST);
    }
    const project = await this.prisma.project.findUnique({
      where: {
        id: accessKeyObj.projectId,
      },
    });
    if (!project) {
      throw new HttpException('项目不存在', HttpStatus.BAD_REQUEST);
    }

    const branchObj = await this.prisma.branch.upsert({
      where: {
        branch_projectId: {
          branch,
          projectId: project.id,
        },
      },
      create: {
        branch,
        projectId: project.id,
      },
      update: {
        branch,
        projectId: project.id,
      },
    });

    const dir = `public/${project.id}/${branch}/${version}`;
    const path = `${dir}/${releaseFile[0].originalname}`;
    const sigPath = `${dir}/${sigFile[0].originalname}`;

    const versionObj = await this.prisma.version.create({
      data: {
        version,
        path,
        sigPath,
        platform,
        arch,
        signature,
        projectId: project.id,
        release: false,
        branchId: branchObj.id,
      },
    });

    mkdirsSync(join(__dirname, '../../', dir));
    writeFileSync(join(__dirname, '../../', path), releaseFile[0].buffer); // 写入文件内容
    writeFileSync(join(__dirname, '../../', sigPath), sigFile[0].buffer); // 写入文件内容
    return versionObj;
  }
}
