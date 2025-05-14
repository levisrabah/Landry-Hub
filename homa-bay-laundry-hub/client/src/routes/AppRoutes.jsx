import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Services from '../pages/Services';
import Register from '../pages/Register';
import ProviderDashboard from '../pages/ProviderDashboard';
import Login from '../pages/Login'; 
import Home from '../pages/Home'; 
import Bookings from '../pages/Bookings'; 
import AdminDashboard from '../pages/AdminDashboard'; 

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/services" element={<Services />} />
    <Route path="/register" element={<Register />} />
    <Route path="/provider/dashboard" element={<ProviderDashboard />} />
    <Route path="/login" element={<Login />} />
    <Route path="/bookings" element={<Bookings />} />
    <Route path="/admin/dashboard" element={<AdminDashboard />} />
    {/* Add more routes as needed */}
  </Routes>
);

export default AppRoutes;