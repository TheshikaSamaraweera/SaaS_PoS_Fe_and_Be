/** @format */
"use client";

import React, { useEffect, useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/components/DataTable";
import PageTitle from "@/components/PageTitle";

type Branch = {
  _id: string;
  branchName: string;
  city: string;
  street: string;
  action: string;
};

type Props = {};
export default function BranchesPage({}: Props) {
  const [branches, setBranches] = useState<Branch[]>([]);
  const columns: ColumnDef<Branch>[] = [
    {
      accessorKey: "branchName",
      header: "Branch Name",
    },
    {
      accessorKey: "city",
      header: "City",
    },
    {
      accessorKey: "street",
      header: "Street",
    },
    {
      accessorKey: "action",
      header: "Action",
      cell: ({ row }) => (
        <div className="flex gap-2">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded"
            onClick={() => {
              if (
                window.confirm(
                  `Do you want to edit ${row.original.branchName}?`
                )
              ) {
                window.localStorage.setItem("branchId", row.original._id);
                window.location.href = "/manager/edit-branches";
              }
            }}
          >
            EDIT
          </button>
          <button
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
            onClick={async () => {
              if (
                window.confirm(
                  `Do you want to delete ${row.original.branchName}?`
                )
              ) {
                try {
                  const response = await fetch(
                    `http://localhost:3000/branch/${row.original._id}`,
                    {
                      method: "DELETE",
                    }
                  );
                  if (!response.ok) {
                    throw new Error("Network response was not ok");
                  }
                  setBranches(
                    branches.filter(
                      (branch: Branch) => branch._id !== row.original._id
                    )
                  );
                } catch (error) {
                  console.error("Error deleting branch:", error);
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
    fetch("http://localhost:3000/branch")
      .then((response) => response.json())
      .then((data) => setBranches(data));
  }, []);

  return (
    <div className="flex flex-col gap-5 w-full">
      <PageTitle title="Branches" />
      <DataTable columns={columns} data={branches} />
    </div>
  );
}
