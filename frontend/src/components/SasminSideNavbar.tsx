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
} from "lucide-react";
import { Button } from "./ui/button";

import { useWindowWidth } from "@react-hook/window-size";
import { UserRoleCard } from "./user-role-card";

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

      {UserRoleCard && ( // Step 3
        <div>
          <UserRoleCard />
        </div>
      )}
      <Nav
        isCollapsed={mobileWidth ? true : isCollapsed}
        links={[
          {
            title: "Dashboard",
            href: "/super-admin/dashboard",
            icon: LayoutDashboard,
            variant: "default",
          },

          {
            title: "Branches",
            href: "/register",
            icon: Calculator,
            variant: "ghost",
          },
          {
            title: "Managers",
            href: "/super-admin/managerManagement",
            icon: ClipboardList,
            variant: "ghost",
          },
        ]}
      />
    </div>
  );
}
