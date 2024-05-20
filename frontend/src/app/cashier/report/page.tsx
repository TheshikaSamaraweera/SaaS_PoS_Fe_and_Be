"use client"; // This ensures the component is treated as a Client Component

import PageTitle from "@/components/PageTitle";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Head from "next/head";
import { useEffect, useState } from "react";

export default function TableDemo() {
  interface Bill {
    billId: number;
    cashierId: number;
    totalAmount: number;
    branchId: number;
    billDate: string;
    billTime: string;
  }

  interface Invoice {
    billId: number;
    cashierId: number;
    totalAmount: string;
    branchId: number;
    billDate: string;
    billTime: string;
  }

  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [selectedDate, setSelectedDate] = useState<string>("");

  const fetchBills = async (billDate?: string) => {
    const url = billDate
      ? `http://localhost:3000/bill/date/${billDate}`
      : "http://localhost:3000/bill";
    const response = await fetch(url);
    const data: Bill[] = await response.json();
    const formattedData = data.map((bill: Bill) => ({
      billId: bill.billId,
      cashierId: bill.cashierId,
      totalAmount: `Rs. ${bill.totalAmount.toFixed(2)}`,
      branchId: bill.branchId,
      billDate: bill.billDate,
      billTime: bill.billTime,
    }));
    setInvoices(formattedData);
  };

  useEffect(() => {
    fetchBills();
  }, []);

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const date = event.target.value; // date is in the format "YYYY-MM-DD"
    const [year, month, day] = date.split("-");
    const formattedDate = `${month}${day}${year}`; // Format the date as "MMDDYYYY"
    setSelectedDate(formattedDate);
    fetchBills(formattedDate);
  };

  return (
    <>
      <Head>
        <title>Sales Report</title>
      </Head>

      <div>
        <PageTitle title="Sales Report" />

        <div className="mb-4">
          <label htmlFor="date" className="mr-2">
            Filter:
          </label>
          <input
            type="date"
            id="date"
            name="date"
            onChange={handleDateChange}
          />
        </div>

        <Table>
          <TableCaption>A list of your recent sales.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px] font-bold">Customer ID</TableHead>
              <TableHead className="font-bold">Cashier</TableHead>
              <TableHead className="font-bold">Branch</TableHead>
              <TableHead className="text-right font-bold">Date</TableHead>
              <TableHead className="text-right font-bold">Time</TableHead>
              <TableHead className="text-right font-bold">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {invoices.slice().reverse().map((invoice, index) => (
              <TableRow
                key={invoice.billId}
                className={index % 2 === 0 ? "black-100" : "black-200"}
              >
                <TableCell className="font-medium">{invoice.billId}</TableCell>
                <TableCell>{invoice.cashierId}</TableCell>
                <TableCell>{invoice.branchId}</TableCell>
                <TableCell className="text-right">
                  {`${invoice.billDate.slice(0, 2)}/${invoice.billDate.slice(
                    2,
                    4
                  )}/${invoice.billDate.slice(4)}`}
                </TableCell>
                <TableCell className="text-right">{invoice.billTime}</TableCell>
                <TableCell className="text-right">{invoice.totalAmount}</TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={5}>Total</TableCell>
              <TableCell className="text-right">
                Rs.{" "}
                {invoices
                  .reduce(
                    (total, invoice) =>
                      total +
                      parseFloat(invoice.totalAmount.replace("Rs. ", "")),
                    0
                  )
                  .toFixed(2)}
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </div>
    </>
  );
}
