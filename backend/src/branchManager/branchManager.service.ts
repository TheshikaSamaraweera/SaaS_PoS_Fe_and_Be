import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { BranchManager } from './schemas/branchManager.schema';
import { UpdateBranchManagerDto } from './dto/update-book-dto';
import { CreateBranchManagerDto } from './dto/create-branch-manager-dto';

@Injectable()
export class BranchManagerService {
  constructor(
    @InjectModel(BranchManager.name)
    private branchManagerModel: mongoose.Model<BranchManager>,
  ) {}

  async findAll(): Promise<BranchManager[]> {
    return this.branchManagerModel.find().populate('branch').exec();
  }

  async create(branchManager: CreateBranchManagerDto): Promise<BranchManager> {
    const createdBranchManager = new this.branchManagerModel(branchManager);
    return createdBranchManager.save();
  }

  async findById(id: string): Promise<BranchManager> {
    const branchManager = await this.branchManagerModel
      .findById(id)
      .populate('branch')
      .exec();
    if (!branchManager) {
      throw new NotFoundException('BranchManager Not Found.');
    }
    return branchManager;
  }

  async updateById(
    id: string,
    branchManager: UpdateBranchManagerDto,
  ): Promise<BranchManager> {
    return this.branchManagerModel
      .findByIdAndUpdate(id, branchManager, {
        new: true,
        runValidators: true,
      })
      .populate('branch')
      .exec();
  }

  async deleteById(id: string): Promise<BranchManager> {
    return this.branchManagerModel.findByIdAndDelete(id);
  }
}
