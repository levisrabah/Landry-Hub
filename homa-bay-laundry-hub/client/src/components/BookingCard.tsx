import React from 'react';

interface BookingCardProps {
  booking: {
    id: string;
    providerName: string;
    serviceType: string;
    status: string;
    scheduledAt: string;
    canPay?: boolean;
    canReview?: boolean;
    onTrack?: () => void;
    onPay?: () => void;
    onReview?: () => void;
  };
}

const statusColors: Record<string, string> = {
  Pending: 'bg-yellow-100 text-yellow-800',
  Accepted: 'bg-blue-100 text-blue-800',
  Washing: 'bg-blue-100 text-blue-800',
  Drying: 'bg-blue-100 text-blue-800',
  Ready: 'bg-green-100 text-green-800',
  Completed: 'bg-green-100 text-green-800',
  Rejected: 'bg-red-100 text-red-800',
};

const BookingCard: React.FC<BookingCardProps> = ({ booking }) => {
  return (
    <div
      className="bg-white rounded-xl shadow p-4 mb-4 flex flex-col gap-2 animate-fade-in focus-within:ring-2 focus-within:ring-blue-400 hover:shadow-lg transition-shadow duration-200"
      tabIndex={0}
      aria-label={`Booking with ${booking.providerName}, status: ${booking.status}`}
    >
      <div className="flex items-center justify-between">
        <div className="font-semibold text-blue-900">{booking.providerName}</div>
        <span className={`px-2 py-1 rounded text-xs font-bold ${statusColors[booking.status] || 'bg-gray-100 text-gray-800'}`}>{booking.status}</span>
      </div>
      <div className="text-sm text-gray-600">Service: <span className="font-medium">{booking.serviceType}</span></div>
      <div className="text-sm text-gray-500">Scheduled: {new Date(booking.scheduledAt).toLocaleString()}</div>
      <div className="flex gap-2 mt-2">
        {booking.onTrack && (
          <button className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 focus:bg-blue-700 focus:ring-2 focus:ring-blue-400 transition-colors" onClick={booking.onTrack} aria-label="Track booking">Track</button>
        )}
        {booking.canPay && booking.onPay && (
          <button className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 focus:bg-green-700 focus:ring-2 focus:ring-green-400 transition-colors" onClick={booking.onPay} aria-label="Pay for booking">Pay</button>
        )}
        {booking.canReview && booking.onReview && (
          <button className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 focus:bg-yellow-700 focus:ring-2 focus:ring-yellow-400 transition-colors" onClick={booking.onReview} aria-label="Review provider">Review</button>
        )}
      </div>
    </div>
  );
};

export default BookingCard; 