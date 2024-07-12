import { Body, Controller, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse } from '@nestjs/swagger';
import { BranchService } from '@/src/branch/branch.service';
import { Auth } from '@/src/auth/auth.decorator';
import { AuthUserDto } from '@/src/auth/auth.entity';
import { BranchDto, BranchListDto } from '@/src/branch/branch.entity';

@ApiBearerAuth()
@Controller('branch')
export class BranchController {
  constructor(private branchService: BranchService) {}

  @ApiOkResponse({
    type: BranchDto,
  })
  @Post('list')
  branchList(@Auth() user: AuthUserDto, @Body() body: BranchListDto) {
    return this.branchService.getBranchList(user, body);
  }
}
