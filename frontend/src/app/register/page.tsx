"use client";

import { useState, FormEvent, MouseEvent } from "react";
import { useSignUp } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

const RegisterPage = () => {
  const { isLoaded, signUp, setActive } = useSignUp();
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [pendingVerification, setPendingVerification] = useState(false);
  const [code, setCode] = useState("");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  // Form Submit
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!isLoaded) {
      return;
    }

    try {
      await signUp.create({
        firstName: firstName,
        lastName: lastName,
        username: userName,
        emailAddress: email,
        password,
      });

      // send the email.
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

      // change the UI to our pending section.
      setPendingVerification(true);
    } catch (err) {
      console.error(err);
      setError("Failed to create account. Please try again.");
    }
  };

  // Verify User Email Code
  const onPressVerify = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!isLoaded) {
      return;
    }

    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code,
      });
      if (completeSignUp.status !== "complete") {
        console.log(JSON.stringify(completeSignUp, null, 2));
      }
      if (completeSignUp.status === "complete") {
        await setActive({ session: completeSignUp.createdSessionId });

        // Send user details to the backend
        await fetch("http://localhost:3000/users", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            firstName,
            lastName,
            userName,
            email,
          }),
        });

        router.back();
      }
    } catch (err) {
      console.error(JSON.stringify(err, null, 2));
      setError("Failed to verify email. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-center">Register</h1>
        {error && <p className="text-red-500 text-center">{error}</p>}
        {!pendingVerification && (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="firstName"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Company Name
              </label>
              <input
                type="text"
                name="firstName"
                id="firstName"
                onChange={(e) => setFirstName(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                required={true}
              />
            </div>
            <div>
              <label
                htmlFor="lastName"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Branch Name
              </label>
              <input
                type="text"
                name="lastName"
                id="lastName"
                onChange={(e) => setLastName(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                required={true}
              />
            </div>
            <div>
              <label
                htmlFor="username"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                User Role
              </label>
              <input
                type="text"
                name="username"
                id="username"
                onChange={(e) => setUserName(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                required={true}
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Email Address
              </label>
              <input
                type="email"
                name="email"
                id="email"
                onChange={(e) => setEmail(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                placeholder="name@company.com"
                required={true}
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                onChange={(e) => setPassword(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                required={true}
              />
            </div>
            <button
              type="submit"
              className="w-full text-white bg-[#393939] hover:bg-gray-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >
              Create an account
            </button>
          </form>
        )}
        {pendingVerification && (
          <div>
            <form className="space-y-6">
              <input
                value={code}
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5"
                placeholder="Enter Verification Code..."
                onChange={(e) => setCode(e.target.value)}
              />
              <button
                type="submit"
                onClick={onPressVerify}
                className="w-full text-white bg-[#393939] hover:bg-gray-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              >
                Verify Email
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default RegisterPage;
