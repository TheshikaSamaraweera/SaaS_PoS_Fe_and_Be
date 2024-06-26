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
  PackagePlus,
} from "lucide-react";
import { Button } from "./ui/button";

import { useWindowWidth } from "@react-hook/window-size";
import { UserRoleCard } from "./user-role-card";

export default function SideNavbar({}: Props) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [showUserRoleCard, setShowUserRoleCard] = useState(true);

  const onlyWidth = useWindowWidth();
  const mobileWidth = onlyWidth < 768;

  function toggleSidebar() {
    setIsCollapsed(!isCollapsed);
    setShowUserRoleCard(!showUserRoleCard);
  }

  function toggleUserRoleCard() {
    setShowUserRoleCard(!showUserRoleCard);
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
      {showUserRoleCard && ( // Step 3
        <div>
          <UserRoleCard />
        </div>
      )}
      <Nav
        isCollapsed={mobileWidth ? true : isCollapsed}
        links={[
          {
            title: "Dashboard",
            href: "/cashier/dashboard",
            icon: LayoutDashboard,
            variant: "default",
          },
          {
            title: "PoS",
            href: "/cashier/pos",
            icon: Calculator,
            variant: "ghost",
          },
          {
            title: "Store",
            href: "/cashier/store",
            icon: ClipboardList,
            variant: "ghost",
          },
          {
            title: "Item List",
            href: "/cashier/itemlist",
            icon: UsersRound,
            variant: "ghost",
          },
          {
            title: "Request Item",
            href: "/cashier/requestItem",
            icon: PackagePlus,
            variant: "ghost",
          },
          {
            title: "Report",
            href: "/cashier/report",
            icon: File,
            variant: "ghost",
          },
        ]}
      />
    </div>
  );
}
