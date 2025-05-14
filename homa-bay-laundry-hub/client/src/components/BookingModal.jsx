import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import Toast from './Toast';

const BookingModal = ({ service, onClose }) => {
  const { token } = useContext(AuthContext);
  const [date, setDate] = useState('');
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [toast, setToast] = useState(null);

  const handleBook = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await axios.post('/api/bookings/', {
        service_id: service.id,
        scheduled_at: date
      }, { headers: { Authorization: `Bearer ${token}` } });
      setStep(2);
      setSuccess('Booking created! Proceed to payment.');
      setToast({ message: 'Booking successful!', type: 'success' });
    } catch (err) {
      setError('Booking failed.');
      setToast({ message: 'Booking failed.', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 animate-fade-in">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md relative animate-fade-in-up">
        <button onClick={onClose} className="absolute top-2 right-2 text-gray-500 hover:text-blue-700">&times;</button>
        {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
        {step === 1 && (
          <form onSubmit={handleBook}>
            <h2 className="text-xl font-bold mb-4">Book {service.name}</h2>
            {error && <div className="text-red-500 mb-2">{error}</div>}
            <label className="block mb-2 font-semibold">Select Date/Time</label>
            <input type="datetime-local" className="w-full mb-4 px-3 py-2 border rounded" value={date} onChange={e => setDate(e.target.value)} required />
            <button type="submit" className="w-full bg-blue-700 text-white py-2 rounded font-semibold hover:bg-blue-800 transition" disabled={loading}>{loading ? 'Booking...' : 'Book & Pay'}</button>
          </form>
        )}
        {step === 2 && (
          <div className="text-center">
            {loading ? (
              <div className="animate-pulse text-gray-400 mb-4">Processing payment...</div>
            ) : (
              <>
                <div className="text-green-600 font-bold mb-4">{success}</div>
                <div className="mb-4">(Simulated) M-Pesa STK Push sent. Please complete payment on your phone.</div>
                <button onClick={onClose} className="bg-blue-700 text-white px-6 py-2 rounded hover:bg-blue-800 transition">Close</button>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingModal; 