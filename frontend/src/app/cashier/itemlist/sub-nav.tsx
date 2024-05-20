import { useState } from "react";
import { CardContent } from "@/components/Card";
import { cn } from "@/lib/utils";

interface SubNavProps {
  handleCategoryChange: (category: string) => void;
  className?: string;
}

export function SubNav({ handleCategoryChange, className }: SubNavProps) {
  return (
    <CardContent className="mb-5">
      <nav className={cn("grid grid-cols-2 gap-4 lg:grid-cols-4 lg:space-x-6 ", className)}>
        <button
          onClick={() => handleCategoryChange("Snacks")}
          className="text-sm font-bold transition-colors hover:text-primary"
        >
          Snacks & Confectionery
        </button>
        <button
          onClick={() => handleCategoryChange("BabyProducts")}
          className="text-sm font-bold text-muted-foreground transition-colors hover:text-primary"
        >
          Baby Products
        </button>
        <button
          onClick={() => handleCategoryChange("Fashion")}
          className="text-sm font-bold text-muted-foreground transition-colors hover:text-primary"
        >
          Fashion
        </button>
        <button
          onClick={() => handleCategoryChange("Stationary")}
          className="text-sm font-bold text-muted-foreground transition-colors hover:text-primary"
        >
          Stationary
        </button>
      </nav>
    </CardContent>
  );
}
