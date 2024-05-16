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
  sells: string;
  branch: string;
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
    accessorKey: "sells",
    header: "Sells"
  },
  {
    accessorKey: "branch",
    header: "Branch"
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
    sells: "2023",
    branch: "kagalla",
    id: "1",
    
  },
  {
    name: "Alice Smith",
    email: "alice@example.com",
    sells: "20235",
    branch: "kurunegala",
    id: "2",
  },
  {
    name: "Bob Johnson",
    email: "bob@example.com",
    sells: "4582",
    branch: "kurunegala",
    id: "3",
  },
  {
    name: "Emma Brown",
    email: "emma@example.com",
    sells: "2040",
    branch: "kurunegala",
    id: "4",
  },
  {
    name: "Michael Davis",
    email: "michael@example.com",
    sells: "255",
    branch: "kurunegala",
    id: "5",
  },
  {
    name: "Sophia Wilson",
    email: "sophia@example.com",
    sells: "4588",
    branch: "kurunegala Transfer",
    id: "6",
  },
  {
    name: "Liam Garcia",
    email: "liam@example.com",
    sells: "7592",
    branch: "kurunegala",
    id: "7",
  },
  {
    name: "Olivia Martinez",
    email: "olivia@example.com",
    sells: "4580",
    branch: "kurunegala Pay",
    id: "8",
  },
  {
    name: "Noah Rodriguez",
    email: "noah@example.com",
    sells: "4582",
    branch: "kurunegala Pay",
    id: "9",
  },
  {
    name: "Ava Lopez",
    email: "ava@example.com",
    sells: "455",
    branch: "kurunegala",
    id: "10",
  },
  {
    name: "Elijah Hernandez",
    email: "elijah@example.com",
    sells: "2055",
    branch: "kurunegala",
    id: "11",
  },
  {
    name: "Mia Gonzalez",
    email: "mia@example.com",
    sells: "205",
    branch: "kurunegala Pay",
    id: "12",
  },
  
];

export default function UsersPage({}: Props) {
  return (
    <div className="flex flex-col gap-5  w-full">

      <PageTitle title="Sells" />
      
      <DataTable columns={columns} data={data} />
    </div>
  );
}
function handleAction(original: Payment): void {
  throw new Error("Function not implemented.");
}

