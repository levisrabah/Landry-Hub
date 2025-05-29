import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

// Mock data for demo purposes
let mockBookings = [
  {
    id: uuidv4(),
    name: 'John Doe',
    email: 'john@example.com',
    phone: '+254712345678',
    address: '123 Main St, Nairobi',
    service: 'wash-fold',
    date: '2025-01-15',
    time: 'morning',
    paymentMethod: 'mpesa',
    status: 'completed',
    notes: 'Please handle with care',
    createdAt: '2025-01-10T10:30:00Z'
  },
  {
    id: uuidv4(),
    name: 'Jane Smith',
    email: 'jane@example.com',
    phone: '+254723456789',
    address: '456 Park Ave, Nairobi',
    service: 'dry-cleaning',
    date: '2025-01-16',
    time: 'afternoon',
    paymentMethod: 'card',
    status: 'pending',
    notes: '',
    createdAt: '2025-01-11T09:15:00Z'
  },
  {
    id: uuidv4(),
    name: 'Michael Johnson',
    email: 'michael@example.com',
    phone: '+254734567890',
    address: '789 Oak St, Nairobi',
    service: 'ironing',
    date: '2025-01-17',
    time: 'evening',
    paymentMethod: 'cash',
    status: 'processing',
    notes: 'Extra starch on shirts please',
    createdAt: '2025-01-12T14:45:00Z'
  },
  {
    id: uuidv4(),
    name: 'Sarah Williams',
    email: 'sarah@example.com',
    phone: '+254745678901',
    address: '101 Pine St, Nairobi',
    service: 'bedding',
    date: '2025-01-18',
    time: 'morning',
    paymentMethod: 'mpesa',
    status: 'completed',
    notes: '',
    createdAt: '2025-01-13T11:20:00Z'
  },
  {
    id: uuidv4(),
    name: 'Robert Brown',
    email: 'robert@example.com',
    phone: '+254756789012',
    address: '202 Cedar St, Nairobi',
    service: 'stain-removal',
    date: '2025-01-19',
    time: 'afternoon',
    paymentMethod: 'card',
    status: 'pending',
    notes: 'Wine stain on white shirt',
    createdAt: '2025-01-14T16:10:00Z'
  }
];

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

export const getBookings = async () => {
  try {
    // For demo purposes, return mock data
    return mockBookings;
    
    // In a real application, this would call the API
    // const response = await axios.get(`${API_URL}/bookings`);
    // return response.data;
  } catch (error) {
    console.error('Get bookings error:', error);
    throw error;
  }
};

export const getBookingById = async (id: string) => {
  try {
    // For demo purposes
    const booking = mockBookings.find(b => b.id === id);
    if (!booking) throw new Error('Booking not found');
    return booking;
    
    // In a real application, this would call the API
    // const response = await axios.get(`${API_URL}/bookings/${id}`);
    // return response.data;
  } catch (error) {
    console.error('Get booking error:', error);
    throw error;
  }
};

export const createBooking = async (bookingData: any) => {
  try {
    // For demo purposes
    const newBooking = {
      id: uuidv4(),
      ...bookingData,
      status: 'pending',
      createdAt: new Date().toISOString()
    };
    
    mockBookings.push(newBooking);
    return newBooking;
    
    // In a real application, this would call the API
    // const response = await axios.post(`${API_URL}/bookings`, bookingData);
    // return response.data;
  } catch (error) {
    console.error('Create booking error:', error);
    throw error;
  }
};

export const updateBookingStatus = async (id: string, status: string) => {
  try {
    // For demo purposes
    mockBookings = mockBookings.map(booking => 
      booking.id === id ? { ...booking, status } : booking
    );
    
    return { success: true };
    
    // In a real application, this would call the API
    // const response = await axios.patch(`${API_URL}/bookings/${id}`, { status });
    // return response.data;
  } catch (error) {
    console.error('Update booking status error:', error);
    throw error;
  }
};

export const deleteBooking = async (id: string) => {
  try {
    // For demo purposes
    mockBookings = mockBookings.filter(booking => booking.id !== id);
    
    return { success: true };
    
    // In a real application, this would call the API
    // const response = await axios.delete(`${API_URL}/bookings/${id}`);
    // return response.data;
  } catch (error) {
    console.error('Delete booking error:', error);
    throw error;
  }
};