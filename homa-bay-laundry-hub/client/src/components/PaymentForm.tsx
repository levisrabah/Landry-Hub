import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const PaymentForm = ({ bookingId }) => {
  const [paymentMethod, setPaymentMethod] = useState('mpesa');
  const [isLoading, setIsLoading] = useState(false);

  const handlePayment = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post('/api/payments/initiate', {
        bookingId,
        method: paymentMethod,
      });
      toast.success('Payment initiated successfully!');
    } catch (error) {
      toast.error(error.response?.data?.error || 'Failed to initiate payment.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="text-xl font-bold mb-4">Make a Payment</h2>
      <select
        value={paymentMethod}
        onChange={(e) => setPaymentMethod(e.target.value)}
        className="w-full mb-4 p-2 border rounded"
      >
        <option value="mpesa">M-Pesa</option>
        <option value="card">Card</option>
      </select>
      <button
        onClick={handlePayment}
        disabled={isLoading}
        className={`w-full py-2 px-4 bg-blue-600 text-white rounded ${
          isLoading ? 'opacity-70 cursor-not-allowed' : ''
        }`}
      >
        {isLoading ? 'Processing...' : 'Pay Now'}
      </button>
    </div>
  );
};

export default PaymentForm;