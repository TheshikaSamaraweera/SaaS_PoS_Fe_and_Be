import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Branch } from './schemas/branch.schema';

@Injectable()
export class BranchService {
  constructor(
    @InjectModel(Branch.name)
    private BranchModel: mongoose.Model<Branch>,
  ) {}

  async findAll(): Promise<Branch[]> {
    const branches = await this.BranchModel.find();
    return branches;
  }
  async create(branch: Branch): Promise<Branch> {
    const res = await this.BranchModel.create(branch);
    return res;
  }
  async findById(id: string): Promise<Branch> {
    const branch = await this.BranchModel.findById(id);
    if (!branch) {
      throw new NotFoundException('Branch not Found');
    }
    return branch;
  }
  async updateById(id: string, branch: Branch): Promise<Branch> {
    return await this.BranchModel.findByIdAndUpdate(id, branch, {
      new: true,
      runValidators: true,
    });
  }
  async deleteById(id: string): Promise<Branch> {
    return await this.BranchModel.findByIdAndDelete(id);
  }
}
