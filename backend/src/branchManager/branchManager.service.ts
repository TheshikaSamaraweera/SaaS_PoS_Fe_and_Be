import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { BranchManager } from './schemas/branchManager.schema';

@Injectable()
export class BranchManagerService {
  constructor(
    @InjectModel(BranchManager.name)
    private readonly branchManagerModel: mongoose.Model<BranchManager>,
  ) {}

  async findAll(): Promise<BranchManager[]> {
    const branchManagers = await this.branchManagerModel.find();
    return branchManagers;
  }
  async create(branchManager: BranchManager): Promise<BranchManager> {
    const res = await this.branchManagerModel.create(branchManager);
    return res;
  }
  async findById(id: string): Promise<BranchManager> {
    const branchManager = await this.branchManagerModel.findById(id);
    if (!branchManager) {
      throw new NotFoundException('BranchManager Not Found.');
    }
    return branchManager;
  }
  async updateById(
    id: string,
    branchManager: BranchManager,
  ): Promise<BranchManager> {
    return await this.branchManagerModel.findByIdAndUpdate(id, branchManager, {
      new: true,
      runValidators: true,
    });
  }
  async deleteById(id: string): Promise<BranchManager> {
    return await this.branchManagerModel.findByIdAndDelete(id);
  }
}
