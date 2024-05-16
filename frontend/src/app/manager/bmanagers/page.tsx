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
import { Icon } from "next/dist/lib/metadata/types/metadata-types";
import { Button } from "@/components/ui/button";

type Props = {};
type Payment = {
  name: string;
  email: string;
  dob: string;
  address: string;
  id: string;
  
};

const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: "id",
    header: "Id"
  },
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => {
      return (
        <div className="flex gap-2 items-center">
          <img
            className="h-10 w-10"
            src={`https://api.dicebear.com/7.x/lorelei/svg?seed=${row.getValue(
              "name"
            )}`}
            alt="user-image"
          />
          <p>{row.getValue("name")} </p>
        </div>
      );
    }
  },
  {
    accessorKey: "email",
    header: "Email"
  },
  {
    accessorKey: "dob",
    header: "DoB"
  },
  {
    accessorKey: "address",
    header: "Address"
  },
  {
    accessorKey: "action", // New action column
    header: "Action",
    cell: ({ row }) => (
      <button onClick={() => handleAction(row.original)}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>
    )
  }
];


const data: Payment[] = [
  {
    name: "John Doe",
    email: "john@example.com",
    dob: "2023-01-01",
    address: "kagalla",
    id: "1",
    
  },
  {
    name: "Alice Smith",
    email: "alice@example.com",
    dob: "2023-02-15",
    address: "kurunegala",
    id: "2",
  },
  {
    name: "Bob Johnson",
    email: "bob@example.com",
    dob: "2023-03-20",
    address: "kurunegala",
    id: "3",
  },
  {
    name: "Emma Brown",
    email: "emma@example.com",
    dob: "2023-04-10",
    address: "kurunegala",
    id: "4",
  },
  {
    name: "Michael Davis",
    email: "michael@example.com",
    dob: "2023-05-05",
    address: "kurunegala",
    id: "5",
  },
  {
    name: "Sophia Wilson",
    email: "sophia@example.com",
    dob: "2023-06-18",
    address: "kurunegala Transfer",
    id: "6",
  },
  {
    name: "Liam Garcia",
    email: "liam@example.com",
    dob: "2023-07-22",
    address: "kurunegala",
    id: "7",
  },
  {
    name: "Olivia Martinez",
    email: "olivia@example.com",
    dob: "2023-08-30",
    address: "kurunegala Pay",
    id: "8",
  },
  {
    name: "Noah Rodriguez",
    email: "noah@example.com",
    dob: "2023-09-12",
    address: "kurunegala Pay",
    id: "9",
  },
  {
    name: "Ava Lopez",
    email: "ava@example.com",
    dob: "2023-10-25",
    address: "kurunegala",
    id: "10",
  },
  {
    name: "Elijah Hernandez",
    email: "elijah@example.com",
    dob: "2023-11-05",
    address: "kurunegala",
    id: "11",
  },
  {
    name: "Mia Gonzalez",
    email: "mia@example.com",
    dob: "2023-12-08",
    address: "kurunegala Pay",
    id: "12",
  },
  {
    name: "James Perez",
    email: "james@example.com",
    dob: "2024-01-18",
    address: "kurunegala Cash",
    id: "13",
  },
  {
    name: "Charlotte Carter",
    email: "charlotte@example.com",
    dob: "2024-02-22",
    address: "kurunegala",
    id: "14",
  },
  {
    name: "Benjamin Taylor",
    email: "benjamin@example.com",
    dob: "2024-03-30",
    address: "kurunegala",
    id: "15",
  }
];

export default function UsersPage({}: Props) {
  return (
    <div className="flex flex-col gap-5  w-full">

      <PageTitle title="Branch Managers" />
      <Button style={{ width: "200px" }}>Add Branch managers</Button>
      <DataTable columns={columns} data={data} />
    </div>
  );
}
function handleAction(original: Payment): void {
  throw new Error("Function not implemented.");
}

