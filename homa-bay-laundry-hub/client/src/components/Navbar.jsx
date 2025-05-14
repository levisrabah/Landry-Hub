import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  return (
    <nav className="bg-blue-700 text-white px-4 py-2 flex items-center justify-between shadow-md">
      <Link to="/" className="font-bold text-xl tracking-tight flex items-center gap-2">
        <img src="/logo192.png" alt="Logo" className="h-8 w-8" />
        HomaBay Laundry Hub
      </Link>
      <div className="flex gap-4 items-center">
        <Link to="/" className="hover:underline">Home</Link>
        {user && user.role === 'customer' && <Link to="/bookings" className="hover:underline">My Bookings</Link>}
        {user && user.role === 'provider' && <Link to="/provider/dashboard" className="hover:underline">Provider Dashboard</Link>}
        {user && user.role === 'admin' && <Link to="/admin" className="hover:underline">Admin</Link>}
        {!user && <Link to="/login" className="hover:underline">Login</Link>}
        {!user && <Link to="/register" className="hover:underline">Register</Link>}
        {user && <button onClick={logout} className="ml-2 bg-white text-blue-700 px-3 py-1 rounded hover:bg-blue-100">Logout</button>}
      </div>
    </nav>
  );
};

export default Navbar; 