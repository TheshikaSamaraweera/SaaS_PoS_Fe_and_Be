import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { BranchManagerService } from './branchManager.service';
import { CreateBranchManagerDto } from './dto/create-branch-manager-dto';
import { UpdateBranchManagerDto } from './dto/update-book-dto';
import { BranchManager } from './schemas/branchManager.schema';

@Controller('branch-manager')
export class BranchManagerController {
  constructor(private branchManagerService: BranchManagerService) {}

  @Get()
  async getAllBranchManagers(): Promise<BranchManager[]> {
    return this.branchManagerService.findAll();
  }
  @Post()
  async createBranchManager(
    @Body()
    branchManager: CreateBranchManagerDto,
  ): Promise<BranchManager> {
    return this.branchManagerService.create(branchManager);
  }
  @Get(':id')
  async getBranchManager(
    @Param('id')
    id: string,
  ): Promise<BranchManager> {
    return this.branchManagerService.findById(id);
  }
  @Put(':id')
  async updateBranchManager(
    @Param('id')
    id: string,
    @Body()
    branchManager: UpdateBranchManagerDto,
  ): Promise<BranchManager> {
    return this.branchManagerService.updateById(id, branchManager);
  }
  @Delete(':id')
  async deleteBranchManager(
    @Param('id')
    id: string,
  ): Promise<BranchManager> {
    return this.branchManagerService.deleteById(id);
  }
}
