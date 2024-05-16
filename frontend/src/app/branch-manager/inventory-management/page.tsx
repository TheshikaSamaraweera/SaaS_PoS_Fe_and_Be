/** @format */
"use client";

import { DataTable } from "@/components/DataTable";
import { ColumnDef } from "@tanstack/react-table";
import React, { useEffect, useState } from "react";
import PageTitle from "@/components/PageTitle";

type Props = {};
type Inventory = {
  _id: string;
  itemID: string;
  itemName: string;
  quantity: number;
  supply: string;
  date: string;
  unitPrice: string;
  sellPrice: string;
};

export default function UsersPage() {
  const [inventories, setInventories] = useState<Inventory[]>([]);

  const columns: ColumnDef<Inventory>[] = [
    {
      accessorKey: "itemID",
      header: "Item id",
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
      cell: ({ row }) => (
        <div className="flex gap-2">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded"
            onClick={() => {
              if (window.confirm(`Do you want to change details of the ${row.original.itemName} ?`)) {
                window.localStorage.setItem("itemID", row.original._id);
                window.location.href = "/branch-manager/edit-inventory";
              }
            }}
          >
            EDIT
          </button>
          <button
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
            onClick={async () => {
              if (window.confirm(`Do you want to delete ${row.original.itemName}?`)) {
                try {
                  const response = await fetch(
                    `http://localhost:3000/inventory/${row.original._id}`,
                    {
                      method: "DELETE",
                    }
                  );
                  if (!response.ok) {
                    throw new Error("Network response was not ok");
                  }
                  setInventories(
                    inventories.filter(
                      (cashier: Inventory) =>
                        cashier.itemID !== row.original.itemID
                    )
                  );
                } catch (error) {
                  console.error("Error deleting cashier:", error);
                }
              }
            }}
          >
            DELETE
          </button>
          {/* <button
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
            onClick={() => {
              // Handle the delete action
              console.log('Delete:', row.original);
            }}
          >
            DELETE
          </button> */}
        </div>
      ),
    },
  ];

  useEffect(() => {
    fetch("http://localhost:3000/inventory")
      .then((response) => response.json())
      .then((data) => setInventories(data));
  }, []);
  return (
    <div className="flex flex-col gap-5  w-full">
      <PageTitle title="Stock / Store" />
      <DataTable columns={columns} data={inventories} />
    </div>
  );
}
