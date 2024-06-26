/** @format */

import PageTitle from "@/components/PageTitle";
import Image from "next/image";
import { DollarSign, Users, CreditCard, Activity } from "lucide-react";
import Card, { CardContent, CardProps } from "@/components/Card";
import BarChart from "@/components/BarChart";
import SalesCard, { SalesProps } from "@/components/SalesCard";
import { Button } from '@/components/ui/button';

const cardData: CardProps[] = [
  // Your card data here
];

const userSalesData: SalesProps[] = [
  // Your user sales data here
];

export default function Home() {
  return (
    <div className="flex flex-col gap-5 w-full">
      <PageTitle title="Super Admin Dashboard" />

      <section className="grid grid-cols-1 gap-4 transition-all lg:grid-cols-2">
        <CardContent>
          <p className="p-4 font-semibold">User Management</p>
          <div className="flex justify-center">
            <Image src="/images/usermanagment.png" alt="User Management" width={300} height={200} />
          </div>
          <p className="flex justify-center">Here you can Manage all user Roles, Authentication, Authorization, and Session Management</p>
          <div className="flex justify-center gap-4 mt-4">
          <Button type="submit" className="w-full/4 font-bold">
                  User managment
                </Button>
            
          </div>
        </CardContent>

        <CardContent className="flex justify-between gap-4">
          <section className="w-full">
            <p className="p-4 font-semibold">Add Users</p>
            <div className="flex justify-center">
              <Image src="/images/adduser.png" alt="Add Users" width={300} height={200} />
            </div>
            <p className="flex justify-center">Here you can Add all users</p>
            <div className="flex justify-center gap-4 mt-4">
            <Button type="submit" className="w-full/4 font-bold">
                  Add User
                </Button>
              
            </div>
          </section>
        </CardContent>

        {/* Add more CardContent components as needed */}
      </section>
    </div>
  );
}
