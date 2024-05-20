/** @format */
"use client";

import SalesCard from "@/components/SalesCard";
import { useEffect, useState } from "react";

interface Bill {
  timestamp: string;
  billId: string;
  billDate: string;
  billTime: string;
  totalAmount: number;
}

export default function Home() {
  const [billData, setBillData] = useState<Bill[]>([]);

  useEffect(() => {
    fetch("http://localhost:3000/bill")
      .then((response) => response.json())
      .then((data) => {
        const bills = data.reverse();
        const sortedBills = bills.sort((a: Bill, b: Bill) => b.totalAmount - a.totalAmount); // Sort bills in descending order of totalAmount
        setBillData(sortedBills);
      });
  }, []);

  return (
    <div className="flex flex-col gap-5 w-full">
      <section className="grid grid-cols-1 gap-4 transition-all lg:grid-cols-2">
        <div className="card-content flex flex-col gap-4">
          <section>
            <p>All Sales</p>
          </section>
          <ul className="list-disc list-inside">
            {billData.map((bill, i) => (
              <li key={i}>
                <SalesCard
                  email={bill.billId}
                  name={`${bill.billDate} ${bill.billTime}`}
                  saleAmount={bill.totalAmount}
                />
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}
