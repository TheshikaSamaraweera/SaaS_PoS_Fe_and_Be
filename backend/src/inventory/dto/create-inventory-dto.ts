export class CreateInventoryDto {
  readonly itemID: string;
  readonly itemName: string;
  readonly quantity: number;
  readonly supply: string;
  readonly date: string;
  readonly unitPrice: number;
  readonly sellPrice: number;
  readonly description: string;
  readonly category: string;
  readonly branchName: string;
}
