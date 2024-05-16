// "use client";

// import React, { useEffect, useState } from "react";
// import { useRouter } from "next/router";
// import PageTitle from "@/components/PageTitle";

// type Cashier = {
//   _id: string;
//   cashierId: string;
//   cashierFirstName: string;
//   cashierLastName: string;
//   cashierEmail: string;
//   cashierAddress: string;
//   cashierPhone: string;
//   cashierDoB: string;
//   cashierGender: string;
//   cashierBranch:  string;
// };

// export default function EditCashierPage() {
//   const router = useRouter();
//   const { id } = router.query;

//   const [cashier, setCashier] = useState<Cashier | null>(null);
//   const [cashierId, setCashierId] = useState("");
//   const [cashierFirstName, setCashierFirstName] = useState("");
//   const [cashierLastName, setCashierLastName] = useState("");
//   const [cashierEmail, setCashierEmail] = useState("");
//   const [cashierAddress, setCashierAddress] = useState("");
//   const [cashierPhone, setCashierPhone] = useState("");
//   const [cashierDoB, setCashierDoB] = useState("");
//   const [cashierGender, setCashierGender] = useState("");
//   const [cashierBranch, setCashierBranch] = useState("");

//   useEffect(() => {
//     if (id) {
//       fetch(`http://localhost:3000/cashier/${id}`)
//         .then((response) => response.json())
//         .then((data) => setCashier(data));
//     }
//   }, [id]);

//   useEffect(() => {
//     if (cashier) {
//       setCashierId(cashier.cashierId);
//       setCashierFirstName(cashier.cashierFirstName);
//       setCashierLastName(cashier.cashierLastName);
//       setCashierEmail(cashier.cashierEmail);
//       setCashierAddress(cashier.cashierAddress);
//       setCashierPhone(cashier.cashierPhone);
//       setCashierDoB(cashier.cashierDoB);
//       setCashierGender(cashier.cashierGender);
//       setCashierBranch(cashier.cashierBranch);
//     }
//   }, [cashier]);

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();

//     try {
//       const response = await fetch(`http://localhost:3000/cashier/${id}`, {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           cashierId,
//           cashierFirstName,
//           cashierLastName,
//           cashierEmail,
//           cashierAddress,
//           cashierPhone,
//           cashierDoB,
//           cashierGender,
//           cashierBranch,
//         }),
//       });

//       if (!response.ok) {
//         throw new Error("Network response was not ok");
//       }

//       router.push("/branch-manager/cashiers");
//     } catch (error) {
//       console.error("Error updating cashier:", error);
//     }
//   };

//   if (!cashier) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div className="flex flex-col gap-5 w-full">
//       <PageTitle title="Edit Cashier" />
//       <form onSubmit={handleSubmit}>
//         <div className="flex flex-col gap-2">
//           <label htmlFor="cashierId">Cashier ID</label>
//           <input
//             type="text"
//             id="cashierId"
//             value={cashierId}
//             onChange={(e) => setCashierId(e.target.value)}
//           />
//         </div>
//         <div className="flex flex-col gap-2">
//           <label htmlFor="cashierFirstName">First Name</label>
//           <input
//             type="text"
//             id="cashierFirstName"
//             value={cashierFirstName}
//             onChange={(e) => setCashierFirstName(e.target.value)}
//           />
//         </div>
//         <div className="flex flex-col gap-2">
//           <label htmlFor="cashierLastName">Last Name</label>
//           <input
//             type="text"
//             id="cashierLastName"
//             value={cashierLastName}
//             onChange={(e) => setCashierLastName(e.target.value)}
//           />
//         </div>
//         <div className="flex flex-col gap-2">
//           <label htmlFor="cashierEmail">E-mail</label>
//           <input
//             type="text"
//             id="cashierEmail"
//             value={cashierEmail}
//             onChange={(e) => setCashierEmail(e.target.value)}
//           />
//         </div>
//         <div className="flex flex-col gap-2">
//           <label htmlFor="cashierAddress">Address</label>
//           <input
//             type="text"
//             id="cashierAddress"
//             value={cashierAddress}
//             onChange={(e) => setCashierAddress(e.target.value)}
//           />
//         </div>
//         <div className="flex flex-col gap-2">
//           <label htmlFor="cashierPhone">Phone Number</label>
//           <input
//             type="text"
//             id="cashierPhone"
//             value={cashierPhone}
//             onChange={(e) => setCashierPhone(e.target.value)}
//           />
//         </div>
//         <div className="flex flex-col gap-2">
//           <label htmlFor="cashierDoB">Date of Birth</label>
//           <input
//             type="text"
//             id="cashierDoB"
//             value={cashierDoB}
//             onChange={(e) => setCashierDoB(e.target.value)}
//           />
//         </div>
//         <div className="flex flex-col gap-2">
//           <label htmlFor="cashierGender">Gender</label>
//           <input
//             type="text"
//             id="cashierGender"
//             value={cashierGender}
//             onChange={(e) => setCashierGender(e.target.value)}
//           />
//         </div>
//         <div className="flex flex-col gap-2">
//           <label htmlFor="cashierBranch">Branch</label>
//           <input
//             type="text"
//             id="cashierBranch"
//             value={cashierBranch}
//             onChange={(e) => setCashierBranch(e.target.value)}
//           />
//         </div>
//         <button
//           type="submit"
//           className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded"
//         >
//           Update Cashier
//         </button>
//       </form>
//     </div>
//   );
// }
