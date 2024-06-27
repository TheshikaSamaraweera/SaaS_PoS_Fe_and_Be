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
import { useState, useEffect } from "react";
import { UserButton } from "@clerk/nextjs";
import { useUser } from "@clerk/nextjs";

export function UserRoleCard() {
  const [userDetails, setUserDetails] = useState<{
    firstName: string;
    lastName: string;
    userName: string;
  } | null>(null);
  const { user } = useUser();

  useEffect(() => {
    if (user) {
      const { firstName, lastName, username } = user;
      setUserDetails({
        firstName: firstName || "",
        lastName: lastName || "",
        userName: username || "",
      });
      console.log("User Details:", {
        firstName: firstName || "",
        lastName: lastName || "",
        userName: username || "",
      });
    }
  }, [user]);

  return (
    <Card className="w-full sm:w-[140px] h-24">
      <CardHeader className="grid grid-cols-1 sm:grid-cols-2 items-center">
        <div>
          <UserButton afterSignOutUrl="/" />
        </div>
        <div className="flex flex-col text-left">
          <CardTitle className="text-base">{userDetails?.lastName}</CardTitle>

          <CardDescription className="text-sm">
            {userDetails?.firstName}
          </CardDescription>
        </div>
      </CardHeader>
    </Card>
  );
}
