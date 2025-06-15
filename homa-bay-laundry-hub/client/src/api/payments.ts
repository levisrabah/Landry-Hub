import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const initiateMpesaPayment = async (bookingId: number) => {
  const response = await axios.post(
    `${API_URL}/api/payments/initiate`,
    { bookingId, method: 'mpesa' },
    { headers: getAuthHeaders() }
  );
  return response.data;
};

// Optionally, add a function to check payment status if your backend supports it 