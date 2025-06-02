import { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';

type Analytics = {
  bookings_by_status: Record<string, number>;
  // Add other analytics properties here if needed
};

const AnalyticsPage = () => {
  const [analytics, setAnalytics] = useState<Analytics | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const response = await axios.get('/api/admin/analytics');
        setAnalytics(response.data.data);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          toast.error(error.response?.data?.error || 'Failed to fetch analytics.');
        } else {
          toast.error('Failed to fetch analytics.');
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchAnalytics();
  }, []);

  if (isLoading) {
    return <p>Loading analytics...</p>;
  }

  if (!analytics) {
    return <p>No analytics data available.</p>;
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-3xl font-bold mb-6">Booking Analytics</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {Object.entries(analytics.bookings_by_status).map(([status, count]) => (
          <div key={status} className="bg-white p-4 rounded shadow">
            <h2 className="text-xl font-semibold">{status}</h2>
            <p className="text-gray-600">{count} bookings</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AnalyticsPage;