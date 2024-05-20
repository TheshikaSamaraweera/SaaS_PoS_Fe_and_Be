"use client";

import { usePathname } from "next/navigation";
import CashiorSideNavbar from "@/components/CashiorSideNavbar";
import BmanagerSideNavbar from "@/components/BmanagerSideNavbar";
import SasminSideNavbar from "@/components/SasminSideNavbar";
import ManagerSideNavbar from "@/components/ManagerSideNavbar";

// Define the type for the sidebars object
type SidebarComponents = {
  "/cashier": React.FC;
  "/manager": React.FC;
  "/branch-manager": React.FC;
  "/super-admin": React.FC;
};

const sidebars: SidebarComponents = {
  "/cashier": CashiorSideNavbar,
  "/manager": ManagerSideNavbar,
  "/branch-manager": BmanagerSideNavbar,
  "/super-admin": SasminSideNavbar,
};

const DynamicSidebar: React.FC = () => {
  const pathname = usePathname();

  const SidebarKey = (Object.keys(sidebars) as (keyof SidebarComponents)[]).find((key) =>
    pathname.startsWith(key)
  );

  if (!SidebarKey) return null;

  const SidebarComponent = sidebars[SidebarKey];

  return <SidebarComponent />;
};

export default DynamicSidebar;
