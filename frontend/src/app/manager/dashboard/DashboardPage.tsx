// src/app/manager/dashboard/DashboardPage.tsx
'use client';

import { useState, useEffect } from 'react';
import PageTitle from '@/components/PageTitle';
import { DollarSign, CreditCard } from 'lucide-react';
import Card, { CardContent, CardProps } from '@/components/Card';
import ManagerBarChart from '@/components/managerBarChart';
import SalesCard from '@/components/SalesCard';
import { useUser } from '@clerk/nextjs';

const today = new Date();
const dateString = today.toLocaleDateString();

const cardData: CardProps[] = [
  {
    label: 'Total Revenue',
    amount: 0,
    discription: `Total revenue in ${dateString}`, // Corrected typo from 'discription' to 'description'
    icon: DollarSign,
  },
  {
    label: 'Sales',
    amount: 0,
    discription: `Sales in ${dateString}`, // Corrected typo from 'discription' to 'description'
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

interface DashboardPageProps {
  userId: string;
}

const DashboardPage = ({ userId }: DashboardPageProps) => {
  const [billData, setBillData] = useState<Bill[]>([]);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [totalSales, setTotalSales] = useState(0);
  const [userDetails, setUserDetails] = useState<{ firstName: string, lastName: string, userName: string } | null>(null);
  const { user } = useUser();

  useEffect(() => {
    fetch('http://localhost:3000/bill')
      .then((response) => response.json())
      .then((data) => {
        const bills = data.reverse();
        const sortedBills = bills.sort((a: Bill, b: Bill) => b.totalAmount - a.totalAmount); // Sort bills in descending order of totalAmount
        setBillData(sortedBills.slice(0, 5));
        const revenue = sortedBills.reduce((sum: number, bill: Bill) => sum + bill.totalAmount, 0);
        setTotalRevenue(revenue);
        setTotalSales(sortedBills.length);
        cardData[0].amount = revenue;
        cardData[1].amount = sortedBills.length;
      });
  }, []);

  useEffect(() => {
    // Directly use user details from useUser hook
    if (user) {
      const { firstName, lastName, username } = user;
      // Provide a fallback value for firstName, lastName, and username to ensure they are always strings
      setUserDetails({
        firstName: firstName || '', // Fallback to an empty string if firstName is null
        lastName: lastName || '', // Fallback to an empty string if lastName is null
        userName: username || '' // Fallback to an empty string if username is null
      });
      console.log('User Details:', { firstName: firstName || '', lastName: lastName || '', userName: username || '' });
    }
  }, [user]);

  return (
    <div className="flex flex-col gap-5 w-full">
      <PageTitle title="Manager Dashboard" />
      <section className="grid w-full grid-cols-1 gap-4 gap-x-8 transition-all sm:grid-cols-2 xl:grid-cols-4">
        {cardData.map((d, i) => (
          <Card key={i} amount={d.amount} discription={d.discription} icon={d.icon} label={d.label} />
        ))}
      </section>
      <section className="grid grid-cols-1 gap-4 transition-all lg:grid-cols-2">
        <CardContent>
          <p className="p-4 font-semibold">Overview</p>
          <ManagerBarChart />
        </CardContent>
        <CardContent className="flex justify-between gap-4">
          <section>
            <p>Top Sales</p>
          </section>
          {billData.map((bill, i) => (
            <SalesCard key={i} email={bill.billId} name={`${bill.billDate} ${bill.billTime}`} saleAmount={bill.totalAmount} />
          ))}
        </CardContent>
      </section>
    </div>
  );
};

export default DashboardPage;