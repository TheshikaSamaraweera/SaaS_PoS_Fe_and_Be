/** @format */
"use client";

import React, { useEffect, useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { useRouter } from "next/router";
import { DataTable } from "@/components/DataTable";
import PageTitle from "@/components/PageTitle";

type BranchManager = {
  _id: string;
  branchManagerId: string;
  branchManagerFirstName: string;
  branchManagerLastName: string;
  branchManagerPhone: string;
  branchManagerBranch: string;
  action: string;
};

type Props = {};
export default function UsersPage({}: Props) {
  const [branchManagers, setBranchManagers] = useState<BranchManager[]>([]);
  const columns: ColumnDef<BranchManager>[] = [
    {
      accessorKey: "branchManagerId",
      header: "Branch Manager id",
      cell: ({ row }) => {
        return (
          <div className="flex gap-2 items-center">
            <img
              className="h-10 w-10"
              src={`https://api.dicebear.com/7.x/lorelei/svg?seed=${row.getValue(
                "branchManagerId"
              )}`}
              alt="user-image"
            />
            <p>{row.getValue("branchManagerId")} </p>
          </div>
        );
      },
    },
    {
      accessorKey: "branchManagerFirstName",
      header: "First name",
    },
    {
      accessorKey: "branchManagerLastName",
      header: "Last name",
    },
    {
      accessorKey: "branchManagerPhone",
      header: "Phone number",
    },
    {
      accessorKey: "branchManagerBranch",
      header: "Branch",
    },
    {
      accessorKey: "action",
      header: "Action",
      cell: ({ row }) => (
        <div className="flex gap-2">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded"
            onClick={() => {
              if (window.confirm(`Do you want to change ${row.original.branchManagerFirstName}'s details?`)) {
                window.localStorage.setItem("branchManagerId", row.original._id);
                window.location.href = "/manager/edit-bmanagers";
              }
            }}
          >
            EDIT
          </button>
          <button
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
            onClick={async () => {
              if (window.confirm(`Do you want to remove ${row.original.branchManagerFirstName}?`)) {
                try {
                  const response = await fetch(
                    `http://localhost:3000/managers/${row.original._id}`,
                    {
                      method: "DELETE",
                    }
                  );
                  if (!response.ok) {
                    throw new Error("Network response was not ok");
                  }
                  setBranchManagers(
                    branchManagers.filter(
                      (branchManager: BranchManager) =>
                        branchManager.branchManagerId !== row.original.branchManagerId
                    )
                  );
                } catch (error) {
                  console.error("Error deleting branch manager:", error);
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
    fetch("http://localhost:3000/managers")
      .then((response) => response.json())
      .then((data) => setBranchManagers(data));
  }, []);

  return (
    <div className="flex flex-col gap-5 w-full">
      <PageTitle title="Branch Managers" />
      <DataTable columns={columns} data={branchManagers} />
    </div>
  );
}
