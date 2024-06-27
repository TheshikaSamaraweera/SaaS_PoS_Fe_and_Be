/** @format */
"use client";

import { useState } from "react";
import { Nav } from "./ui/nav";
import Link from "next/link";
import { auth } from "@clerk/nextjs/server";

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
import { UserButton } from "@clerk/nextjs";
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
            href: "/manager/dashboard",
            icon: LayoutDashboard,
            variant: "default",
          },
          {
            title: "Add-branch",
            href: "/manager/add-branch",
            icon: ClipboardList,
            variant: "ghost",
          },
          {
            title: "Branches",
            href: "/manager/branch",
            icon: ClipboardList,
            variant: "ghost",
          },
          {
            title: "Add Branch Managers",
            href: "/manager/bmanagers",
            icon: PackagePlus,
            variant: "ghost",
          },
          {
            title: "Branch Managers",
            href: "/manager/manager-management",
            icon: Warehouse,
            variant: "ghost",
          },
          {
            title: "Sells",
            href: "/manager/sels",
            icon: LineChart,
            variant: "ghost",
          },
          {
            title: "Registation",
            href: "/auto-logout",
            icon: UsersRound,
            variant: "ghost",
          },
        ]}
      />
    </div>
  );
}
