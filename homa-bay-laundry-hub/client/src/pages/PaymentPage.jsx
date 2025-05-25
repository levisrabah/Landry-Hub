import React, { useState } from 'react';

const PaymentPage = () => {
  const [amount, setAmount] = useState('');
  const [confirmation, setConfirmation] = useState(null);

  const handlePayment = (e) => {
    e.preventDefault();
    // Simulate payment processing
    setConfirmation(`Payment of Ksh ${amount} successful!`);
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold">M-Pesa Payment</h2>
      <form onSubmit={handlePayment}>
        <input
          type="number"
          placeholder="Enter Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="border p-2 mb-4 w-full"
          required
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Pay</button>
      </form>
      {confirmation && <p className="text-green-500">{confirmation}</p>}
    </div>
  );
};

export default PaymentPage;