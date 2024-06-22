import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({
  timestamps: true,
})
export class Branch extends Document {
  @Prop()
  branchid: string;

  @Prop()
  branchName: string;

  @Prop()
  city: string;

  @Prop()
  street: string;
}

export const BranchSchema = SchemaFactory.createForClass(Branch);
