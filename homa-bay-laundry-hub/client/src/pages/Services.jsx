import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProviderCard from '../components/ProviderCard';

const Services = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await axios.get('/api/services/');
        setServices(res.data);
      } catch (err) {
        setError('Failed to load services');
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, []);

  const filtered = services.filter(s =>
    !filter || s.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="max-w-5xl mx-auto py-8">
      <h2 className="text-2xl font-bold text-blue-700 mb-6">Browse Laundry Services</h2>
      <input
        type="text"
        placeholder="Search by service type..."
        className="mb-6 px-4 py-2 border rounded w-full"
        value={filter}
        onChange={e => setFilter(e.target.value)}
      />
      {loading && <div>Loading...</div>}
      {error && <div className="text-red-500">{error}</div>}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in-up">
        {filtered.length === 0 && !loading && !error && (
          <div className="col-span-full text-center text-gray-400 py-12">No services found. Try a different search.</div>
        )}
        {filtered.map(s => (
          <ProviderCard key={s.id} service={s} />
        ))}
      </div>
    </div>
  );
};

export default Services; 