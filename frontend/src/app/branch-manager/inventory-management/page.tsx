/** @format */
"use client";

import { DataTable } from "@/components/DataTable";
import { ColumnDef } from "@tanstack/react-table";
import React, { useEffect, useState } from "react";
import PageTitle from "@/components/PageTitle";
import useUserDetails from "@/hooks/useUserDetails";

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
  branchName: string;
};

export default function UsersPage() {
  const [inventories, setInventories] = useState<Inventory[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const userDetails = useUserDetails();

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
      header: "Item Name",
    },
    {
      accessorKey: "quantity",
      header: "Quantity",
    },
    {
      accessorKey: "supply",
      header: "Supply",
    },
    {
      accessorKey: "date",
      header: "Date",
    },
    {
      accessorKey: "unitPrice",
      header: "Unit Price",
    },
    {
      accessorKey: "sellPrice",
      header: "Sell Price",
    },
    {
      accessorKey: "action",
      header: "Action",
      cell: ({ row }) => (
        <div className="flex gap-2">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded"
            onClick={() => {
              if (window.confirm(`Do you want to change details of the ${row.original.itemName}?`)) {
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
                      (inventory: Inventory) =>
                        inventory.itemID !== row.original.itemID
                    )
                  );
                } catch (error) {
                  console.error("Error deleting inventory item:", error);
                }
              }
            }}
          >
            DELETE
          </button>
        </div>
      ),
    },
  ];

  useEffect(() => {
    if (userDetails?.lastName) {
      fetch("http://localhost:3000/inventory")
        .then((response) => response.json())
        .then((data) => setInventories(data));
    }
  }, [userDetails]);

  const filteredInventories = inventories.filter(
    (inventory) =>
      inventory.branchName === userDetails?.lastName &&
      `${inventory.itemID} ${inventory.itemName}`
        .toLowerCase()
        .includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col gap-5 w-full">
      <PageTitle title="Stock / Store" />
      <input
        type="text"
        placeholder="Search by item ID or item name"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="p-2 border border-gray-300 rounded mb-4"
      />
      <DataTable columns={columns} data={filteredInventories} />
    </div>
  );
}
