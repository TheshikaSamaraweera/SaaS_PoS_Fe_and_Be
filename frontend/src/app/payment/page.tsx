// src/app/payment/page.tsx
'use client';

import React, { useState, useEffect } from 'react';
import md5 from 'crypto-js/md5';
import axios from 'axios';
import { FaCreditCard } from 'react-icons/fa';

const Payment: React.FC = () => {
  let merchantSecret = 'MTQ3ODc3NzEwNTI5NDE3ODA4MDkyNjg3NTkwNzg3Mzk3MTYxMjky';
  let merchantId = '1225182';
  let orderId = '12345';
  let hashedSecret = md5(merchantSecret).toString().toUpperCase();
  let currency = 'LKR';

  const [formData, setFormData] = useState({
    merchant_id: merchantId,
    return_url: 'http://localhost:4203',
    cancel_url: 'http://localhost:4203',
    notify_url: 'http://localhost:4203',
    order_id: orderId,
    items: 'Pos Application',
    currency: currency,
    recurrence: '1 Month',
    duration: '1 Month',
    amount: '1000.00',
    first_name: '',
    last_name: '',
    company_name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    country: 'Sri Lanka',
    hash: '',
  });

  useEffect(() => {
    const amountFormatted = parseFloat(formData.amount)
      .toLocaleString('en-us', { minimumFractionDigits: 2 })
      .replaceAll(',', '');
    const hash = md5(merchantId + orderId + amountFormatted + currency + hashedSecret)
      .toString()
      .toUpperCase();
    setFormData((prevData) => ({
      ...prevData,
      hash: hash,
    }));
  }, [formData.amount]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    let amount = formData.amount;
    if (name === 'duration') {
      switch (value) {
        case '1 Month':
          amount = '1000.00';
          break;
        case '6 Months':
          amount = '5000.00';
          break;
        case '1 Year':
          amount = '9000.00';
          break;
        default:
          amount = '1000.00';
      }
    }

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
      amount: amount,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/payment', formData);
      console.log('Payment successful:', response.data);
    } catch (error) {
      console.error('Payment failed:', error);
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-12 p-6 bg-gray-100 shadow-md rounded-lg">
      <div className="flex items-center justify-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-800 mr-2">Pay for Your App</h2>
        <FaCreditCard className="text-xl text-gray-800" />
      </div>
      <form onSubmit={handleSubmit} className="flex flex-col space-y-6">
        <input type="hidden" name="merchant_id" value={formData.merchant_id} />
        <input type="hidden" name="return_url" value={formData.return_url} />
        <input type="hidden" name="cancel_url" value={formData.cancel_url} />
        <input type="hidden" name="notify_url" value={formData.notify_url} />
        <input type="hidden" name="currency" value={formData.currency} />
        <input type="hidden" name="order_id" value={formData.order_id} />
        <input type="hidden" name="hash" value={formData.hash} />

        <div>
          <h3 className="text-lg font-medium text-gray-700 mb-4">Item Details</h3>
          <input
            type="text"
            name="items"
            value={formData.items}
            className="w-full p-2.5 border border-gray-300 rounded-md text-gray-900 bg-gray-50"
            readOnly
          />
          <label className="block mt-4 text-sm font-medium text-gray-700">Duration</label>
          <select
            name="duration"
            value={formData.duration}
            onChange={handleChange}
            className="w-full p-2.5 mt-1 border border-gray-300 rounded-md text-gray-900 bg-gray-50"
          >
            <option value="1 Month">1 Month</option>
            <option value="6 Months">6 Months</option>
            <option value="1 Year">1 Year</option>
          </select>
          <label className="block mt-4 text-sm font-medium text-gray-700">Amount</label>
          <input
            type="text"
            name="amount"
            value={formData.amount}
            className="w-full p-2.5 border border-gray-300 rounded-md text-gray-900 bg-gray-50"
            readOnly
          />
        </div>

        <div>
          <h3 className="text-lg font-medium text-gray-700 mb-4">Customer Details</h3>
          <input
            type="text"
            name="first_name"
            value={formData.first_name}
            onChange={handleChange}
            placeholder="First Name"
            className="w-full p-2.5 border border-gray-300 rounded-md text-gray-900 bg-gray-50 mb-4"
            required
          />
          <input
            type="text"
            name="last_name"
            value={formData.last_name}
            onChange={handleChange}
            placeholder="Last Name"
            className="w-full p-2.5 border border-gray-300 rounded-md text-gray-900 bg-gray-50 mb-4"
            required
          />
          <input
            type="text"
            name="company_name"
            value={formData.company_name}
            onChange={handleChange}
            placeholder="Company Name"
            className="w-full p-2.5 border border-gray-300 rounded-md text-gray-900 bg-gray-50 mb-4"
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            className="w-full p-2.5 border border-gray-300 rounded-md text-gray-900 bg-gray-50 mb-4"
            required
          />
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Phone"
            className="w-full p-2.5 border border-gray-300 rounded-md text-gray-900 bg-gray-50 mb-4"
            required
          />
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Address"
            className="w-full p-2.5 border border-gray-300 rounded-md text-gray-900 bg-gray-50 mb-4"
            required
          />
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
            placeholder="City"
            className="w-full p-2.5 border border-gray-300 rounded-md text-gray-900 bg-gray-50 mb-4"
            required
          />
        </div>

        <button type="submit" className="w-full py-2.5 bg-blue-600 text-white rounded-md shadow-md">
          Buy Now
        </button>
      </form>
    </div>
  );
};

export default Payment;
