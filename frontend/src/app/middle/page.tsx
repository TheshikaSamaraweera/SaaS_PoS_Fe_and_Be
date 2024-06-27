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
      }else if (role === "Super Admin") {
        router.push("/super-admin/dashboard");
      }
    }
  }, [isSignedIn, user, router]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
    <div className="text-center">
      <h1 className="text-3xl font-bold mb-4">Logging In...</h1>
      <p className="text-gray-700">You are being logged In.</p>
    </div>
  </div>
  );
};

export default Middle;
