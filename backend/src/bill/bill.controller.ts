import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { Bill } from './schemas/bill.schema';
import { BillService } from './bill.service';
import { CreateBillDto } from './dto/create-bill-dto';

@Controller('bill')
export class BillController {
  constructor(private BillService: BillService) {}

  @Get()
  async getAllBills(): Promise<Bill[]> {
    return await this.BillService.findAll();
  }

  @Post()
  async createBill(@Body() createBillDto: CreateBillDto): Promise<Bill> {
    return this.BillService.create(createBillDto);
  }

  @Get(':id')
  async getBill(@Param('id') id: string): Promise<Bill> {
    return this.BillService.findById(id);
  }

  @Get('date/:billDate')
  async findByDate(@Param('billDate') billDate: string): Promise<Bill[]> {
    return this.BillService.findByDate(billDate);
  }

  @Get('cashier/:cashierId')
  async findByCashierId(@Param('cashierId') cashierId: string): Promise<Bill[]> {
    return this.BillService.findByCashierId(cashierId);
  }

  @Get('branch/:branchId')
  async findByBranchId(@Param('branchId') branchId: string): Promise<Bill[]> {
    return this.BillService.findByBranchId(branchId);
  }

  @Put(':id')
  async updateBill(@Param('id') id: string, @Body() bill): Promise<Bill> {
    return this.BillService.updateById(id, bill);
  }

  @Delete(':id')
  async deleteBill(@Param('id') id: string): Promise<Bill> {
    return this.BillService.deleteById(id);
  }
}
