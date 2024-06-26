// src/app/payment/page.tsx
'use client';

import React, { useState, useEffect } from 'react';
import md5 from 'crypto-js/md5';
import axios from 'axios';

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
    <div style={styles.container}>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input type="hidden" name="merchant_id" value={formData.merchant_id} />
        <input type="hidden" name="return_url" value={formData.return_url} />
        <input type="hidden" name="cancel_url" value={formData.cancel_url} />
        <input type="hidden" name="notify_url" value={formData.notify_url} />
        <input type="hidden" name="currency" value={formData.currency} />
        <input type="hidden" name="order_id" value={formData.order_id} />
        <input type="hidden" name="hash" value={formData.hash} />

        <h2 style={styles.header}>Payment Details</h2>

        <div style={styles.section}>
          <h3 style={styles.subheader}>Item Details</h3>
          <input type="text" name="items" value={formData.items} style={styles.input} readOnly />
          <label style={styles.label}>Duration</label>
          <select name="duration" value={formData.duration} onChange={handleChange} style={styles.input}>
            <option value="1 Month">1 Month</option>
            <option value="6 Months">6 Months</option>
            <option value="1 Year">1 Year</option>
          </select>
          <label style={styles.label}>Amount</label>
          <input type="text" name="amount" value={formData.amount} style={styles.input} readOnly />
        </div>

        <div style={styles.section}>
          <h3 style={styles.subheader}>Customer Details</h3>
          <input type="text" name="first_name" value={formData.first_name} onChange={handleChange} placeholder="First Name" style={styles.input} required />
          <input type="text" name="last_name" value={formData.last_name} onChange={handleChange} placeholder="Last Name" style={styles.input} required />
          <input type="text" name="company_name" value={formData.company_name} onChange={handleChange} placeholder="Company Name" style={styles.input} />
          <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" style={styles.input} required />
          <input type="text" name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone" style={styles.input} required />
          <input type="text" name="address" value={formData.address} onChange={handleChange} placeholder="Address" style={styles.input} required />
          <input type="text" name="city" value={formData.city} onChange={handleChange} placeholder="City" style={styles.input} required />
        </div>

        <input type="submit" value="Buy Now" style={styles.button} />
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
    marginBottom: '15px', // Adjusted margin for better spacing
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
