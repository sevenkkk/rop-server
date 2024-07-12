import { Body, Controller, Post } from '@nestjs/common';
import { VersionService } from '@/src/version/version.service';
import { ApiBearerAuth, ApiOkResponse } from '@nestjs/swagger';
import { Auth } from '@/src/auth/auth.decorator';
import { AuthUserDto } from '@/src/auth/auth.entity';
import {
  NotReleaseVersionListDto,
  ReleaseVersionReqDto,
  VersionDto,
  VersionListDto,
} from '@/src/version/version.entity';
import { ApiListResponse } from '@/src/share/api-list-response.decorator';

@ApiBearerAuth()
@Controller('version')
export class VersionController {
  constructor(private versionService: VersionService) {}

  @ApiListResponse(VersionDto)
  @Post('list')
  versionList(@Auth() user: AuthUserDto, @Body() body: VersionListDto) {
    return this.versionService.getVersionList(user, body);
  }

  @ApiOkResponse({
    type: [VersionDto],
  })
  @Post('not_release/list')
  notReleaseVersionList(
    @Auth() user: AuthUserDto,
    @Body() body: NotReleaseVersionListDto,
  ) {
    return this.versionService.getNotReleaseVersionList(user, body);
  }

  @Post('release')
  releaseVersion(
    @Auth() user: AuthUserDto,
    @Body() body: ReleaseVersionReqDto,
  ) {
    return this.versionService.releaseVersion(user, body);
  }
}
