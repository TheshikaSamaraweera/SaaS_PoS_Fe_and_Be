// "use client";

// import { useState, FormEvent, MouseEvent } from "react";
// import { useSignIn } from "@clerk/nextjs";
// import { useRouter } from "next/navigation";
// import RedirectAfterSignIn from "../../components/redirectAfterSignin";

// const SignInPage = () => {
//   const { isLoaded, signIn, setActive } = useSignIn();
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [pendingVerification, setPendingVerification] = useState(false);
//   const [code, setCode] = useState("");
//   const [error, setError] = useState<string | null>(null);
//   const [isSignedIn, setIsSignedIn] = useState(false);
//   const router = useRouter();

//   // Handle form submission
//   const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
//     e.preventDefault();

//     if (!isLoaded) {
//       return;
//     }

//     try {
//       const signInAttempt = await signIn.create({
//         identifier: email,
//         password,
//       });

//       if (signInAttempt.status === "needs_first_factor") {
//         // Prepare for the first factor verification
//         await signInAttempt.prepareFirstFactor();
//         setPendingVerification(true);
//       } else if (signInAttempt.status === "complete") {
//         // Set the active session and redirect the user
//         await setActive({ session: signInAttempt.createdSessionId });
//         setIsSignedIn(true); // Replace with your redirection logic
//       }
//     } catch (err) {
//       console.error(err);
//       setError("Failed to sign in. Please check your credentials.");
//     }
//   };

//   // Handle verification code submission
//   const onPressVerify = async (e: MouseEvent<HTMLButtonElement>) => {
//     e.preventDefault();
//     if (!isLoaded) {
//       return;
//     }

//     try {
//       const completeSignIn = await signIn.attemptFirstFactor({
//         strategy: "email_code",
//         code,
//       });

//       if (completeSignIn.status === "complete") {
//         await setActive({ session: completeSignIn.createdSessionId });
//         setIsSignedIn(true);
//       }
//     } catch (err) {
//       console.error(JSON.stringify(err, null, 2));
//       setError("Failed to verify code. Please try again.");
//     }
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-100">
//       {isSignedIn ? (
//         <RedirectAfterSignIn />
//       ) : (
//         <div className="flex items-center justify-center min-h-screen bg-gray-100">
//           <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-lg">
//             <h1 className="text-2xl font-bold text-center">Sign In</h1>
//             {error && <p className="text-red-500 text-center">{error}</p>}
//             {!pendingVerification && (
//               <form onSubmit={handleSubmit} className="space-y-6">
//                 <div>
//                   <label
//                     htmlFor="email"
//                     className="block mb-2 text-sm font-medium text-gray-900"
//                   >
//                     Email Address
//                   </label>
//                   <input
//                     type="email"
//                     name="email"
//                     id="email"
//                     onChange={(e) => setEmail(e.target.value)}
//                     className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
//                     placeholder="name@company.com"
//                     required
//                   />
//                 </div>
//                 <div>
//                   <label
//                     htmlFor="password"
//                     className="block mb-2 text-sm font-medium text-gray-900"
//                   >
//                     Password
//                   </label>
//                   <input
//                     type="password"
//                     name="password"
//                     id="password"
//                     onChange={(e) => setPassword(e.target.value)}
//                     className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
//                     required
//                   />
//                 </div>
//                 <button
//                   type="submit"
//                   className="w-full text-white bg-[#393939] hover:bg-gray-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
//                 >
//                   Sign In
//                 </button>
//               </form>
//             )}
//             {pendingVerification && (
//               <div>
//                 <form className="space-y-6">
//                   <input
//                     value={code}
//                     className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5"
//                     placeholder="Enter Verification Code..."
//                     onChange={(e) => setCode(e.target.value)}
//                   />
//                   <button
//                     type="submit"
//                     onClick={onPressVerify}
//                     className="w-full text-white bg-[#393939] hover:bg-gray-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
//                   >
//                     Verify Code
//                   </button>
//                 </form>
//               </div>
//             )}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default SignInPage;
