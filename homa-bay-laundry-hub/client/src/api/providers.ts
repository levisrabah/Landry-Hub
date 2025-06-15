import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export interface Provider {
  id: number;
  user_id: number;
  name: string;
  location: string;
  profile_photo?: string;
  average_rating?: number;
  is_verified?: boolean;
}

// List providers with optional filters
export const getProviders = async (filters: { location?: string; min_rating?: number; page?: number; per_page?: number } = {}): Promise<{ providers: Provider[]; meta: any }> => {
  const params = new URLSearchParams();
  if (filters.location) params.append('location', filters.location);
  if (filters.min_rating) params.append('min_rating', filters.min_rating.toString());
  if (filters.page) params.append('page', filters.page.toString());
  if (filters.per_page) params.append('per_page', filters.per_page.toString());
  const response = await axios.get(`${API_URL}/api/providers/`, { params });
  return response.data;
};

// Get provider details (if needed)
export const getProviderById = async (id: number): Promise<Provider> => {
  const response = await axios.get(`${API_URL}/api/providers/${id}`);
  return response.data;
}; 