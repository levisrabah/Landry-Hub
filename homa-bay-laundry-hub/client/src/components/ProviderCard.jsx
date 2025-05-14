import React, { useState, useEffect } from 'react';
import BookingModal from './BookingModal';
import axios from 'axios';

const ProviderCard = ({ service }) => {
  const [open, setOpen] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await axios.get(`/api/reviews/${service.provider_id}`);
        setReviews(res.data);
      } catch (err) {
        setError('Failed to load reviews');
      } finally {
        setLoading(false);
      }
    };
    fetchReviews();
  }, [service.provider_id]);

  const avgRating = reviews.length ? (reviews.reduce((a, r) => a + r.rating, 0) / reviews.length).toFixed(1) : null;

  return (
    <div className="bg-white rounded-lg shadow p-4 flex flex-col items-center">
      <img src="/assets/provider1.jpg" alt="Provider" className="w-16 h-16 rounded-full mb-2" />
      <div className="font-semibold text-lg">{service.name}</div>
      <div className="text-blue-600">Ksh. {service.price}</div>
      <div className="text-gray-600 mb-2">{service.description}</div>
      {loading ? (
        <div className="text-gray-400 text-sm mb-2 animate-pulse">Loading reviews...</div>
      ) : error ? (
        <div className="text-red-400 text-sm mb-2">{error}</div>
      ) : (
        <div className="mb-2 text-yellow-500 flex items-center gap-1">
          {avgRating ? (
            <>
              <span className="font-bold">{avgRating}</span>
              <span>★</span>
              <span className="text-gray-500">({reviews.length})</span>
            </>
          ) : (
            <span className="text-gray-400">No reviews yet</span>
          )}
        </div>
      )}
      {reviews.length > 0 && (
        <div className="w-full text-left text-xs text-gray-500 mb-2">
          <div className="font-semibold text-gray-700">Recent reviews:</div>
          {reviews.slice(0,2).map(r => (
            <div key={r.id} className="mb-1">"{r.comment}" <span className="text-yellow-400">{'★'.repeat(r.rating)}</span></div>
          ))}
        </div>
      )}
      <button onClick={() => setOpen(true)} className="bg-blue-700 text-white px-4 py-1 rounded hover:bg-blue-800 transition">Book</button>
      {open && <BookingModal service={service} onClose={() => setOpen(false)} />}
    </div>
  );
};

export default ProviderCard; 