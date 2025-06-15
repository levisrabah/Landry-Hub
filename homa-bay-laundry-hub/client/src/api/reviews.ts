import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export interface Review {
  id: number;
  booking_id: number;
  customer_id: number;
  provider_id: number;
  rating: number;
  comment?: string;
  created_at?: string;
}

export const getProviderReviews = async (providerId: number): Promise<Review[]> => {
  const response = await axios.get(`${API_URL}/api/reviews/${providerId}`);
  return response.data;
};

export const createReview = async (review: { booking_id: number; rating: number; comment?: string }): Promise<any> => {
  const token = localStorage.getItem('token');
  const response = await axios.post(`${API_URL}/api/reviews/`, review, {
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });
  return response.data;
}; 