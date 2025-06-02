import { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import {
  Package, Calendar, DollarSign,
  Search, Filter, ChevronDown, Edit, Trash2,
  ArrowUpRight, ArrowDownRight, CheckCircle, XCircle
} from 'lucide-react';
import { getBookings, updateBookingStatus, deleteBooking } from '../api/bookings';
import { useAuth } from '../contexts/AuthContext';
import BookingStatusUpdates from '../components/BookingStatusUpdates'; // Import the component

interface Booking {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  service: string;
  date: string;
  time: string;
  paymentMethod: string;
  status: string;
  createdAt: string;
}

const AdminDashboard = () => {
  const { user } = useAuth();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [serviceFilter, setServiceFilter] = useState('all');

  // Stats
  const [stats, setStats] = useState({
    totalBookings: 0,
    pendingBookings: 0,
    completedBookings: 0,
    revenue: 0,
  });

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    setIsLoading(true);
    try {
      const data = await getBookings();
      setBookings(data);

      // Calculate stats
      const completed = data.filter(booking => booking.status === 'completed').length;
      const pending = data.filter(booking => booking.status === 'pending').length;

      setStats({
        totalBookings: data.length,
        pendingBookings: pending,
        completedBookings: completed,
        revenue: data.length * 150, // Dummy calculation
      });
    } catch (error) {
      console.error('Error fetching bookings:', error);
      toast.error('Failed to load bookings');
    } finally {
      setIsLoading(false);
    }
  };

  const handleStatusChange = async (bookingId: string, newStatus: string) => {
    try {
      await updateBookingStatus(bookingId, newStatus);
      setBookings(bookings.map(booking =>
        booking.id === bookingId ? { ...booking, status: newStatus } : booking
      ));
      toast.success('Booking status updated successfully');

      // Update stats
      const completed = bookings.filter(booking =>
        booking.id === bookingId ? newStatus === 'completed' : booking.status === 'completed'
      ).length;

      const pending = bookings.filter(booking =>
        booking.id === bookingId ? newStatus === 'pending' : booking.status === 'pending'
      ).length;

      setStats({
        ...stats,
        pendingBookings: pending,
        completedBookings: completed,
      });
    } catch (error) {
      console.error('Error updating booking status:', error);
      toast.error('Failed to update booking status');
    }
  };

  const handleDeleteBooking = async (bookingId: string) => {
    if (window.confirm('Are you sure you want to delete this booking?')) {
      try {
        await deleteBooking(bookingId);
        setBookings(bookings.filter(booking => booking.id !== bookingId));
        toast.success('Booking deleted successfully');

        // Update stats
        const deletedBooking = bookings.find(booking => booking.id === bookingId);
        setStats({
          ...stats,
          totalBookings: stats.totalBookings - 1,
          pendingBookings: deletedBooking?.status === 'pending' ? stats.pendingBookings - 1 : stats.pendingBookings,
          completedBookings: deletedBooking?.status === 'completed' ? stats.completedBookings - 1 : stats.completedBookings,
          revenue: stats.revenue - 150, // Dummy calculation
        });
      } catch (error) {
        console.error('Error deleting booking:', error);
        toast.error('Failed to delete booking');
      }
    }
  };

  const filteredBookings = bookings.filter(booking => {
    const matchesSearch = booking.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.phone.includes(searchTerm);

    const matchesStatus = statusFilter === 'all' || booking.status === statusFilter;
    const matchesService = serviceFilter === 'all' || booking.service === serviceFilter;

    return matchesSearch && matchesStatus && matchesService;
  });

  const getServiceLabel = (serviceId: string) => {
    const services: { [key: string]: string } = {
      'wash-fold': 'Wash & Fold',
      'dry-cleaning': 'Dry Cleaning',
      'ironing': 'Ironing',
      'stain-removal': 'Stain Removal',
      'bedding': 'Bedding & Linens',
      'commercial': 'Commercial',
    };

    return services[serviceId] || serviceId;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'processing':
        return 'bg-blue-100 text-blue-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getPaymentMethodLabel = (method: string) => {
    const methods: { [key: string]: string } = {
      'mpesa': 'M-Pesa',
      'card': 'Card',
      'cash': 'Cash',
    };

    return methods[method] || method;
  };

  return (
    <div className="pt-16">
      {/* Dashboard Header */}
      <section className="bg-gradient-to-r from-blue-700 to-blue-600 text-white py-8">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold">Admin Dashboard</h1>
              <p className="opacity-90">Welcome back, {user?.name || 'Admin'}</p>
            </div>
            <div className="mt-4 md:mt-0">
              <button
                onClick={fetchBookings}
                className="bg-white text-blue-700 px-4 py-2 rounded-md font-medium hover:bg-gray-100 transition-colors"
              >
                Refresh Data
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-8 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Total Bookings */}
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="flex items-center">
                <div className="bg-blue-100 p-3 rounded-lg">
                  <Calendar className="h-6 w-6 text-blue-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">Total Bookings</p>
                  <h3 className="text-2xl font-bold text-gray-800">{stats.totalBookings}</h3>
                </div>
              </div>
              <div className="mt-4 flex items-center text-sm">
                <ArrowUpRight className="h-4 w-4 text-green-500 mr-1" />
                <span className="text-green-500 font-medium">+12%</span>
                <span className="text-gray-500 ml-1">since last month</span>
              </div>
            </div>

            {/* Pending Bookings */}
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="flex items-center">
                <div className="bg-yellow-100 p-3 rounded-lg">
                  <Package className="h-6 w-6 text-yellow-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">Pending Orders</p>
                  <h3 className="text-2xl font-bold text-gray-800">{stats.pendingBookings}</h3>
                </div>
              </div>
              <div className="mt-4 flex items-center text-sm">
                <ArrowUpRight className="h-4 w-4 text-green-500 mr-1" />
                <span className="text-green-500 font-medium">+5%</span>
                <span className="text-gray-500 ml-1">since yesterday</span>
              </div>
            </div>

            {/* Completed Bookings */}
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="flex items-center">
                <div className="bg-green-100 p-3 rounded-lg">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">Completed Orders</p>
                  <h3 className="text-2xl font-bold text-gray-800">{stats.completedBookings}</h3>
                </div>
              </div>
              <div className="mt-4 flex items-center text-sm">
                <ArrowUpRight className="h-4 w-4 text-green-500 mr-1" />
                <span className="text-green-500 font-medium">+18%</span>
                <span className="text-gray-500 ml-1">since last month</span>
              </div>
            </div>

            {/* Revenue */}
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="flex items-center">
                <div className="bg-purple-100 p-3 rounded-lg">
                  <DollarSign className="h-6 w-6 text-purple-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">Revenue</p>
                  <h3 className="text-2xl font-bold text-gray-800">Ksh {stats.revenue.toLocaleString()}</h3>
                </div>
              </div>
              <div className="mt-4 flex items-center text-sm">
                <ArrowDownRight className="h-4 w-4 text-red-500 mr-1" />
                <span className="text-red-500 font-medium">-3%</span>
                <span className="text-gray-500 ml-1">since last week</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Real-Time Booking Status Updates */}
      <section className="py-8 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-2xl font-bold mb-6">Real-Time Booking Status Updates</h2>
          <BookingStatusUpdates />
        </div>
      </section>

      {/* Bookings Table */}
      <section className="py-8 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-2xl font-bold mb-6">Booking Management</h2>

          {/* Filters */}
          <div className="bg-gray-50 p-4 rounded-lg mb-6">
            <div className="flex flex-col md:flex-row md:items-center gap-4">
              {/* Search */}
              <div className="flex-1">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    placeholder="Search by name, email or phone..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              {/* Status Filter */}
              <div className="md:w-48">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Filter className="h-5 w-5 text-gray-400" />
                  </div>
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="w-full pl-10 pr-8 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
                  >
                    <option value="all">All Statuses</option>
                    <option value="pending">Pending</option>
                    <option value="processing">Processing</option>
                    <option value="completed">Completed</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                    <ChevronDown className="h-5 w-5 text-gray-400" />
                  </div>
                </div>
              </div>

              {/* Service Filter */}
              <div className="md:w-48">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Package className="h-5 w-5 text-gray-400" />
                  </div>
                  <select
                    value={serviceFilter}
                    onChange={(e) => setServiceFilter(e.target.value)}
                    className="w-full pl-10 pr-8 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
                  >
                    <option value="all">All Services</option>
                    <option value="wash-fold">Wash & Fold</option>
                    <option value="dry-cleaning">Dry Cleaning</option>
                    <option value="ironing">Ironing</option>
                    <option value="stain-removal">Stain Removal</option>
                    <option value="bedding">Bedding & Linens</option>
                    <option value="commercial">Commercial</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                    <ChevronDown className="h-5 w-5 text-gray-400" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto bg-white rounded-lg shadow">
            {isLoading ? (
              <div className="p-8 text-center">
                <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent"></div>
                <p className="mt-4 text-gray-600">Loading bookings...</p>
              </div>
            ) : filteredBookings.length > 0 ? (
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Customer
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Service
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date & Time
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Payment
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredBookings.map((booking) => (
                    <tr key={booking.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="bg-blue-100 h-10 w-10 rounded-full flex items-center justify-center">
                            <span className="text-blue-600 font-medium">
                              {booking.name.charAt(0).toUpperCase()}
                            </span>
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{booking.name}</div>
                            <div className="text-sm text-gray-500">{booking.email}</div>
                            <div className="text-sm text-gray-500">{booking.phone}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{getServiceLabel(booking.service)}</div>
                        <div className="text-sm text-gray-500">ID: {booking.id.substring(0, 8)}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{booking.date}</div>
                        <div className="text-sm text-gray-500 capitalize">{booking.time}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{getPaymentMethodLabel(booking.paymentMethod)}</div>
                        <div className="text-sm text-gray-500">Ksh 150</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <select
                          value={booking.status}
                          onChange={(e) => handleStatusChange(booking.id, e.target.value)}
                          className={`text-sm font-medium px-3 py-1 rounded-full ${getStatusColor(booking.status)}`}
                        >
                          <option value="pending">Pending</option>
                          <option value="processing">Processing</option>
                          <option value="completed">Completed</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button className="text-blue-600 hover:text-blue-900 mr-3">
                          <Edit className="h-5 w-5" />
                        </button>
                        <button
                          className="text-red-600 hover:text-red-900"
                          onClick={() => handleDeleteBooking(booking.id)}
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="p-8 text-center">
                <XCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-1">No bookings found</h3>
                <p className="text-gray-500">
                  {searchTerm || statusFilter !== 'all' || serviceFilter !== 'all'
                    ? 'Try adjusting your filters to see more results'
                    : 'There are no bookings in the system yet'}
                </p>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default AdminDashboard;