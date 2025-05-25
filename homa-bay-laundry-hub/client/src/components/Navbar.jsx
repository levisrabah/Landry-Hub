import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';

const Navbar = () => {
  return (
    <nav className="bg-gradient-to-r from-blue-500 to-blue-700 p-4">
      <div className="flex items-center">
        <img src={logo} alt="Laundry Hub Logo" className="h-10 w-10 mr-2" />
        <h1 className="text-white text-xl font-bold">Laundry Hub</h1>
      </div>
      <div className="ml-auto">
        <Link to="/" className="text-white mr-4">Home</Link>
        <Link to="/login" className="text-white">Login</Link>
        <Link to="/register" className="text-white ml-4">Register</Link>
      </div>
    </nav>
  );
};

export default Navbar;