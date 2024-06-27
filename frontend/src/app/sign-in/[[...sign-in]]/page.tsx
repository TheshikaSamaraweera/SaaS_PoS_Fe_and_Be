import { SignIn } from "@clerk/nextjs";

import React from "react";



const signInPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="mb-4">
        <SignIn />
      </div>
      <a href="/" className="border border-gray-700 bg-gray-700 hover:bg-gray-800 text-white hover:text-white py-3 px-6 rounded-lg shadow-md mt-6 transition duration-300 ease-in-out">
        Go to Home
      </a>
    </div>
  );
};

export default signInPage;
