import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Cashier } from './schemas/cashier.schema';
import * as mongoose from 'mongoose';
import { CreateCashierDto } from './dto/create-cashier-dto';

@Injectable()
export class CashierService {
  constructor(
    @InjectModel(Cashier.name) private cashierModel: mongoose.Model<Cashier>,
  ) {}

  async findAll(): Promise<Cashier[]> {
    const cashiers = await this.cashierModel.find();
    return cashiers;
  }

  async create(Cashier: Cashier): Promise<Cashier> {
    const res = await this.cashierModel.create(Cashier);
    return res;
  }

  async findById(id: string): Promise<Cashier> {
    const cashier = await this.cashierModel.findById(id);
    if (!cashier) {
      throw new NotFoundException('Cashier is not found!');
    }
    return cashier;
  }

  async updateById(id: string, Cashier: Cashier): Promise<Cashier> {
    return await this.cashierModel.findByIdAndUpdate(id, Cashier, {
      new: true,
      runValidators: true,
    });
  }

  async deleteById(id: string): Promise<Cashier> {
    return await this.cashierModel.findByIdAndDelete(id);
  }

  // async create(
  //   cashier: CreateCashierDto,
  //   file: Express.Multer.File,
  // ): Promise<Cashier> {
  //   const newCashier = new this.cashierModel(cashier);
  //   newCashier.cashierImage = file.path;
  //   return newCashier.save();
  // }
}
