"use client";
import React, { useEffect, useState } from 'react';
import { getBillsByDate, getBillsByCashierId, getBillsByBranchId } from '../sample/bills';

interface Item {
  _id: string;
  itemName: string;
  unitPrice: number;
  count: number;
  totalPrice: number;
}

interface Bill {
  _id: string;
  billId: string;
  totalAmount: number;
  billDate: string;
  billTime: string;
  cashierId: string;
  branchId: string;
  items: Item[];
}

const Bills = () => {
  // const [bills, setBills] = useState([]);
  const [filter, setFilter] = useState('date');
  const [value, setValue] = useState('');
  const [bills, setBills] = useState<Bill[]>([]);

  

  useEffect(() => {
    const fetchBills = async () => {
      try {
        let data;
        switch (filter) {
          case 'date':
            data = await getBillsByDate(value);
            break;
          case 'cashier':
            data = await getBillsByCashierId(value);
            break;
          case 'branch':
            data = await getBillsByBranchId(value);
            break;
          default:
            data = [];
        }
        setBills(data);
      } catch (error) {
        console.error('Error fetching bills:', error);
      }
    };

    if (value) fetchBills();
  }, [filter, value]);

  return (
    <div>
      <h1>Bills</h1>
      <div>
        <select onChange={(e) => setFilter(e.target.value)} value={filter}>
          <option value="date">Date</option>
          <option value="cashier">Cashier ID</option>
          <option value="branch">Branch ID</option>
        </select>
        <input
          type="text"
          placeholder={`Enter ${filter}`}
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </div>
      <ul>
        {bills.map((bill) => (
          <li key={bill._id}>
            <p>Bill ID: {bill.billId}</p>
            <p>Total Amount: {bill.totalAmount}</p>
            <p>Date: {bill.billDate}</p>
            <p>Time: {bill.billTime}</p>
            <p>Cashier ID: {bill.cashierId}</p>
            <p>Branch ID: {bill.branchId}</p>
            <ul>
              {bill.items.map((item: Item) => (
                <li key={item._id}>
                  <p>Item Name: {item.itemName}</p>
                  <p>Unit Price: {item.unitPrice}</p>
                  <p>Count: {item.count}</p>
                  <p>Total Price: {item.totalPrice}</p>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Bills;
