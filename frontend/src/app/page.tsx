/** @format */

import PageTitle from "@/components/PageTitle";
import Image from "next/image";
import { DollarSign, Users, CreditCard, Activity } from "lucide-react";
import Card, { CardContent, CardProps } from "@/components/Card";
import BarChart from "@/components/BarChart";
import SalesCard, { SalesProps } from "@/components/SalesCard";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col gap-5 w-full">
      <section className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="printable-section w-full lg:col-span-1">
          <PageTitle title="RXBIT COMPANY" />
          <Link href="/sign-in">SignIn</Link>
          <br />
          <Link href="/sign-up">SignUp</Link>
        </div>
        <div className="printable-section w-full lg:col-span-2">
          <h1>Hello</h1>
        </div>
      </section>
    </div>
  );
}
