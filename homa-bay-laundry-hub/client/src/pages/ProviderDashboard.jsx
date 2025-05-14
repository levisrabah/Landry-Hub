import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

const ProviderDashboard = () => {
  const { token } = useContext(AuthContext);
  const [profile, setProfile] = useState(null);
  const [services, setServices] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [profileRes, servicesRes, bookingsRes] = await Promise.all([
          axios.get('/api/providers/me', { headers: { Authorization: `Bearer ${token}` } }),
          axios.get('/api/services/', { headers: { Authorization: `Bearer ${token}` } }),
          axios.get('/api/bookings/', { headers: { Authorization: `Bearer ${token}` } })
        ]);
        setProfile(profileRes.data);
        setServices(servicesRes.data.filter(s => s.provider_id === profileRes.data.id));
        setBookings(bookingsRes.data);
      } catch (err) {
        setError('Failed to load provider data');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [token]);

  return (
    <div className="max-w-4xl mx-auto py-8">
      <h2 className="text-2xl font-bold text-blue-700 mb-6">Provider Dashboard</h2>
      {loading && <div>Loading...</div>}
      {error && <div className="text-red-500">{error}</div>}
      {profile && (
        <div className="mb-8 bg-white rounded shadow p-4">
          <div className="font-semibold text-lg">Profile</div>
          <div>Name: {profile.name}</div>
          <div>Location: {profile.location}</div>
          <div>Verified: {profile.is_verified ? '✅' : '❌'}</div>
        </div>
      )}
      <div className="mb-8">
        <div className="font-semibold text-lg mb-2">My Services</div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {services.map(s => (
            <div key={s.id} className="bg-blue-50 rounded p-4 shadow">
              <div className="font-bold">{s.name}</div>
              <div>{s.description}</div>
              <div className="text-blue-700 font-semibold">Ksh. {s.price}</div>
            </div>
          ))}
        </div>
      </div>
      <div>
        <div className="font-semibold text-lg mb-2">My Bookings</div>
        <div className="space-y-2">
          {bookings.map(b => (
            <div key={b.id} className="bg-white rounded shadow p-3 flex flex-col md:flex-row md:items-center md:justify-between">
              <div>Booking #{b.id} - Status: <span className="font-bold text-blue-700">{b.status}</span></div>
              <div>Service ID: {b.service_id}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProviderDashboard; 