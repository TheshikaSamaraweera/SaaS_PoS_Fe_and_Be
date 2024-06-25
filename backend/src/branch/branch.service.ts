import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Branch } from './schemas/branch.schema';
import mongoose from 'mongoose';
import { CreateBranchDto } from './dto/create-branch.dto';
import { UpdateBranchDto } from './dto/updaate-branch.dto';

@Injectable()
export class BranchService {
  constructor(
    @InjectModel(Branch.name)
    private BranchModel: mongoose.Model<Branch>,
  ) {}

  async findAll(): Promise<Branch[]> {
    return this.BranchModel.find().populate('branchManager').exec();
  }

  async create(branch: CreateBranchDto): Promise<Branch> {
    const createdBranch = new this.BranchModel(branch);
    return createdBranch.save();
  }

  async findById(id: string): Promise<Branch> {
    const branch = await this.BranchModel.findById(id)
      .populate('branchManager')
      .exec();
    if (!branch) {
      throw new NotFoundException('Branch not Found');
    }
    return branch;
  }

  async updateById(id: string, branch: UpdateBranchDto): Promise<Branch> {
    return this.BranchModel.findByIdAndUpdate(id, branch, {
      new: true,
      runValidators: true,
    })
      .populate('branchManager')
      .exec();
  }

  async deleteById(id: string): Promise<Branch> {
    return this.BranchModel.findByIdAndDelete(id);
  }
}
