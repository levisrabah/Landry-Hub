import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <aside className="w-64 bg-gray-200 h-full p-4">
      <h2 className="text-xl font-bold">Dashboard</h2>
      <ul>
        <li><Link to="/customer-dashboard">Customer Dashboard</Link></li>
        <li><Link to="/provider-dashboard">Provider Dashboard</Link></li>
        <li><Link to="/admin-dashboard">Admin Dashboard</Link></li>
      </ul>
    </aside>
  );
};

export default Sidebar;