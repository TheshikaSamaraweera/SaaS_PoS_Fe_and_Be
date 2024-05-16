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

// Data was fetched from the server - if you want to use the hardcoded data, uncomment the code below
// and comment out the fetchItems function and the useEffect hook
// const cardData: { [key: string]: CardProps[] } = {
//   snacks: [
//     {
//       label: "Magic Treats",
//       code: "ITM002",
//       amount: "Rs. 290.00",
//       discription: "Crispy, crunchy texture with No artificial flavors",
//       icon: Activity,
//     },
//     {
//       label: "Yummy Bites",
//       code: "ITM002",
//       amount: "Rs. 150.00",
//       discription: "Delicious bites with a burst of flavor",
//       icon: Activity,
//     },
//     {
//       label: "Crunchy Paws",
//       code: "ITM002",
//       amount: "Rs. 210.00",
//       discription: "Satisfying crunchiness for your furry friend",
//       icon: Activity,
//     },
//     {
//       label: "Puppy Delights",
//       code: "ITM002",
//       amount: "Rs. 180.00",
//       discription: "Irresistibly tasty treats for your little one",
//       icon: Activity,
//     },
//     {
//       label: "Tasty Bones",
//       code: "ITM002",
//       amount: "Rs. 250.00",
//       discription: "Bone-shaped treats packed with flavor",
//       icon: Activity,
//     },
//     {
//       label: "Savory Strips",
//       code: "ITM002",
//       amount: "Rs. 200.00",
//       discription: "Succulent strips for a satisfying snack time",
//       icon: Activity,
//     },
//     {
//       label: "Chewy Chunks",
//       code: "ITM002",
//       amount: "Rs. 220.00",
//       discription: "Chewy chunks that dogs love to sink their teeth into",
//       icon: Activity,
//     },
//     {
//       label: "Happy Tails",
//       code: "ITM002",
//       amount: "Rs. 170.00",
//       discription: "Tail-wagging treats to make your pup smile",
//       icon: Activity,
//     },
//     {
//       label: "Pawsome Snacks",
//       code: "ITM002",
//       amount: "Rs. 190.00",
//       discription: "Snacks that your furry friend will beg for",
//       icon: Activity,
//     },
//     {
//       label: "Bark Bites",
//       code: "ITM002",
//       amount: "Rs. 160.00",
//       discription: "Bite-sized treats perfect for training or rewards",
//       icon: Activity,
//     },
//   ],
//   babyProducts: [
//     {
//       label: "Soft Blanket",
//       code: "ITM002",
//       amount: "Rs. 350.00",
//       discription: "Cozy and warm blanket for your little one",
//       icon: CreditCard,
//     },
//     {
//       label: "Baby Onesie",
//       code: "ITM002",
//       amount: "Rs. 250.00",
//       discription: "Cute and comfortable outfit for your baby",
//       icon: CreditCard,
//     },
//     {
//       label: "Soothing Teether",
//       code: "ITM002",
//       amount: "Rs. 150.00",
//       discription: "Gentle teether to ease teething discomfort",
//       icon: CreditCard,
//     },
//     {
//       label: "Baby Bath Tub",
//       code: "ITM002",
//       amount: "Rs. 450.00",
//       discription: "Safe and spacious tub for bathtime fun",
//       icon: CreditCard,
//     },
//     {
//       label: "Diaper Bag",
//       code: "ITM002",
//       amount: "Rs. 300.00",
//       discription: "Stylish and practical bag to carry baby essentials",
//       icon: CreditCard,
//     },
//     {
//       label: "Baby Monitor",
//       code: "ITM002",
//       amount: "Rs. 600.00",
//       discription: "Peace of mind with audio and video monitoring",
//       icon: CreditCard,
//     },
//     {
//       label: "Soft Toys Set",
//       code: "ITM002",
//       amount: "Rs. 200.00",
//       discription: "Adorable plush toys for cuddling and play",
//       icon: CreditCard,
//     },
//     {
//       label: "Baby Food Blender",
//       code: "ITM002",
//       amount: "Rs. 350.00",
//       discription: "Convenient blender for homemade baby food",
//       icon: CreditCard,
//     },
//     {
//       label: "Baby Carrier",
//       code: "ITM002",
//       amount: "Rs. 400.00",
//       discription: "Comfortable carrier for keeping your baby close",
//       icon: CreditCard,
//     },
//     {
//       label: "Baby Nail Clippers",
//       code: "ITM002",
//       amount: "Rs. 100.00",
//       discription: "Safe clippers designed for delicate baby nails",
//       icon: CreditCard,
//     },
//   ],
  
//   fashion: [
//     {
//       label: "Stylish Sunglasses",
//       code: "ITM002",
//       amount: "Rs. 500.00",
//       discription: "Fashionable shades to elevate your look",
//       icon: Activity,
//     },
//     {
//       label: "Classic Denim Jeans",
//       code: "ITM002",
//       amount: "Rs. 1000.00",
//       discription: "Timeless jeans for a versatile wardrobe staple",
//       icon: Activity,
//     },
//     {
//       label: "Elegant Dress",
//       code: "ITM002",
//       amount: "Rs. 1200.00",
//       discription: "Chic dress for any occasion",
//       icon: Activity,
//     },
//     {
//       label: "Comfortable Sneakers",
//       code: "ITM002",
//       amount: "Rs. 800.00",
//       discription: "Stylish sneakers for casual and active wear",
//       icon: Activity,
//     },
//     {
//       label: "Fashionable Handbag",
//       code: "ITM002",
//       amount: "Rs. 700.00",
//       discription: "Trendy bag to complement your outfit",
//       icon: Activity,
//     },
//     {
//       label: "Cozy Scarf",
//       code: "ITM002",
//       amount: "Rs. 300.00",
//       discription: "Soft scarf to keep you warm and stylish",
//       icon: Activity,
//     },
//     {
//       label: "Statement Necklace",
//       code: "ITM002",
//       amount: "Rs. 450.00",
//       discription: "Eye-catching necklace to add flair to any look",
//       icon: Activity,
//     },
//     {
//       label: "Formal Blazer",
//       code: "ITM002",
//       amount: "Rs. 1500.00",
//       discription: "Sharp blazer for a polished and professional appearance",
//       icon: Activity,
//     },
//     {
//       label: "Trendy Watch",
//       code: "ITM002",
//       amount: "Rs. 600.00",
//       discription: "Fashion-forward timepiece to complete your ensemble",
//       icon: Activity,
//     },
//     {
//       label: "Chic Ankle Boots",
//       code: "ITM002",
//       amount: "Rs. 900.00",
//       discription: "Sleek boots to add edge to your outfit",
//       icon: Activity,
//     },
//   ],
  
//   stationary: [
//     {
//       label: "Set of Colorful Pens",
//       code: "ITM002",
//       amount: "Rs. 150.00",
//       discription: "Vibrant pens for writing and drawing",
//       icon: Users,
//     },
//     {
//       label: "Notebook with Hardcover",
//       code: "ITM002",
//       amount: "Rs. 200.00",
//       discription: "Durable notebook with quality paper for note-taking",
//       icon: Users,
//     },
//     {
//       label: "Pack of Sticky Notes",
//       code: "ITM002",
//       amount: "Rs. 100.00",
//       discription: "Convenient sticky notes for reminders and messages",
//       icon: Users,
//     },
//     {
//       label: "Assorted Highlighters",
//       code: "ITM002",
//       amount: "Rs. 120.00",
//       discription: "Highlighters in various colors for organizing notes",
//       icon: Users,
//     },
//     {
//       label: "Mechanical Pencils",
//       code: "ITM002",
//       amount: "Rs. 80.00",
//       discription: "Refillable pencils for precise and neat writing",
//       icon: Users,
//     },
//     {
//       label: "Eraser and Sharpener Set",
//       code: "ITM002",
//       amount: "Rs. 50.00",
//       discription: "Essential tools for correcting mistakes and sharpening pencils",
//       icon: Users,
//     },
//     {
//       label: "Ruler with Metric and Imperial Measurements",
//       code: "ITM002",
//       amount: "Rs. 70.00",
//       discription: "Versatile ruler for accurate measurements",
//       icon: Users,
//     },
//     {
//       label: "Binder Clips Assortment",
//       code: "ITM002",
//       amount: "Rs. 90.00",
//       discription: "Assorted sizes of binder clips for organizing papers",
//       icon: Users,
//     },
//     {
//       label: "Transparent Tape Roll",
//       code: "ITM002",
//       amount: "Rs. 40.00",
//       discription: "Multipurpose tape for sealing and mending",
//       icon: Users,
//     },
//     {
//       label: "Desktop Organizer",
//       code: "ITM002",
//       amount: "Rs. 180.00",
//       discription: "Stylish organizer to keep your desk tidy",
//       icon: Users,
//     },
//   ],
  
// };

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState("Snacks"); 
  const [selectedItems, setSelectedItems] = useState<CardProps[]>([]);
  const [cardData, setCardData] = useState<{[key: string]: CardProps[]}>({});

  useEffect(() => {fetchItems();}, []);

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };

  const handleCardClick = (card: CardProps) => {
    setSelectedItems([...selectedItems, card]);
  };

  const handleRemoveClick = (itemToRemove: CardProps) => {
    setSelectedItems(selectedItems.filter(item => item !== itemToRemove));
  };

  const totalAmount = selectedItems.reduce((total, item) => {
    return total + parseFloat(item.amount.replace("Rs. ", ""));
  }, 0);

  const fetchItems = async () => {
    try {
      const response = await fetch('http://localhost:3000/inventory');
      const data = await response.json();
      const categorizedData = data.reduce((acc: any, item: any) => {
        const category = item.category; //.toLowerCase();
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
      console.error('Error fetching items:', error);
    }
  }

  return (
    <div className="flex flex-col gap-5 w-full">
      <PageTitle title="Point of Sales" />
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
    </div>
  );
}
