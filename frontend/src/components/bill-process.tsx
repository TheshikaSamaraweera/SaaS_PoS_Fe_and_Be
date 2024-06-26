import React from "react";
import "../../styles/pos.css";
import { useUser } from "@clerk/nextjs";
import { useState, useEffect } from "react";

interface BillItem {
  label: string;
  amount: number;
  count: number;
}

interface BillDetails {
  billId: string;
  cashierId: string;
  branchId: string;
  items: BillItem[];
  totalAmount: number;
}

interface BillProcessProps {
  isVisible: boolean;
  onClose: () => void;
  billDetails: BillDetails;
  resetPos: () => void;
}

const BillProcess: React.FC<BillProcessProps> = ({
  isVisible,
  onClose,
  billDetails,
  resetPos,
}) => {
  if (!isVisible) return null;

  const handlePrint = async () => {
    try {
      const now = new Date();
      const month = String(now.getMonth() + 1).padStart(2, "0");
      const day = String(now.getDate()).padStart(2, "0");
      const year = now.getFullYear();

      const localDate = month + day + year;
      const localTime = now.toLocaleTimeString("en-US", {
        timeZone: "Asia/Kolkata",
        hour12: false,
      });

      const response = await fetch("http://localhost:3000/bill", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          billId: billDetails.billId,
          cashierId: billDetails.cashierId,
          branchId: billDetails.branchId,
          items: billDetails.items.map((item) => ({
            itemName: item.label,
            unitPrice: item.amount,
            count: item.count,
            totalPrice: item.amount * item.count,
          })),
          totalAmount: billDetails.totalAmount.toFixed(2),
          billDate: localDate,
          billTime: localTime,
        }),
      });

      if (!response.ok) {
        throw new Error("HTTP error " + response.status);
      }

      const newWindow = window.open("", "_blank", "width=600,height=600");

      if (newWindow) {
        newWindow.document.write(`
          <html>
            <head>
              <title>Bill Details</title>
              <style>
                body {
                  font-family: Arial, sans-serif;
                  padding: 20px;
                }
                h1, h2 {
                  text-align: center;
                }
                ul {
                  list-style-type: none;
                  padding: 0;
                }
                li {
                  margin: 5px 0;
                }
              </style>
            </head>
            <body>
              <h1>Selected Items</h1>
              <ul>
                ${billDetails.items
                  .map(
                    (item) => `
                  <li>
                    ${item.label}: Rs. ${item.amount} (Quantity: ${item.count})
                  </li>
                `
                  )
                  .join("")}
              </ul>
              <h2>Total Amount: Rs. ${billDetails.totalAmount.toFixed(2)}</h2>
            </body>
          </html>
        `);
        newWindow.document.close();
        newWindow.print();
        setTimeout(() => {
          newWindow.close();
          onClose();
          resetPos();
        }, 5000);
      }
    } catch (error) {
      console.error("Error saving bill:", error);
    }
  };

  const handleClose = () => {
    onClose();
  };

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
    <div className="modal-overlay">
      <div className="modal-content">
        <h2 className="font-bold">Invoice</h2>
        <p>
          <strong>Bill ID:</strong> {billDetails.billId}
        </p>
        <p>
          <strong>Cashier ID:</strong> {userDetails?.userName}
        </p>
        <p>
          <strong>Branch ID:</strong> {userDetails?.lastName}
        </p>
        <table className="bill-table">
          <thead>
            <tr>
              <th>Item</th>
              <th>Quantity</th>
              <th>Unit Price</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {billDetails.items.map((item) => (
              <tr key={item.label}>
                <td>{item.label}</td>
                <td>{item.count}</td>
                <td>{item.amount}</td>
                <td>{item.amount * item.count}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <h3>Total Amount: Rs. {billDetails.totalAmount.toFixed(2)}</h3>
        <div>
          <button onClick={handlePrint} className="print-button">
            Pay
          </button>
          <button onClick={handleClose} className="secondary-close-button">
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default BillProcess;
