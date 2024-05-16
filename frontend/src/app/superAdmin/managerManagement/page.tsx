/**
 * eslint-disable @next/next/no-img-element
 *
 * @format
 */

/** @format */
"use client";

import { DataTable } from "@/components/DataTable";
import PageTitle from "@/components/PageTitle";
import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";

type Props = {};
type Payment = {
  name: string;
  email: string;
  lastOrder: string;
  method: string;
  manager_ID: string;
};

const columns: ColumnDef<Payment>[] = [
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
    },
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "lastOrder",
    header: "DateOfBirth",
  },
  {
    accessorKey: "method",
    header: "Address",
  },
  {
    accessorKey: "manager_ID",
    header: "ManagerID",
  },
];

const data: Payment[] = [
  {
    name: "Alice Smith",
    email: "alice@example.com",
    lastOrder: "2023-02-15",
    method: "PayPal",
    manager_ID: "1",
  },
  {
    name: "Bob Johnson",
    email: "bob@example.com",
    lastOrder: "2023-03-20",
    method: "Stripe",
    manager_ID: "2",
  },
  {
    name: "Emma Brown",
    email: "emma@example.com",
    lastOrder: "2023-04-10",
    method: "Venmo",
    manager_ID: "3",
  },
  {
    name: "Michael Davis",
    email: "michael@example.com",
    lastOrder: "2023-05-05",
    method: "Cash",
    manager_ID: "4",
  },
  {
    name: "Sophia Wilson",
    email: "sophia@example.com",
    lastOrder: "2023-06-18",
    method: "Bank Transfer",
    manager_ID: "5",
  },
  {
    name: "Liam Garcia",
    email: "liam@example.com",
    lastOrder: "2023-07-22",
    method: "Payoneer",
    manager_ID: "6",
  },
  {
    name: "Olivia Martinez",
    email: "olivia@example.com",
    lastOrder: "2023-08-30",
    method: "Apple Pay",
    manager_ID: "7",
  },
  {
    name: "Noah Rodriguez",
    email: "noah@example.com",
    lastOrder: "2023-09-12",
    method: "Google Pay",
    manager_ID: "8",
  },
  {
    name: "Ava Lopez",
    email: "ava@example.com",
    lastOrder: "2023-10-25",
    method: "Cryptocurrency",
    manager_ID: "9",
  },
  {
    name: "Elijah Hernandez",
    email: "elijah@example.com",
    lastOrder: "2023-11-05",
    method: "Alipay",
    manager_ID: "10",
  },
  {
    name: "Mia Gonzalez",
    email: "mia@example.com",
    lastOrder: "2023-12-08",
    method: "WeChat Pay",
    manager_ID: "11",
  },
  {
    name: "James Perez",
    email: "james@example.com",
    lastOrder: "2024-01-18",
    method: "Square Cash",
    manager_ID: "12",
  },
  {
    name: "Charlotte Carter",
    email: "charlotte@example.com",
    lastOrder: "2024-02-22",
    method: "Zelle",
    manager_ID: "13",
  },
  {
    name: "Benjamin Taylor",
    email: "benjamin@example.com",
    lastOrder: "2024-03-30",
    method: "Stripe",
    manager_ID: "14",
  },
];

export default function UsersPage({}: Props) {
  return (
    <div className="flex flex-col gap-5  w-full">
      <Button asChild style={{ width: '200px' }}>
        <Link href="/superAdmin/managerManagement/addManager">
          Add new Manager
        </Link>
      </Button>

      <PageTitle title="Managers List" />
      <DataTable columns={columns} data={data} />
    </div>
  );
}
