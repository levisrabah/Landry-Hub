import React from 'react';

interface ReviewCardProps {
  review: {
    id: number;
    customerName?: string;
    rating: number;
    comment?: string;
    created_at?: string;
  };
}

const ReviewCard: React.FC<ReviewCardProps> = ({ review }) => {
  return (
    <div
      className="bg-white rounded-lg shadow p-4 mb-3 animate-fade-in focus-within:ring-2 focus-within:ring-blue-400 hover:shadow-lg transition-shadow duration-200"
      tabIndex={0}
      aria-label={`Review by ${review.customerName || 'Anonymous'}, rating: ${review.rating}`}
    >
      <div className="flex items-center gap-2 mb-1">
        <span className="font-semibold text-blue-900">{review.customerName || 'Anonymous'}</span>
        <span className="flex items-center">
          {[...Array(5)].map((_, i) => (
            <svg
              key={i}
              className={`w-4 h-4 ${i < review.rating ? 'text-yellow-400' : 'text-gray-300'}`}
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.967a1 1 0 00.95.69h4.178c.969 0 1.371 1.24.588 1.81l-3.385 2.46a1 1 0 00-.364 1.118l1.287 3.966c.3.922-.755 1.688-1.54 1.118l-3.385-2.46a1 1 0 00-1.175 0l-3.385 2.46c-.784.57-1.838-.196-1.539-1.118l1.287-3.966a1 1 0 00-.364-1.118L2.045 9.394c-.783-.57-.38-1.81.588-1.81h4.178a1 1 0 00.95-.69l1.286-3.967z" />
            </svg>
          ))}
        </span>
      </div>
      <div className="text-gray-700 mb-1">{review.comment || <span className="italic text-gray-400">No comment</span>}</div>
      <div className="text-xs text-gray-400">{review.created_at ? new Date(review.created_at).toLocaleDateString() : ''}</div>
    </div>
  );
};

export default ReviewCard; 