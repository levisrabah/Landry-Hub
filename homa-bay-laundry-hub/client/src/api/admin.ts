import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const getAdminDashboard = async () => {
  const response = await axios.get(`${API_URL}/api/admin/dashboard`, { headers: getAuthHeaders() });
  return response.data;
};

export const getAdminAnalytics = async () => {
  const response = await axios.get(`${API_URL}/api/admin/analytics`, { headers: getAuthHeaders() });
  return response.data;
};

export const getProviders = async () => {
  const response = await axios.get(`${API_URL}/api/admin/providers`, { headers: getAuthHeaders() });
  return response.data;
};

export const approveProvider = async (providerId: number) => {
  const response = await axios.post(`${API_URL}/api/admin/providers/${providerId}/approve`, {}, { headers: getAuthHeaders() });
  return response.data;
};

export const rejectProvider = async (providerId: number) => {
  const response = await axios.post(`${API_URL}/api/admin/providers/${providerId}/reject`, {}, { headers: getAuthHeaders() });
  return response.data;
};

export const getUsers = async () => {
  const response = await axios.get(`${API_URL}/api/admin/users`, { headers: getAuthHeaders() });
  return response.data;
};

export const getBookings = async () => {
  const response = await axios.get(`${API_URL}/api/admin/bookings`, { headers: getAuthHeaders() });
  return response.data;
}; 