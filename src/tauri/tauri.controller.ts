import { Controller, Get, Param } from '@nestjs/common';
import { TauriSigReqDto, TauriSigResDto } from '@/src/tauri/tauri.entity';
import { Public } from '@/src/auth/constants';
import { ApiOkResponse } from '@nestjs/swagger';
import { TauriService } from '@/src/tauri/tauri.service';

@Controller('tauri')
export class TauriController {
  constructor(private tauriService: TauriService) {}

  @ApiOkResponse({
    type: TauriSigResDto,
  })
  @Public()
  @Get(':project/:branch/:platform/:arch/:version')
  uriSigJson(@Param() params: TauriSigReqDto) {
    return this.tauriService.uriSigJson(params);
  }
}
