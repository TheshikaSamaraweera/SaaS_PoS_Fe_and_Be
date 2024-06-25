import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({
  timestamps: true,
})
export class Request extends Document {
  @Prop()
  companyName: string;

  @Prop()
  requestedBranch: string;

  @Prop()
  requestedCashier: string;

  @Prop()
  requestedItemCode: string;

  @Prop()
  requestedItemName: string;

  @Prop()
  requestedDate: string;

  @Prop()
  requestedQuantity: number;

  @Prop()
  requestedSupply: string;
}

export const RequestSchema = SchemaFactory.createForClass(Request);
