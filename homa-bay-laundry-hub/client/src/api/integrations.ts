import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const sendNotification = async (to: string, message: string, channel: 'sms' | 'whatsapp' = 'sms') => {
  const response = await axios.post(
    `${API_URL}/api/integrations/notify`,
    { to, message, channel },
    { headers: getAuthHeaders() }
  );
  return response.data;
};

export const getNearbyProviders = async (lat: number, lng: number, radius_km = 5) => {
  const response = await axios.post(`${API_URL}/api/integrations/nearby-providers`, { lat, lng, radius_km });
  return response.data;
}; 