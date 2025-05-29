import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export const sendContactMessage = async (messageData: any) => {
  try {
    // For demo purposes, we'll just return success
    return { success: true, message: 'Message sent successfully' };
    
    // In a real application, this would call the API
    // const response = await axios.post(`${API_URL}/contact`, messageData);
    // return response.data;
  } catch (error) {
    console.error('Send contact message error:', error);
    throw error;
  }
};