import axios from 'axios';

const API_URL = 'http://localhost:5000/api'; // Change as necessary

export const loginUser = async (credentials) => {
  return await axios.post(`${API_URL}/login`, credentials);
};

export const registerUser = async (userData) => {
  return await axios.post(`${API_URL}/register`, userData);
};

// Add more API functions as needed