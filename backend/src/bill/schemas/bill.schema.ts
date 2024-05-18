import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type BillDocument = Bill & Document;

@Schema()
export class Item {
  @Prop()
  itemName: string;

  @Prop()
  sellPrice: number;

  @Prop()
  quantity: number;
}

export const ItemSchema = SchemaFactory.createForClass(Item);

@Schema({
  timestamps: true,
})
export class Bill {
  @Prop()
  id: string;

  @Prop({ type: [ItemSchema] })
  items: Item[];
}

export const BillSchema = SchemaFactory.createForClass(Bill);