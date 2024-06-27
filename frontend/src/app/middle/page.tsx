"use client";

import React, { useEffect } from 'react';
import { useAuth, useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';

const Middle: React.FC = () => {
  const { isSignedIn } = useAuth();
  const { user } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (isSignedIn && user) {
      const role = user.firstName; // Assuming role is stored in firstName field
      if (role === "Manager") {
        router.push("/manager/dashboard");
      } else if (role === "Branch Manager") {
        router.push("/branch-manager/dashboard");
      } else if (role === "Cashier") {
        router.push("/cashier/dashboard");
      }
    }
  }, [isSignedIn, user, router]);

  return (
    <div>
      <h1>Loading....</h1>
     
    </div>
  );
};

export default Middle;
