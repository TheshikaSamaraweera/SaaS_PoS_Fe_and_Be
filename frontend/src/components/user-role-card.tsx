import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { UserButton } from "@clerk/nextjs";
import { useUser } from '@clerk/nextjs';

export function UserRoleCard() {
  return (
    <Card className="w-[175px] h-24">
      <CardHeader className="grid grid-cols-2 items-center">
        <div>
          <UserButton afterSignOutUrl="/" />
        </div>
        <div className="text-left">
          <CardTitle className="text-base">Galle</CardTitle>
          <CardDescription className="text-sm">Manager</CardDescription>
        </div>
      </CardHeader>
    </Card>
  );
}
