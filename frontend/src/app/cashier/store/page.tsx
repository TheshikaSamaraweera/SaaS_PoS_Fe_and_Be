/**
 * eslint-disable @next/next/no-img-element
 *
 * @format
 */

/** @format */
"use client";

import { DataTable } from "@/components/DataTable";
import { ColumnDef } from "@tanstack/react-table";
import React from "react";
import PageTitle from "@/components/PageTitle";

type Props = {};
type Payment = {
  itemID: string;
  itemName: string;
  itemCode: string;
  quantity: number;
  supply: string;
  date: string;
  unitPrice: string;
  sellPrice: string;
  action: string;
};

const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: "itemID",
    header: "itemID",
    cell: ({ row }) => {
      return (
        <div className="flex gap-2 items-center">
          <img
            className="h-10 w-10"
            src={`https://api.dicebear.com/7.x/lorelei/svg?seed=${row.getValue(
              "itemID"
            )}`}
            alt="user-image"
          />
          <p>{row.getValue("itemID")} </p>
        </div>
      );
    },
  },
  {
    accessorKey: "itemName",
    header: "itemName",
  },
  {
    accessorKey: "itemCode",
    header: "itemCode",
  },
  {
    accessorKey: "quantity",
    header: "quantity",
  },
  {
    accessorKey: "supply",
    header: "supply",
  },
  {
    accessorKey: "date",
    header: "date",
  },
  {
    accessorKey: "unitPrice",
    header: "unitPrice",
  },
  {
    accessorKey: "sellPrice",
    header: "sellPrice",
  },
  {
    accessorKey: "action",
    header: "action",
  },
];

const data: Payment[] = [
  {
    itemID: "001",
    itemName: "Chocolate Fingers",
    itemCode: "CF003",
    quantity: 1200,
    supply: "John Keels",
    date: "03-04-2024",
    unitPrice: "Rs. 3600",
    sellPrice: "Rs. 3800",
    action: "    EDIT   DELETE    ",
  },
  {
    itemID: "002",
    itemName: "Chocolate Fingers",
    itemCode: "CF003",
    quantity: 1200,
    supply: "John Keels",
    date: "03-04-2024",
    unitPrice: "Rs. 3600",
    sellPrice: "Rs. 3800",
    action: "    EDIT   DELETE    ",
  },
  {
    itemID: "003",
    itemName: "Chocolate Fingers",
    itemCode: "CF003",
    quantity: 1200,
    supply: "John Keels",
    date: "03-04-2024",
    unitPrice: "Rs. 3600",
    sellPrice: "Rs. 3800",
    action: "    EDIT   DELETE    ",
  },
  {
    itemID: "004",
    itemName: "Chocolate Fingers",
    itemCode: "CF003",
    quantity: 1200,
    supply: "John Keels",
    date: "03-04-2024",
    unitPrice: "Rs. 3600",
    sellPrice: "Rs. 3800",
    action: "    EDIT   DELETE    ",
  },
  {
    itemID: "005",
    itemName: "Chocolate Fingers",
    itemCode: "CF003",
    quantity: 1200,
    supply: "John Keels",
    date: "03-04-2024",
    unitPrice: "Rs. 3600",
    sellPrice: "Rs. 3800",
    action: "    EDIT   DELETE    ",
  },
  {
    itemID: "006",
    itemName: "Chocolate Fingers",
    itemCode: "CF003",
    quantity: 1200,
    supply: "John Keels",
    date: "03-04-2024",
    unitPrice: "Rs. 3600",
    sellPrice: "Rs. 3800",
    action: "    EDIT   DELETE    ",
  },
];

export default function UsersPage({}: Props) {
  return (
    <div className="flex flex-col gap-5  w-full">
      <PageTitle title="Stock / Store" />
      <DataTable columns={columns} data={data} />
    </div>
  );
}
