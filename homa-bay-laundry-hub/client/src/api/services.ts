import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export interface Service {
  id: number;
  provider_id: number;
  name: string;
  description?: string;
  price: number;
  created_at?: string;
}

const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const getServices = async (): Promise<Service[]> => {
  const response = await axios.get(`${API_URL}/api/services/`);
  return response.data;
};

export const getServiceById = async (id: number): Promise<Service> => {
  const response = await axios.get(`${API_URL}/api/services/${id}`);
  return response.data;
};

export const createService = async (service: Partial<Service>): Promise<any> => {
  const response = await axios.post(`${API_URL}/api/services/`, service, { headers: getAuthHeaders() });
  return response.data;
};

export const updateService = async (id: number, service: Partial<Service>): Promise<any> => {
  const response = await axios.put(`${API_URL}/api/services/${id}`, service, { headers: getAuthHeaders() });
  return response.data;
};

export const deleteService = async (id: number): Promise<any> => {
  const response = await axios.delete(`${API_URL}/api/services/${id}`, { headers: getAuthHeaders() });
  return response.data;
}; 