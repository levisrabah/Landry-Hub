import React from 'react';
import { Provider } from '../api/providers';
import VerifiedBadge from './VerifiedBadge';

interface ProviderCardProps {
  provider: Provider;
  onView?: () => void;
}

const ProviderCard: React.FC<ProviderCardProps> = ({ provider, onView }) => {
  return (
    <div
      className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-200 overflow-hidden flex flex-col items-center p-4 relative group focus-within:ring-2 focus-within:ring-blue-400"
      tabIndex={0}
      aria-label={`Provider: ${provider.name}, Location: ${provider.location}, Rating: ${provider.average_rating || 'N/A'}`}
    >
      <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-blue-100 mb-2">
        <img
          src={provider.profile_photo || '/assets/logo.png'}
          alt={provider.name}
          className="object-cover w-full h-full group-hover:scale-105 group-focus:scale-105 transition-transform duration-200"
        />
      </div>
      <div className="flex items-center gap-2">
        <h3 className="text-lg font-semibold text-blue-900">{provider.name}</h3>
        {provider.is_verified && <VerifiedBadge />}
      </div>
      <div className="text-sm text-gray-500 mb-1">{provider.location}</div>
      <div className="flex items-center gap-1 mb-2">
        <span className="text-yellow-500">★</span>
        <span className="font-medium text-gray-700">{provider.average_rating?.toFixed(1) || 'N/A'}</span>
      </div>
      <button
        className="mt-auto bg-blue-600 text-white px-4 py-2 rounded-lg font-medium shadow hover:bg-blue-700 focus:bg-blue-800 focus:ring-2 focus:ring-blue-400 transition-colors w-full"
        onClick={onView}
        tabIndex={0}
        aria-label={`View and book provider ${provider.name}`}
      >
        View & Book
      </button>
    </div>
  );
};

export default ProviderCard; 