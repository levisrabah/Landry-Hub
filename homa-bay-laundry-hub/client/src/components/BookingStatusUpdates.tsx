import { useEffect, useState } from 'react';
import axios from 'axios';

interface BookingStatus {
  id: string;
  status: string;
}

const BookingStatusUpdates = () => {
  const [statusUpdates, setStatusUpdates] = useState<BookingStatus[]>([]);

  useEffect(() => {
    const fetchStatuses = async () => {
      try {
        const response = await axios.get<{ data: BookingStatus[] }>('/api/bookings/status');
        setStatusUpdates(response.data.data);
      } catch (error) {
        console.error('Failed to fetch booking statuses:', error);
      }
    };

    // Poll every 5 seconds
    const interval = setInterval(fetchStatuses, 5000);

    // Fetch immediately on mount
    fetchStatuses();

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="text-xl font-bold mb-4">Real-Time Booking Status Updates</h2>
      <ul>
        {statusUpdates.map((update) => (
          <li key={update.id} className="mb-2">
            Booking ID: {update.id} - Status: {update.status}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BookingStatusUpdates;