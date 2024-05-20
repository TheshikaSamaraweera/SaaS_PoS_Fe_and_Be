// export class CreateBillDto {
//   readonly itemID: string;
//   readonly itemName: string;
//   readonly sellPrice: number;
// }

export class ItemDto {
  readonly itemName: string;
  readonly unitPrice: number;
  readonly count: number;
  readonly totalPrice: number;
}

export class CreateBillDto {
  readonly id: string;
  readonly billId: string;
  readonly totalAmount: number;
  readonly billDate: string;
  readonly billTime: string;
  readonly cashierId: string;
  readonly branchId: string;
  readonly items: ItemDto[];
}
