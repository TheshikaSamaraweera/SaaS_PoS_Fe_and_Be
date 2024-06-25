import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Branch } from '../../branch/schemas/branch.schema';

@Schema({
  timestamps: true,
})
export class BranchManager extends Document {
  @Prop()
  branchManagerId: string;

  @Prop()
  branchManagerFirstName: string;

  @Prop()
  branchManagerLastName: string;

  @Prop()
  branchManagerEmail: string;

  @Prop()
  branchManagerAddress: string;

  @Prop()
  branchManagerPhone: string;

  @Prop()
  branchManagerDoB: string;

  @Prop()
  branchManagerGender: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Branch', required: true })
  branch: Branch;
}

export const BranchManagerSchema = SchemaFactory.createForClass(BranchManager);
