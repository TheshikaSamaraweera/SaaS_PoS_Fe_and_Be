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
      <h1>Login</h1>
      <a
        href="/sign-in"
        className="border border-blue-600 bg-blue-600 hover:bg-blue-700 text-white hover:text-white py-3 px-6 rounded-lg shadow-md mt-6 transition duration-300 ease-in-out"
      >
        Buy now
      </a>
    </div>
  );
};

export default Middle;
