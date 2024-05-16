"use client";
import { ChangeEvent, useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "next/navigation";

type Cashier = {
  cashierId: string;
  cashierFirstName: string;
  cashierLastName: string;
  cashierEmail: string;
  cashierAddress: string;
  cashierPhone: string;
  cashierDoB: string;
  cashierGender: string;
  cashierBranch: string;
};

export default function CashierPage() {
  const [cashier, setCashier] = useState<Cashier | null>(null);
  const [cashierId, setCashierId] = useState<string | null>(null);

  useEffect(() => {
    setCashierId(window.localStorage.getItem("cashierId"));
  }, []);

  useEffect(() => {
    const fetchCashier = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/cashier/${cashierId}`
        );
        setCashier(response.data);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    if (cashierId) {
      fetchCashier();
    }
  }, [cashierId]);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (cashier) {
      setCashier({
        ...cashier,
        [event.target.name]: event.target.value,
      });
    }
  };

  const handleSave = async () => {
    try {
      await axios.put(`http://localhost:3000/cashier/${cashierId}`, cashier);
      alert('Changes saved successfully');
    } catch (error) {
      console.error('Error saving changes:', error);
    }
  };



  return (
    <div>
      <input type="text" value={cashierId || ''} placeholder="Enter User ID" readOnly/>
      {cashier && (
        <div>
          <h2>User Details:</h2>

          <input name="cashierFirstName" value={cashier.cashierFirstName} onChange={handleInputChange} />
          <input name="cashierLastName" value={cashier.cashierLastName} onChange={handleInputChange} />
          <input name="cashierEmail" value={cashier.cashierEmail} onChange={handleInputChange} />
          <input name="cashierAddress" value={cashier.cashierAddress} onChange={handleInputChange} />
          <input name="cashierPhone" value={cashier.cashierPhone} onChange={handleInputChange} />
          <input name="cashierDoB" value={cashier.cashierDoB} onChange={handleInputChange} />
          <input name="cashierGender" value={cashier.cashierGender} onChange={handleInputChange} />
          <input name="cashierBranch" value={cashier.cashierBranch} onChange={handleInputChange} />

          <button onClick={handleSave}>Save</button>
          <button onClick={() => setCashier(null)}>Clear</button>
        </div>
      )}
    </div>
  );
}
