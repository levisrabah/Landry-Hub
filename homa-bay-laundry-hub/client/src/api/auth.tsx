import axios from 'axios';

const API_PREFIX = '/api/auth';

export const loginUser = async (email: string, password: string) => {
  const response = await axios.post(`${API_PREFIX}/login`, { email, password });
  return response.data; // returns { access_token, user }
};

export const getCurrentUser = async () => {
  const token = localStorage.getItem('token');
  if (!token) throw new Error('No token found');

  const response = await axios.get(`${API_PREFIX}/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data; // returns user info
};

export const logoutUser = async () => {
  const token = localStorage.getItem('token');
  if (!token) return;

  await axios.post(`${API_PREFIX}/logout`, {}, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
