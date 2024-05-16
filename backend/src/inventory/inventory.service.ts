import { Injectable, NotFoundException } from '@nestjs/common';
import { Inventory } from './schemas/inventory.schema';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

@Injectable()
export class InventoryService {
  constructor(
    @InjectModel(Inventory.name) private inventoryModel: mongoose.Model<Inventory>,
  ) {}

  async findAll(): Promise<Inventory[]> {
    const inventories = await this.inventoryModel.find();
    return inventories;
  }

  async create(Inventory: Inventory): Promise<Inventory> {
    const res = await this.inventoryModel.create(Inventory);
    return res;
  }

  async findById(id: string): Promise<Inventory> {
    const inventory = await this.inventoryModel.findById(id);
    if (!inventory) {
      throw new NotFoundException('Inventory is not found!');
    }
    return inventory;
  }

  async updateById(id: string, Inventory: Inventory): Promise<Inventory> {
    return await this.inventoryModel.findByIdAndUpdate(id, Inventory, {
      new: true,
      runValidators: true,
    });
  }

  async deleteById(id: string): Promise<Inventory> {
    return await this.inventoryModel.findByIdAndDelete(id);
  }

}
