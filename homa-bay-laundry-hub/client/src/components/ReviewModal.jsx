import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';

const ReviewModal = ({ bookingId, providerId, onClose, onSuccess }) => {
  const { token } = useContext(AuthContext);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await axios.post('/api/reviews/', {
        booking_id: bookingId,
        provider_id: providerId,
        rating,
        comment
      }, { headers: { Authorization: `Bearer ${token}` } });
      onSuccess && onSuccess();
      onClose();
    } catch (err) {
      setError('Failed to submit review.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md relative">
        <button onClick={onClose} className="absolute top-2 right-2 text-gray-500 hover:text-blue-700">&times;</button>
        <form onSubmit={handleSubmit}>
          <h2 className="text-xl font-bold mb-4">Leave a Review</h2>
          {error && <div className="text-red-500 mb-2">{error}</div>}
          <div className="mb-4 flex items-center gap-2">
            {[1,2,3,4,5].map(star => (
              <span key={star} onClick={() => setRating(star)} className={star <= rating ? 'text-yellow-400 text-2xl cursor-pointer' : 'text-gray-300 text-2xl cursor-pointer'}>★</span>
            ))}
          </div>
          <textarea
            className="w-full mb-4 px-3 py-2 border rounded"
            placeholder="Write your feedback..."
            value={comment}
            onChange={e => setComment(e.target.value)}
            required
          />
          <button type="submit" className="w-full bg-blue-700 text-white py-2 rounded font-semibold hover:bg-blue-800 transition" disabled={loading}>{loading ? 'Submitting...' : 'Submit Review'}</button>
        </form>
      </div>
    </div>
  );
};

export default ReviewModal; 