"use client";

import React, { useEffect } from 'react';
import { useAuth } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';

const AutoLogout: React.FC = () => {
  const { signOut } = useAuth();
  const router = useRouter();

  useEffect(() => {
    const handleLogout = async () => {
      await signOut();
      router.push('/register');
    };

    handleLogout();
  }, [signOut, router]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4">Logging Out...</h1>
        <p className="text-gray-700">You are being logged out.</p>
      </div>
    </div>
  );
};

export default AutoLogout;
