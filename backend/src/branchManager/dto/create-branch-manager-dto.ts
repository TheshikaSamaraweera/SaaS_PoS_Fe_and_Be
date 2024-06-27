import { IsString, IsNotEmpty } from 'class-validator';
import { Types } from 'mongoose';

export class CreateBranchManagerDto {
  @IsString()
  branchManagerId: string;

  @IsString()
  branchManagerFirstName: string;

  @IsString()
  branchManagerLastName: string;

  @IsString()
  branchManagerEmail: string;

  @IsString()
  branchManagerAddress: string;

  @IsString()
  branchManagerPhone: string;

  @IsString()
  branchManagerDoB: string;

  @IsString()
  branchManagerGender: string;

  @IsNotEmpty()
  @IsString()
  branchManagerBranch: string;
}
