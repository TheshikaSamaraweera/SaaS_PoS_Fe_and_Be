import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { CreateBillDto } from './dto/create-bill-dto';
import { Bill, BillDocument } from './schemas/bill.schema';
import * as moment from 'moment';

@Injectable()
export class BillService {
  constructor(
    @InjectModel(Bill.name) private billModel: mongoose.Model<BillDocument>,
  ) {}

  async findAll(): Promise<Bill[]> {
    const bills = await this.billModel.find();
    return bills;
  }

  async create(createBillDto: CreateBillDto): Promise<Bill> {
    const newBill = new this.billModel(createBillDto);
    return await newBill.save();
  }

  async findById(id: string): Promise<Bill> {
    const bill = await this.billModel.findById(id);
    if (!bill) {
      throw new NotFoundException('Bill is not found!');
    }
    return bill;
  }

  async updateById(id: string, Bill: Bill): Promise<Bill> {
    return await this.billModel.findByIdAndUpdate(id, Bill, {
      new: true,
      runValidators: true,
    });
  }
  // async updateById(id: string, billData: Bill): Promise<Bill> { //naming conflict
  //   return await this.billModel.findByIdAndUpdate(id, billData, {
  //     new: true,
  //     runValidators: true,
  //   });
  // }

  async deleteById(id: string): Promise<Bill> {
    return await this.billModel.findByIdAndDelete(id);
  }

  async findByDate(billDate: string): Promise<Bill[]> {
    const bills = await this.billModel.find({ billDate });
    return bills;
}

  async findByCashierId(cashierId: string): Promise<Bill[]> {
    const bills = await this.billModel.find({ cashierId });
    return bills;
  }

  async findByBranchId(branchId: string): Promise<Bill[]> {
    const bills = await this.billModel.find({ branchId });
    return bills;
  }
}
