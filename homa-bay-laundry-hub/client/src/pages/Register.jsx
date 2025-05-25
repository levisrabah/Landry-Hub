import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import { registerUser } from '../services/api';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('Customer');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    const userData = { username, password, role };
    try {
      await registerUser(userData);
      navigate('/login');
    } catch (error) {
      console.error('Registration failed', error);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold">Register</h2>
      <form onSubmit={handleRegister}>
        <select value={role} onChange={(e) => setRole(e.target.value)} className="border p-2 mb-4">
          <option value="Customer">Customer</option>
          <option value="Provider">Provider</option>
          <option value="Admin">Admin</option>
        </select>
        <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} className="border p-2 mb-4 w-full" required />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="border p-2 mb-4 w-full" required />
        <Button type="submit">Register</Button>
      </form>
    </div>
  );
};

export default Register;
