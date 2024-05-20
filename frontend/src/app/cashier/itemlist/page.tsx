/** @format */
"use client";

import PageTitle from "@/components/PageTitle";
import Image from "next/image";
import {
  DollarSign,
  Users,
  CreditCard,
  Activity,
  ChevronRightIcon,
} from "lucide-react";
import Card, { CardContent, CardProps } from "@/components/Card";
import BarChart from "@/components/BarChart";
import SalesCard, { SalesProps } from "@/components/SalesCard";
import { SubNav } from "./sub-nav";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { any, string } from "zod";

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState("Snacks");
  const [selectedItems, setSelectedItems] = useState<CardProps[]>([]);
  const [cardData, setCardData] = useState<{ [key: string]: CardProps[] }>({});
  const [searchQuery, setSearchQuery] = useState<string>("");

  useEffect(() => {
    fetchItems();
  }, []);

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };

  const handleCardClick = (card: CardProps) => {
    setSelectedItems([...selectedItems, card]);
  };

  const handleRemoveClick = (itemToRemove: CardProps) => {
    setSelectedItems(selectedItems.filter((item) => item !== itemToRemove));
  };

  const totalAmount = selectedItems.reduce((total, item) => {
    return total + parseFloat(item.amount.replace("Rs. ", ""));
  }, 0);

  const fetchItems = async () => {
    try {
      const response = await fetch("http://localhost:3000/inventory");
      const data = await response.json();
      const categorizedData = data.reduce((acc: any, item: any) => {
        const category = item.category;
        const cardItem = {
          label: item.itemName,
          code: item.itemID,
          amount: `Rs. ${item.sellPrice}`,
          discription: item.description,
          icon: Users,
        };

        if (acc[category]) {
          acc[category].push(cardItem);
        } else {
          acc[category] = [cardItem];
        }
        return acc;
      }, {});
      setCardData(categorizedData);
    } catch (error) {
      console.error("Error fetching items:", error);
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const allItems = Object.values(cardData).flat();

  const filteredItems = searchQuery
    ? allItems.filter(
        (item) =>
          item.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.code.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : cardData[selectedCategory];

  return (
    <div className="flex flex-col gap-5 w-full">
      <PageTitle title="Point of Sales" />
      <CardContent className="lg:col-span-2">
        <section>
        <div className="mb-5 w-1/5">
            <Input
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </div>
          <SubNav handleCategoryChange={handleCategoryChange} />

          <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {filteredItems?.map((d, i) => (
              <Card
                key={i}
                amount={d.amount}
                discription={d.discription}
                icon={d.icon}
                label={d.label}
                code={d.code}
                onClick={() => handleCardClick(d)}
              />
            ))}
          </section>
        </section>
      </CardContent>
    </div>
  );
}
