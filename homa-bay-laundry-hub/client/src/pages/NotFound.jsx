import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => (
  <div className="flex flex-col items-center justify-center min-h-screen bg-blue-50">
    <h1 className="text-5xl font-bold text-blue-700 mb-4">404</h1>
    <p className="text-lg text-gray-700 mb-6">Oops! The page you are looking for does not exist.</p>
    <Link to="/" className="bg-blue-700 text-white px-6 py-2 rounded hover:bg-blue-800 transition">Go Home</Link>
  </div>
);

export default NotFound; 