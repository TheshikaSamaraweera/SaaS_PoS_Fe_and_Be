export class CreateRequestDto {
  readonly companyName: string;
  readonly requestedBranch: string;
  readonly requestedCashier: string;
  readonly requestedItemCode: string;
  readonly requestedItemName: string;
  readonly requestedQuantity: number;
  readonly requestedDate: string;
  readonly requestedSupply: string;
}
