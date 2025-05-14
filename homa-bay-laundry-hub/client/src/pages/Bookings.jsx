import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import ReviewModal from '../components/ReviewModal';

const Bookings = () => {
  const { token } = useContext(AuthContext);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [reviewBooking, setReviewBooking] = useState(null);
  const [toast, setToast] = useState('');

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await axios.get('/api/bookings/', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setBookings(res.data);
      } catch (err) {
        setError('Failed to load bookings');
      } finally {
        setLoading(false);
      }
    };
    fetchBookings();
  }, [token]);

  const handleReviewSuccess = () => {
    setToast('Review submitted!');
    setTimeout(() => setToast(''), 3000);
  };

  return (
    <div className="max-w-3xl mx-auto py-8">
      <h2 className="text-2xl font-bold text-blue-700 mb-6">My Bookings</h2>
      {toast && <div className="fixed top-4 right-4 bg-green-600 text-white px-4 py-2 rounded shadow-lg z-50 animate-fade-in">{toast}</div>}
      {loading && <div>Loading...</div>}
      {error && <div className="text-red-500">{error}</div>}
      <div className="space-y-4">
        {bookings.map(b => (
          <div key={b.id} className="bg-white rounded shadow p-4 flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <div className="font-semibold">Booking #{b.id}</div>
              <div>Status: <span className="font-bold text-blue-700">{b.status}</span></div>
              <div>Service ID: {b.service_id}</div>
              <div>Scheduled: {b.scheduled_at ? new Date(b.scheduled_at).toLocaleString() : 'N/A'}</div>
            </div>
            {b.status === 'Completed' && (
              <button onClick={() => setReviewBooking(b)} className="mt-2 md:mt-0 bg-yellow-400 text-white px-4 py-1 rounded hover:bg-yellow-500 transition">Leave Review</button>
            )}
          </div>
        ))}
      </div>
      {reviewBooking && (
        <ReviewModal
          bookingId={reviewBooking.id}
          providerId={reviewBooking.provider_id}
          onClose={() => setReviewBooking(null)}
          onSuccess={handleReviewSuccess}
        />
      )}
    </div>
  );
};

export default Bookings; 