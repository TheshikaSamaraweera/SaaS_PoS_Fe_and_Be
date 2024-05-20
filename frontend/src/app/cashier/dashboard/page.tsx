/** @format */
"use client";

import PageTitle from "@/components/PageTitle";
import Image from "next/image";
import { DollarSign, Users, CreditCard, Activity } from "lucide-react";
import Card, { CardContent, CardProps } from "@/components/Card";
import CashierBarChart from "@/components/cashierBarChart";
import SalesCard, { SalesProps } from "@/components/SalesCard";
import { useEffect, useState } from "react";

const today = new Date();
const dateString = today.toLocaleDateString();

const cardData: CardProps[] = [
  {
    label: "Total Revenue",
    amount: 0,
    discription: `Total revenue in ${dateString}`,
    icon: DollarSign,
  },
  {
    label: "Sales",
    amount: 0,
    discription: `Sales in ${dateString}`,
    icon: CreditCard,
  },
];

interface Bill {
  timestamp: string;
  billId: string;
  billDate: string;
  billTime: string;
  totalAmount: number;
}

export default function Home() {
  const [billData, setBillData] = useState<Bill[]>([]);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [totalSales, setTotalSales] = useState(0);
  const today = new Date();
  const billDate = `${(today.getMonth() + 1).toString().padStart(2, "0")}${today
    .getDate()
    .toString()
    .padStart(2, "0")}${today.getFullYear()}`;

  useEffect(() => {
    fetch(`http://localhost:3000/bill/date/${billDate}`)
      .then((response) => response.json())
      .then((data) => {
        const bills = data.reverse();
        setBillData(bills.slice(0, 5));
        const revenue = bills.reduce(
          (sum: number, bill: Bill) => sum + bill.totalAmount,
          0
        );
        setTotalRevenue(revenue);
        setTotalSales(bills.length);
        cardData[0].amount = revenue;
        cardData[1].amount = bills.length;
      });
  }, []);

  return (
    <div className="flex flex-col gap-5  w-full">
      <PageTitle title="Cashier Dashboard" />
      <section className="grid w-full grid-cols-1 gap-4 gap-x-8 transition-all sm:grid-cols-2 xl:grid-cols-4">
        {cardData.map((d, i) => (
          <Card
            key={i}
            amount={d.amount}
            discription={d.discription}
            icon={d.icon}
            label={d.label}
          />
        ))}
      </section>
      <section className="grid grid-cols-1  gap-4 transition-all lg:grid-cols-2">
        <CardContent>
          <p className="p-4 font-semibold">Overview</p>
          <p>{billDate}</p>
          <CashierBarChart />
        </CardContent>
        <CardContent className="flex justify-between gap-4">
          <section>
            <p>Recent Sales</p>
          </section>
          {billData.map((bill, i) => (
            <SalesCard
              key={i}
              email={bill.billId}
              name={`${bill.billDate.slice(0, 2)}/${bill.billDate.slice(
                2,
                4
              )}/${bill.billDate.slice(4)} ${bill.billTime}`}
              saleAmount={bill.totalAmount}
            />
          ))}
        </CardContent>
      </section>
    </div>
  );
}
