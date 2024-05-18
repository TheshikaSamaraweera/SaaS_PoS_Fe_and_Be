// export class CreateBillDto {
//   readonly itemID: string;
//   readonly itemName: string;
//   readonly sellPrice: number;
// }

export class ItemDto {
  readonly itemName: string;
  readonly sellPrice: number;
  readonly itemQuantity: number; 
}

export class CreateBillDto {
  readonly id: string;
  readonly items: ItemDto[];
}