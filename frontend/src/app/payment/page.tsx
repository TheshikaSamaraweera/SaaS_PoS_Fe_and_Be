/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-unused-vars */

"use client";
import { useState } from 'react';
import md5 from 'crypto-js/md5';
const Payment: React.FC = () => {
    

let merchantSecret  = 'MTQ3ODc3NzEwNTI5NDE3ODA4MDkyNjg3NTkwNzg3Mzk3MTYxMjky';
let merchantId      = '1225182';
let orderId         = '12345';
let amount          = "1000.00";
let hashedSecret    = md5(merchantSecret).toString().toUpperCase();
let amountFormated  = parseFloat( amount ).toLocaleString( 'en-us', { minimumFractionDigits : 2 } ).replaceAll(',', '');
let currency        = 'LKR';
console.log(amountFormated)
let hash            = md5(merchantId + orderId + amountFormated + currency + hashedSecret).toString().toUpperCase();

  const [formData, setFormData] = useState({
    merchant_id: '1225182', 
    return_url: 'http://localhost:4203',
    cancel_url: 'http://localhost:4203',
    notify_url: 'http://localhost:4203',
    order_id: '12345',
    items: 'Door bell wireless',
    currency: 'LKR',
    recurrence: '1 Month',
    duration: 'Forever',
    amount: '1000.00',
    first_name: 'Saman',
    last_name: 'Perera',
    email: 'samanp@gmail.com',
    phone: '0771234567',
    address: 'No.1, Galle Road',
    city: 'Colombo',
    country: 'Sri Lanka',
    hash: hash, 
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
        const response = await fetch('https://sandbox.payhere.lk/pay/checkout', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });
  
        
        console.log(response);
      } catch (error) {
        console.error('Error submitting form:', error);
      }

   
    console.log('Form data submitted:', formData);
  };

  return (
   
    <div>
    
      
        <form method="post" action="https://sandbox.payhere.lk/pay/checkout">
          <input type="hidden" name="merchant_id" value={formData.merchant_id} />
          <input type="hidden" name="return_url" value={formData.return_url} />
          <input type="hidden" name="cancel_url" value={formData.cancel_url} />
          <input type="hidden" name="notify_url" value={formData.notify_url} />
          <br />
          <br />
          Item Details
          <br />
          <input type="text" name="order_id" value={formData.order_id} />
          <input type="text" name="items" value={formData.items} />
          <br />
          <input type="text" name="currency" value={formData.currency} />
          <input type="text" name="recurrence" value={formData.recurrence} />
          <input type="text" name="duration" value={formData.duration} />
          <input type="text" name="amount" value={formData.amount} />
          <br />
          <br />
          Customer Details
          <br />
          <input type="text" name="first_name" value={formData.first_name} />
          <input type="text" name="last_name" value={formData.last_name} />
          <br />
          <input type="text" name="email" value={formData.email} />
          <input type="text" name="phone" value={formData.phone} />
          <br />
          <input type="text" name="address" value={formData.address} />
          <input type="text" name="city" value={formData.city} />
          <input type="hidden" name="country" value={formData.country} />
          <input type="hidden" name="hash" value={formData.hash} />
          <input type="submit" value="Buy Now" />
        </form>
    </div>
  );
};

export default Payment;
