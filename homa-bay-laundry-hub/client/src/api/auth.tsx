import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

export const loginUser = async (email: string, password: string) => {
  const response = await API.post('/auth/login', { email, password });
  return response.data;
};

export const getCurrentUser = async () => {
  const token = localStorage.getItem('token');
  if (!token) throw new Error('No token found');

  const response = await API.get('/me', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data; // returns user info
};

export const logoutUser = async () => {
  const token = localStorage.getItem('token');
  if (!token) return;

  await API.post('/logout', {}, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
