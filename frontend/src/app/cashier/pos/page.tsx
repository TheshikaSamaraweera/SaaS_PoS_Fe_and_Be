/** @format */
"use client";

import PageTitle from "@/components/PageTitle";
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
import Image from "next/image";

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState("Snacks");
  const [selectedItems, setSelectedItems] = useState<CardProps[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  const [cardData, setCardData] = useState<{ [key: string]: CardProps[] }>({});
  useEffect(() => {
    fetchItems();
  }, []);

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };

  // const handleCardClick = (card: CardProps) => {
  //   setSelectedItems([...selectedItems, { ...card, id: Date.now() }]);
  // };
  const handleCardClick = (card: CardProps) => {
    const existingItem = selectedItems.find(
      (item) => item.label === card.label
    );

    if (existingItem) {
      // Increment count of existing item
      setSelectedItems(
        selectedItems.map((item) =>
          item.label === card.label
            ? { ...item, count: (item.count || 1) + 1 }
            : item
        )
      );
    } else {
      // Add new item with count of 1
      setSelectedItems([
        ...selectedItems,
        { ...card, id: Date.now(), count: 1 },
      ]);
    }
  };

  const handleRemoveClick = (itemToRemove: CardProps) => {
    setSelectedItems(
      selectedItems.filter((item) => item.id !== itemToRemove.id)
    );
  };

  const handleDecreaseClick = (itemToDecrease: CardProps) => {
    setSelectedItems(
      selectedItems.map((item) =>
        item.id === itemToDecrease.id && item.count && item.count > 1
          ? { ...item, count: item.count - 1 }
          : item
      )
    );
  };

  const totalAmount = selectedItems.reduce((total, item) => {
    return total + Number(item.amount) * (item.count || 1);
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

  const printBill = async () => {
    try {
      const response = await fetch("http://localhost:3000/bill", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          items: selectedItems.map((item) => ({
            itemName: item.label,
            sellPrice: item.amount,
          })),
        }),
      });

      if (!response.ok) {
        throw new Error("HTTP error " + response.status);
      }

      window.print();
    } catch (error) {
      console.error("Error saving bill:", error);
    }
  };

  // const handleSearchChange = (event) => { //there is a typescript error in event,
  //   setSearchTerm(event.target.value);
  // };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
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
                <p>Date: {new Date().toLocaleDateString()}</p>
                <p>Time: {new Date().toLocaleTimeString()}</p>
                {selectedItems.map((item, index) => (
                  <div className="item-info" key={index}>
                    <h3 className="item-info-header">
                      <span className="item-label">
                        {item.label} : {item.count}
                      </span>
                      <span className="item-amount">
                        Rs. {item.amount * (item.count || 1)}
                        {"  "}
                      </span>
                      <button
                        className="close-button"
                        onClick={() => handleDecreaseClick(item)}
                      >
                        <img src="/images/down-arrow.png" alt="Decrease Item" />
                      </button>
                      <button
                        className="close-button"
                        onClick={() => handleRemoveClick(item)}
                      >
                        <img src="/images/multiply.png" alt="Remove Item" />
                      </button>
                    </h3>
                  </div>
                ))}
                <br></br>
                <h2 className="item-info">
                  Total: Rs. {totalAmount.toFixed(2)}
                </h2>
                <br />
                <div className="button-container">
                  <button className="print-button" onClick={printBill}>
                    PRINT BILL
                  </button>
                  <button
                    className="clear-button"
                    onClick={() => setSelectedItems([])}
                  >
                    CLEAR ALL
                  </button>
                </div>
              </section>
            </CardContent>
          </CardContent>
        </div>
        <CardContent className="lg:col-span-2">
          <div className="flex w-full max-w-sm items-center space-x-2">
            <Input
              type="email"
              placeholder="Search... "
              onChange={handleSearchChange}
            />
          </div>
          <section>
            <SubNav handleCategoryChange={handleCategoryChange} />
            <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {cardData[selectedCategory]
                ?.filter((d) => {
                  return (
                    d.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    (d.code &&
                      d.code.toLowerCase().includes(searchTerm.toLowerCase()))
                  );
                })
                .map((d, i) => (
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
