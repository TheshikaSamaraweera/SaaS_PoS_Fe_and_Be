'use client';

import React, { useState, useEffect } from 'react';
import md5 from 'crypto-js/md5';
import axios from 'axios';
import { FaCreditCard } from 'react-icons/fa';

const Payment: React.FC = () => {
  let merchantSecret = 'MTkzMDgyNDE2NDIwNzQyNTk4MDczNTExODk4NTI4Mzk5NjYzNjk4Mw==';
  let merchantId = '1227456';
  let orderId = '12345';
  let hashedSecret = md5(merchantSecret).toString().toUpperCase();
  let amount = '1000.00';
  let amountFormatted = parseFloat(amount)
    .toLocaleString('en-us', { minimumFractionDigits: 2 })
    .replaceAll(',', '');
  let currency = 'LKR';
  let hash = md5(merchantId + orderId + amountFormatted + currency + hashedSecret).toString().toUpperCase();

  const [formData, setFormData] = useState({
    merchant_id: '1227456',
    return_url: 'http://localhost:4000/register',
    cancel_url: 'http://localhost:4203',
    notify_url: 'http://localhost:4203',
    order_id: '12345',
    items: 'Pos Aplication',
    currency: 'LKR',
    recurrence: '1 Month',
    duration: 'Forever',
    amount: '1000.00',
    first_name: '',
    last_name: '',
    company_name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    country: 'Sri Lanka',
    hash: hash,
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
      // Send form data to your backend
      const response = await axios.post('http://localhost:3000/payment', formData);
      console.log('Payment request sent to backend:', response.data);

      // Redirect to PayHere checkout page
      const payHereForm = document.createElement('form');
      payHereForm.method = 'POST';
      payHereForm.action = 'https://sandbox.payhere.lk/pay/checkout';

      Object.keys(formData).forEach((key) => {
        const input = document.createElement('input');
        input.type = 'hidden';
        input.name = key;
        input.value = formData[key as keyof typeof formData];
        payHereForm.appendChild(input);
      });

      document.body.appendChild(payHereForm);
      payHereForm.submit();
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

const styles = {
  container: {
    maxWidth: '600px',
    margin: '50px auto',
    padding: '20px',
    backgroundColor: '#fff',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    borderRadius: '8px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  header: {
    textAlign: 'center',
    color: '#333',
  },
  section: {
    marginBottom: '20px',
  },
  subheader: {
    marginBottom: '10px',
    color: '#555',
  },
  label: {
    marginBottom: '5px',
    color: '#555',
  },
  input: {
    padding: '10px',
    marginBottom: '15px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    fontSize: '16px',
    width: '100%',
  },
  button: {
    padding: '10px',
    backgroundColor: '#28a745',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '16px',
  },
};

export default Payment;
