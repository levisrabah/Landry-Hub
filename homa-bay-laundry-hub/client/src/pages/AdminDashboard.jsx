import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

const AdminDashboard = () => {
  const { token } = useContext(AuthContext);
  const [dashboard, setDashboard] = useState(null);
  const [users, setUsers] = useState([]);
  const [providers, setProviders] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [dashRes, usersRes, providersRes, bookingsRes] = await Promise.all([
          axios.get('/api/admin/dashboard', { headers: { Authorization: `Bearer ${token}` } }),
          axios.get('/api/admin/users', { headers: { Authorization: `Bearer ${token}` } }),
          axios.get('/api/admin/providers', { headers: { Authorization: `Bearer ${token}` } }),
          axios.get('/api/admin/bookings', { headers: { Authorization: `Bearer ${token}` } })
        ]);
        setDashboard(dashRes.data);
        setUsers(usersRes.data);
        setProviders(providersRes.data);
        setBookings(bookingsRes.data);
      } catch (err) {
        setError('Failed to load admin data');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [token]);

  return (
    <div className="max-w-5xl mx-auto py-8">
      <h2 className="text-2xl font-bold text-blue-700 mb-6">Admin Dashboard</h2>
      {loading && <div>Loading...</div>}
      {error && <div className="text-red-500">{error}</div>}
      {dashboard && (
        <div className="mb-8 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-blue-100 rounded p-4 text-center">
            <div className="text-2xl font-bold">{dashboard.users}</div>
            <div>Users</div>
          </div>
          <div className="bg-blue-100 rounded p-4 text-center">
            <div className="text-2xl font-bold">{dashboard.providers}</div>
            <div>Providers</div>
          </div>
          <div className="bg-blue-100 rounded p-4 text-center">
            <div className="text-2xl font-bold">{dashboard.bookings}</div>
            <div>Bookings</div>
          </div>
          <div className="bg-blue-100 rounded p-4 text-center">
            <div className="text-2xl font-bold">Ksh. {dashboard.revenue}</div>
            <div>Revenue</div>
          </div>
        </div>
      )}
      <div className="mb-8">
        <div className="font-semibold text-lg mb-2">All Users</div>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded shadow">
            <thead>
              <tr>
                <th className="px-4 py-2">ID</th>
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">Email</th>
                <th className="px-4 py-2">Role</th>
                <th className="px-4 py-2">Phone</th>
              </tr>
            </thead>
            <tbody>
              {users.map(u => (
                <tr key={u.id} className="border-t">
                  <td className="px-4 py-2">{u.id}</td>
                  <td className="px-4 py-2">{u.name}</td>
                  <td className="px-4 py-2">{u.email}</td>
                  <td className="px-4 py-2">{u.role}</td>
                  <td className="px-4 py-2">{u.phone}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="mb-8">
        <div className="font-semibold text-lg mb-2">All Providers</div>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded shadow">
            <thead>
              <tr>
                <th className="px-4 py-2">ID</th>
                <th className="px-4 py-2">User ID</th>
                <th className="px-4 py-2">Verified</th>
                <th className="px-4 py-2">Location</th>
              </tr>
            </thead>
            <tbody>
              {providers.map(p => (
                <tr key={p.id} className="border-t">
                  <td className="px-4 py-2">{p.id}</td>
                  <td className="px-4 py-2">{p.user_id}</td>
                  <td className="px-4 py-2">{p.is_verified ? '✅' : '❌'}</td>
                  <td className="px-4 py-2">{p.location}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div>
        <div className="font-semibold text-lg mb-2">All Bookings</div>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded shadow">
            <thead>
              <tr>
                <th className="px-4 py-2">ID</th>
                <th className="px-4 py-2">Customer</th>
                <th className="px-4 py-2">Provider</th>
                <th className="px-4 py-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map(b => (
                <tr key={b.id} className="border-t">
                  <td className="px-4 py-2">{b.id}</td>
                  <td className="px-4 py-2">{b.customer_id}</td>
                  <td className="px-4 py-2">{b.provider_id}</td>
                  <td className="px-4 py-2">{b.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard; 