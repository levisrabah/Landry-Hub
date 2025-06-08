import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

// Define the BookingData interface according to your backend requirements
export interface BookingData {
  id?: string; // Optional for creating a new booking
  customerName: string;
  serviceType: string;
  pickupDate: string;
  deliveryDate?: string;
  status?: string;
  paymentMethod?: string;
  createdAt?: string;
  updatedAt?: string;
}

// Define the BookingStatus interface for real-time updates
export interface BookingStatus {
  id: string;
  status: string;
}

// Configure axios with common headers
axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Fetch all bookings
export const getBookings = async (): Promise<BookingData[]> => {
  try {
    const response = await axios.get(`${API_URL}/api/bookings`);
    return response.data.data; // Assuming backend returns { success, data, error }
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error('Get bookings error:', error.response?.data?.error || error.message);
      throw new Error(error.response?.data?.error || 'Failed to fetch bookings');
    }
    throw new Error('An unknown error occurred while fetching bookings');
  }
};

// Fetch a single booking by ID
export const getBookingById = async (id: string): Promise<BookingData> => {
  try {
    const response = await axios.get(`${API_URL}/api/bookings/${id}`);
    return response.data.data; // Assuming backend returns { success, data, error }
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error('Get booking by ID error:', error.response?.data?.error || error.message);
      throw new Error(error.response?.data?.error || 'Failed to fetch booking by ID');
    }
    throw new Error('An unknown error occurred while fetching the booking');
  }
};

// Create a new booking
export const createBooking = async (bookingData: BookingData): Promise<BookingData> => {
  try {
    const response = await axios.post(`${API_URL}/api/bookings`, bookingData);
    return response.data.data; // Assuming backend returns { success, data, error }
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error('Create booking error:', error.response?.data?.error || error.message);
      throw new Error(error.response?.data?.error || 'Failed to create booking');
    }
    throw new Error('An unknown error occurred while creating the booking');
  }
};

// Update the status of a booking
export const updateBookingStatus = async (id: string, status: string): Promise<BookingData> => {
  try {
    const response = await axios.patch(`${API_URL}/api/bookings/${id}`, { status });
    return response.data.data; // Assuming backend returns { success, data, error }
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error('Update booking status error:', error.response?.data?.error || error.message);
      throw new Error(error.response?.data?.error || 'Failed to update booking status');
    }
    throw new Error('An unknown error occurred while updating the booking status');
  }
};

// Delete a booking
export const deleteBooking = async (id: string): Promise<{ message: string }> => {
  try {
    const response = await axios.delete(`${API_URL}/api/bookings/${id}`);
    return response.data.data; // Assuming backend returns { success, data, error }
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error('Delete booking error:', error.response?.data?.error || error.message);
      throw new Error(error.response?.data?.error || 'Failed to delete booking');
    }
    throw new Error('An unknown error occurred while deleting the booking');
  }
};

// Fetch booking statuses (for real-time updates or polling)
export const getBookingStatuses = async (): Promise<BookingStatus[]> => {
  try {
    const response = await axios.get(`${API_URL}/api/bookings/status`);
    return response.data.data; // Assuming backend returns { success, data, error }
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error('Get booking statuses error:', error.response?.data?.error || error.message);
      throw new Error(error.response?.data?.error || 'Failed to fetch booking statuses');
    }
    throw new Error('An unknown error occurred while fetching booking statuses');
  }
};