import { useState } from 'react';
import { getNearbyProviders } from '../api/integrations';
import ProviderCard from '../components/ProviderCard';
import Loader from '../components/Loader';

const MapPage = () => {
  const [location, setLocation] = useState({ lat: '', lng: '' });
  const [radius, setRadius] = useState(5);
  const [providers, setProviders] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async () => {
    setIsLoading(true);
    // Simulate fetching providers
    const res = await getNearbyProviders(Number(location.lat), Number(location.lng), radius);
    setProviders(res.providers);
    setIsLoading(false);
  };

  return (
    <div className="pt-16 min-h-screen bg-gray-50 animate-fade-in">
      <div className="container mx-auto px-4 md:px-6 py-12">
        <h1 className="text-3xl font-bold mb-6">Find Laundry Providers Near You</h1>
        <form className="flex flex-col md:flex-row gap-4 mb-8" role="search" aria-label="Provider location filter" onSubmit={e => { e.preventDefault(); handleSearch(); }}>
          <input type="number" placeholder="Latitude" value={location.lat} onChange={e => setLocation({ ...location, lat: e.target.value })} className="p-2 border rounded w-full md:w-1/4 focus:ring-2 focus:ring-blue-400" aria-label="Latitude" />
          <input type="number" placeholder="Longitude" value={location.lng} onChange={e => setLocation({ ...location, lng: e.target.value })} className="p-2 border rounded w-full md:w-1/4 focus:ring-2 focus:ring-blue-400" aria-label="Longitude" />
          <input type="number" placeholder="Radius (km)" value={radius} onChange={e => setRadius(Number(e.target.value))} className="p-2 border rounded w-full md:w-1/4 focus:ring-2 focus:ring-blue-400" aria-label="Radius in kilometers" />
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 focus:bg-blue-800 focus:ring-2 focus:ring-blue-400 transition-colors" aria-label="Search providers by location">Search</button>
        </form>
        <div className="bg-white rounded-lg shadow p-6 mb-8 min-h-[300px] flex items-center justify-center">
          {/* Google Maps Placeholder */}
          <span className="text-gray-400">Google Maps will be embedded here</span>
        </div>
        {isLoading ? <Loader /> : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {providers.map((provider) => (
              <ProviderCard key={provider.id} provider={provider} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MapPage; 