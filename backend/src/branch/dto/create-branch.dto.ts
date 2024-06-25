import { IsString, IsOptional } from 'class-validator';
import { Types } from 'mongoose';

export class CreateBranchDto {
  @IsString()
  branchid: string;

  @IsString()
  branchName: string;

  @IsString()
  city: string;

  @IsString()
  street: string;

  @IsOptional()
  @IsString()
  branchManager: Types.ObjectId;
}
