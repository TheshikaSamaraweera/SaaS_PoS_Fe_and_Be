/** @format */
import { Button } from "@/components/ui/button";
import PageTitle from "@/components/PageTitle";
import Image from "next/image";
import { ShoppingCartIcon } from "lucide-react";
import Card, { CardContent, CardProps } from "@/components/Card";

const cardData: CardProps[] = [{
  label: "Chocolate Fingers",
  amount: "Rs. 380.00",
  discription: "A delicious and timeless Sri Lankan favourite",
  icon: ShoppingCartIcon,
},
{
  label: "Mentos Mint",
  amount: "Rs. 100.00",
  discription: "Crispy, crunchy texture with No artificial flavours",
  icon: ShoppingCartIcon,
},
{
  label: "Lemon Puff",
  amount: "Rs. 130.00",
  discription: "Chocolate biscuits filled with delicious chocolate cream",
  icon: ShoppingCartIcon,
},
{
  label: "Magic Treats",
  amount: "Rs. 290.00",
  discription: "Crispy, crunchy texture with No artificial flavours",
  icon: ShoppingCartIcon,
},
{
  label: "Jumbo Peanut",
  amount: "Rs. 420.00",
  discription: "A delicious and timeless Sri Lankan favourite",
  icon: ShoppingCartIcon,
},
{
  label: "Cream Cracker",
  amount: "Rs. 480.00",
  discription: "Crispy, crunchy texture with No artificial flavours",
  icon: ShoppingCartIcon,
},
{
  label: "Chocolate Cream",
  amount: "Rs. 405.00",
  discription: "Crispy, crunchy texture with No artificial flavours",
  icon: ShoppingCartIcon,
},
{
  label: "Tikiri Marie",
  amount: "Rs. 330.00",
  discription: "Crispy, crunchy texture with No artificial flavours",
  icon: ShoppingCartIcon,
},
{
  label: "Sun Cracker",
  amount: "Rs. 110.00",
  discription: "A delicious and timeless Sri Lankan favourite",
  icon: ShoppingCartIcon,
},
{
  label: "Magic Treats",
  amount: "Rs. 290.00",
  discription: "Crispy, crunchy texture with No artificial flavours",
  icon: ShoppingCartIcon,
},
{
  label: "Mentos Mint",
  amount: "Rs. 100.00",
  discription: "Crispy, crunchy texture with No artificial flavours",
  icon: ShoppingCartIcon,
},
{
  label: "Jumbo Peanut",
  amount: "Rs. 420.00",
  discription: "A delicious and timeless Sri Lankan favourite",
  icon: ShoppingCartIcon,
},
{
  label: "Cream Cracker",
  amount: "Rs. 480.00",
  discription: "Crispy, crunchy texture with No artificial flavours",
  icon: ShoppingCartIcon,
},
];

export default function Home() {
  return (
    <div className="flex flex-col gap-5  w-full">
        
      <PageTitle title="Inventory Items" />
      <Button style={{ width: "200px" }}>Add new Items</Button>
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
    </div>
  );
}
