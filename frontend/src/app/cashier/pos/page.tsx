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
import { useState, useEffect } from "react";
import { any, string } from "zod";
import "../../../../styles/pos.css";

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState("Snacks");
  const [selectedItems, setSelectedItems] = useState<CardProps[]>([]);

  const [cardData, setCardData] = useState<{ [key: string]: CardProps[] }>({});
  useEffect(() => {
    fetchItems();
  }, []);

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };

  const handleCardClick = (card: CardProps) => {
    setSelectedItems([...selectedItems, { ...card, id: Date.now() }]);
  };

  const handleRemoveClick = (itemToRemove: CardProps) => {
  setSelectedItems(selectedItems.filter((item) => item.id !== itemToRemove.id));
};

  const totalAmount = selectedItems.reduce((total, item) => {
    return total + Number(item.amount);
  }, 0);

  const fetchItems = async () => {
    try {
      const response = await fetch("http://localhost:3000/inventory");
      const data = await response.json();
      const categorizedData = data.reduce((acc: any, item: any) => {
        const category = item.category; //.toLowerCase();
        const cardItem = {
          label: item.itemName,
          code: item.itemID,
          amount: item.sellPrice,
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

  const printBill = () => {
    window.print();
  };

  return (
    <div className="flex flex-col gap-5 w-full">
      <PageTitle title="Point of Sales" />
      <section className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="printable-section">
          <CardContent className="lg:col-span-1">
            <CardContent>
              <section className="flex flex-col items-center p-1">
                <h2>Selected Items</h2>
                {selectedItems.map((item, index) => (
                  <div className="item-info" key={index}>
                    <h3>
                      {item.label} : Rs. {item.amount}{" "}
                      <button onClick={() => handleRemoveClick(item)}>*</button>
                    </h3>
                  </div>
                ))}
                <br></br>
                <h2>Total: Rs. {totalAmount.toFixed(2)}</h2>
                <br />
                <h4>Click (*) to remove the item</h4>
                <br />
                <button className="clear-button" onClick={() => setSelectedItems([])}>CLEAR ALL</button>
              </section>
            </CardContent>
          </CardContent>
        </div>
        <CardContent className="lg:col-span-2">
          <section>
            <SubNav handleCategoryChange={handleCategoryChange} />
            <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {cardData[selectedCategory]?.map((d, i) => (
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
      </section>
    </div>
  );
}
