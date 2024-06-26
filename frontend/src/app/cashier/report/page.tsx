"use client";

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
import Modal from "react-modal";
import "../../../../styles/pos.css";

export default function TableDemo() {
  interface Bill {
    billId: number;
    cashierId: number;
    totalAmount: number;
    branchId: number;
    companyId: string;
    billDate: string;
    billTime: string;
    items: Item[];
  }

  interface Item {
    itemName: string;
    unitPrice: number;
    count: number;
    totalPrice: number;
  }

  interface Invoice {
    billId: number;
    cashierId: number;
    totalAmount: string;
    branchId: number;
    companyId: string;
    billDate: string;
    billTime: string;
    items: Item[];
  }

  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedCashier, setSelectedCashier] = useState<string>("");
  const [selectedBranch, setSelectedBranch] = useState<string>("");
  const [selectedBill, setSelectedBill] = useState<Invoice | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchBills = async (
    billDate?: string,
    cashierId?: string,
    branchId?: string
  ) => {
    let url = "http://localhost:3000/bill";

    if (billDate) {
      url = `http://localhost:3000/bill/date/${billDate}`;
    } else if (cashierId) {
      url = `http://localhost:3000/bill/cashier/${cashierId}`;
    } else if (branchId) {
      url = `http://localhost:3000/bill/branch/${branchId}`;
    }

    const response = await fetch(url);
    const data: Bill[] = await response.json();

    const formattedData = data.map((bill: Bill) => ({
      billId: bill.billId,
      cashierId: bill.cashierId,
      totalAmount: `Rs. ${bill.totalAmount.toFixed(2)}`,
      branchId: bill.branchId,
      companyId: bill.companyId,
      billDate: bill.billDate,
      billTime: bill.billTime,
      items: bill.items,
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
    fetchBills(formattedDate, selectedCashier, selectedBranch);
  };

  const handleCashierChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const cashierId = event.target.value;
    setSelectedCashier(cashierId);
    fetchBills(selectedDate, cashierId, selectedBranch);
  };

  const handleBranchChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const branchId = event.target.value;
    setSelectedBranch(branchId);
    fetchBills(selectedDate, selectedCashier, branchId);
  };

  return (
    <>
      <Head>
        <title>Sales Report</title>
      </Head>

      <div>
        <PageTitle title="Sales Report" />

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "1rem",
          }}
        >
          <div className="mb-4">
            <label htmlFor="date" className="mr-2">
              Filter by Date:
            </label>
            <input
              type="date"
              id="date"
              name="date"
              onChange={handleDateChange}
            />
          </div>

          <div className="mb-4">
            <label htmlFor="cashier" className="mr-2">
              Filter by Cashier:
            </label>
            <select id="cashier" name="cashier" onChange={handleCashierChange}>
              <option value="">All</option>
              <option value="CAS001">CAS001</option>
              <option value="CAS002">CAS002</option>
              <option value="CAS003">CAS003</option>
            </select>
          </div>

          <div className="mb-4">
            <label htmlFor="branch" className="mr-2">
              Filter by Branch:
            </label>
            <select id="branch" name="branch" onChange={handleBranchChange}>
              <option value="">All</option>
              <option value="BRN001">BRN001</option>
              <option value="BRN002">BRN002</option>
              <option value="BRN003">BRN003</option>
            </select>
          </div>
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
            {invoices
              .slice()
              .reverse()
              .map((invoice, index) => (
                <TableRow
                  key={invoice.billId}
                  className={index % 2 === 0 ? "black-100" : "black-200"}
                  onClick={() => {
                    console.log("Row clicked, invoice:", invoice);
                    setSelectedBill(invoice);
                    setIsModalOpen(true);
                  }}
                >
                  <TableCell className="font-medium">
                    {invoice.billId}
                  </TableCell>
                  <TableCell>{invoice.cashierId}</TableCell>
                  <TableCell>{invoice.branchId}</TableCell>
                  <TableCell className="text-right">
                    {invoice.billDate
                      ? `${invoice.billDate.slice(
                          0,
                          2
                        )}/${invoice.billDate.slice(
                          2,
                          4
                        )}/${invoice.billDate.slice(4)}`
                      : "Date not available"}
                  </TableCell>
                  <TableCell className="text-right">
                    {invoice.billTime}
                  </TableCell>
                  <TableCell className="text-right">
                    {invoice.totalAmount}
                  </TableCell>
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
        <Modal
          isOpen={isModalOpen}
          onRequestClose={() => setIsModalOpen(false)}
          contentLabel="Bill Details"
          style={{
            overlay: {
              backgroundColor: "rgba(0, 0, 0, 0.01)",
            },
            content: {
              top: "50%",
              left: "50%",
              right: "auto",
              bottom: "auto",
              marginRight: "-50%",
              transform: "translate(-50%, -50%)",
              backgroundColor: "#fff",
              border: "1px solid #ccc",
              borderRadius: "4px",
              padding: "10px",
              width: "40%",
              height: "100%",
            },
          }}
        >
          <div className="modal-overlay">
            <div className="modal-content">
              <button
                className="close-button"
                onClick={() => setIsModalOpen(false)}
              >
                X
              </button>
              <h2>Bill Details</h2>
              {selectedBill && (
                <>
                  <p>
                    <strong>Bill ID:</strong> {selectedBill.billId}
                  </p>
                  <p>
                    <strong>Cashier ID:</strong> {selectedBill.cashierId}
                  </p>
                  <p>
                    <strong>Branch ID:</strong> {selectedBill.branchId}
                  </p>
                  <p>
                    <strong>Total Amount:</strong> {selectedBill.totalAmount}
                  </p>
                  <p>
                    <strong>Bill Date:</strong> {selectedBill.billDate}
                  </p>
                  <p>
                    <strong>Bill Time:</strong> {selectedBill.billTime}
                  </p>
                  <table className="bill-table">
                    <thead>
                      <tr>
                        <th>Item</th>
                        <th>Quantity</th>
                        <th>Unit Price</th>
                        <th>Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedBill.items.map((item, index) => (
                        <tr key={index}>
                          <td>{item.itemName}</td>
                          <td>{item.count}</td>
                          <td>{item.unitPrice}</td>
                          <td>{item.totalPrice}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </>
              )}
              <button
                onClick={() => setIsModalOpen(false)}
                className="secondary-close-button"
              >
                Close
              </button>
            </div>
          </div>
        </Modal>
      </div>
    </>
  );
}
