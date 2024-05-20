// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { BranchService } from './branch.service';

import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { Branch } from './schemas/branch.schema';
import { CreateBranchDto } from './dto/create-branch.dto';
import { UpdateBranchDto } from './dto/updaate-branch.dto';

@Controller('branch')
export class BranchController {
  constructor(private BranchService: BranchService) {}

  @Get()
  async getAllBranches(): Promise<Branch[]> {
    return this.BranchService.findAll();
  }
  @Post()
  async createBranch(
    @Body()
    Branch: CreateBranchDto,
  ): Promise<Branch> {
    return this.BranchService.create(Branch);
  }
  @Get(':id')
  async getBranch(
    @Param('id')
    id: string,
  ): Promise<Branch> {
    return this.BranchService.findById(id);
  }
  @Put(':id')
  async creatBranch(
    @Param('id')
    id: string,
    @Body()
    branch: UpdateBranchDto,
  ): Promise<Branch> {
    return this.BranchService.updateById(id, branch);
  }
  @Delete(':id')
  async deleteBranch(
    @Param('id')
    id: string,
  ): Promise<Branch> {
    return this.BranchService.deleteById(id);
  }
}
