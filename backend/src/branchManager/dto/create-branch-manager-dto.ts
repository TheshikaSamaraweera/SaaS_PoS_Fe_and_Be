// import { Category } from '../schemas/book.schema';

export class CreateBranchManagerDto {
  readonly branchManagerId: string;
  readonly branchManagerFirstName: string;
  readonly branchManagerLastName: string;
  readonly branchManagerEmail: string;
  readonly branchManagerAddress: string;
  readonly branchManagerPhone: string;
  readonly branchManagerDoB: string;
  readonly branchManagerGender: string;
  readonly branchManagerBranch: string;
}
