import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type BillDocument = Bill & Document;

@Schema()
export class Item {
  @Prop()
  itemName: string;

  @Prop()
  unitPrice: number;

  @Prop()
  count: number;

  @Prop()
  totalPrice: number;
}

export const ItemSchema = SchemaFactory.createForClass(Item);

@Schema({
  timestamps: true,
})
export class Bill {
  @Prop()
  id: string;

  @Prop()
  billId: string;

  @Prop()
  totalAmount: number;

  @Prop()
  billDate: string;

  @Prop()
  billTime: string;

  @Prop()
  cashierId: string;

  @Prop()
  branchId: string;

  @Prop()
  companyId: string;

  @Prop({ type: [ItemSchema] })
  items: Item[];
}

export const BillSchema = SchemaFactory.createForClass(Bill);
