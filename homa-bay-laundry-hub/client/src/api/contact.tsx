import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export const sendContactMessage = async (messageData: { name: string; email: string; message: string }) => {
  try {
    const response = await axios.post(`${API_URL}/api/contact`, messageData);
    return response.data; // Assuming the backend returns { success: boolean, message: string }
  } catch (error) {
    console.error('Send contact message error:', error);
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.error || 'Failed to send contact message');
    }
    throw new Error('Failed to send contact message');
  }
};