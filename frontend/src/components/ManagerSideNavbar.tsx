/** @format */
"use client";

import { useState } from "react";
import { Nav } from "./ui/nav";

type Props = {};

import {
  ShoppingCart,
  LayoutDashboard,
  UsersRound,
  Settings,
  ChevronRight,
  Building,
  Calculator,
  UserPlus,
  ClipboardList,
  File,
  Warehouse,
  LineChart,
  PackagePlus,

  
} from "lucide-react";
import { Button } from "./ui/button";

import { useWindowWidth } from "@react-hook/window-size";

export default function SideNavbar({}: Props) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const onlyWidth = useWindowWidth();
  const mobileWidth = onlyWidth < 768;

  function toggleSidebar() {
    setIsCollapsed(!isCollapsed);
  }

  return (
    <div className="relative min-w-[80px] border-r px-3  pb-10 pt-24 ">
      {!mobileWidth && (
        <div className="absolute right-[-20px] top-7">
          <Button
            onClick={toggleSidebar}
            variant="secondary"
            className=" rounded-full p-2"
          >
            <ChevronRight />
          </Button>
        </div>
      )}
      <Nav
        isCollapsed={mobileWidth ? true : isCollapsed}
        links={[
          {
            title: "Dashboard",
            href: "/manager/dashboard",
            icon: LayoutDashboard,
            variant: "default"
          },
          {
            title: "Users",
            href: "/manager/users",
            icon: UsersRound,
            variant: "ghost"
          },
          
         
          {
            title: "Items",
            href: "/manager/inventry",
            icon: ClipboardList,
            variant: "ghost"
          },
          {
            title: "Add Branch Managers",
            href: "/manager/bmanagers",
            icon: PackagePlus,
            variant: "ghost"
          },
          {
            title: "Branch Managers",
            href: "/manager/manager-management",
            icon: Warehouse,
            variant: "ghost"
          },
          {
            title: "Sells",
            href: "/manager/sels",
            icon: LineChart,
            variant: "ghost"
          },

        ]}
      />
    </div>
  );
}
