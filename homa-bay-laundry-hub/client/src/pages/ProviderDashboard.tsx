import { useAuth } from '../contexts/AuthContext';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';

interface Booking {
  id: string;
  customerName: string;
  serviceType: string;
  status: string;
  pickupDate: string;
  deliveryDate?: string;
}

interface Service {
  id: string;
  name: string;
  price: number;
  description: string;
}

const ProviderDashboard = () => {
  const { user } = useAuth();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchProviderData();
  }, []);

  const fetchProviderData = async () => {
    setIsLoading(true);
    try {
      const bookingsResponse = await axios.get(`${import.meta.env.VITE_API_URL}/api/bookings/provider`);
      const servicesResponse = await axios.get(`${import.meta.env.VITE_API_URL}/api/services/provider`);
      setBookings(bookingsResponse.data.data);
      setServices(servicesResponse.data.data);
    } catch (error) {
      console.error('Error fetching provider data:', error);
      toast.error('Failed to load provider data.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="pt-16">
      {/* Header Section */}
      <section className="bg-gradient-to-r from-green-700 to-green-600 text-white py-8">
        <div className="container mx-auto px-4 md:px-6">
          <h1 className="text-2xl md:text-3xl font-bold">Provider Dashboard</h1>
          <p className="opacity-90">Welcome back, {user?.name || 'Provider'}</p>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-8 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-2xl font-bold mb-6">Your Services</h2>
          {isLoading ? (
            <p>Loading services...</p>
          ) : services.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((service) => (
                <div key={service.id} className="bg-white p-4 rounded shadow">
                  <h3 className="text-lg font-bold">{service.name}</h3>
                  <p className="text-gray-500">{service.description}</p>
                  <p className="text-gray-900 font-medium">Price: Ksh {service.price}</p>
                </div>
              ))}
            </div>
          ) : (
            <p>No services found. Add your services to get started.</p>
          )}
        </div>
      </section>

      {/* Bookings Section */}
      <section className="py-8 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-2xl font-bold mb-6">Your Bookings</h2>
          {isLoading ? (
            <p>Loading bookings...</p>
          ) : bookings.length > 0 ? (
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Customer
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Service
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Pickup Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Delivery Date
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {bookings.map((booking) => (
                  <tr key={booking.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{booking.customerName}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{booking.serviceType}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{booking.status}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{booking.pickupDate}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {booking.deliveryDate || 'Not Scheduled'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No bookings found.</p>
          )}
        </div>
      </section>
    </div>
  );
};

export default ProviderDashboard;