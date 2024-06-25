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
import { nanoid } from "nanoid";
import BillProcess from "../../../components/bill-process";

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState("Snacks");
  const [selectedItems, setSelectedItems] = useState<CardProps[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [billId, setBillId] = useState(nanoid());
  const [cashierId, setCashierId] = useState("CAS001");
  const [branchId, setBranchId] = useState("BRN001");
  const [companyId, setCompanyId] = useState("COM001");
  const [cardData, setCardData] = useState<{ [key: string]: CardProps[] }>({});
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    fetchItems();
  }, []);

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };

  const handleCardClick = (card: CardProps) => {
    const existingItem = selectedItems.find(
      (item) => item.label === card.label
    );

    if (existingItem) {
      setSelectedItems(
        selectedItems.map((item) =>
          item.label === card.label
            ? { ...item, count: (item.count || 1) + 1 }
            : item
        )
      );
    } else {
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

  const handleIncreaseClick = (itemToIncrease: CardProps) => {
    setSelectedItems(
      selectedItems.map((item) =>
        item.id === itemToIncrease.id && item.count && item.count >= 1
          ? { ...item, count: item.count + 1 }
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
        const category = item.category;
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

  const handleInputChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = event.target;
    if (name === "cashierId") {
      setCashierId(value);
    } else if (name === "branchId") {
      setBranchId(value);
    } else if (name === "companyId") {
      setCompanyId(value);
    }
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handlePrintClick = () => {
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  const resetPos = () => {
    setSelectedItems([]);
    setBillId(nanoid());
    setCashierId("CAS001");
    setBranchId("BRN001");
    setCompanyId("COM001");
  };

  const billDetails = {
    billId,
    cashierId,
    branchId,
    companyId,
    items: selectedItems.map((item) => ({
      label: item.label,
      amount: item.amount,
      count: item.count || 1,
    })),
    totalAmount,
  };

  return (
    <div className="flex flex-col gap-5 w-full">
      <PageTitle title="Point of Sales" />
      <section className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="printable-section w-full">
          <CardContent className="lg:col-span-1">
            <section>
            <div className="flex justify-between w-full">
                  <select
                    name="cashierId"
                    onChange={handleInputChange}
                    defaultValue="CAS001"
                  >
                    <option value="CAS001">CAS001</option>
                    <option value="CAS002">CAS002</option>
                    <option value="CAS003">CAS003</option>
                  </select>
                  <select
                    name="branchId"
                    onChange={handleInputChange}
                    defaultValue="BRN001"
                  >
                    <option value="BRN001">BRN001</option>
                    <option value="BRN002">BRN002</option>
                    <option value="BRN003">BRN003</option>
                  </select>
                  <select
                    name="companyId"
                    onChange={handleInputChange}
                    defaultValue="COM001"
                  >
                    <option value="COM001">COM001</option>
                    <option value="COM002">COM002</option>
                    <option value="COM003">COM003</option>
                  </select>
                </div>
            </section>
            <CardContent>
              <section className="flex flex-col items-center p-1 w-full">
                <h2 className="font-bold">Bill</h2>
                <p>Bill ID: {billId}</p>
                <div className="flex justify-between w-full">
                  <span>Date: {new Date().toLocaleDateString()}</span>
                  <span className="time-span">
                    Time: {new Date().toLocaleTimeString()}
                  </span>
                </div>
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
                        onClick={() => handleIncreaseClick(item)}
                      >
                        <img src="/images/arrow.png" alt="Increase Item" />
                      </button>
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
                  <button className="print-button" onClick={handlePrintClick}>
                    PROCESS
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
      <BillProcess
        isVisible={isModalVisible}
        onClose={handleCloseModal}
        billDetails={billDetails}
        resetPos={resetPos}
      />
    </div>
  );
}
