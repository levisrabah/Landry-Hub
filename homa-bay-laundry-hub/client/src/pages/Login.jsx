import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import { loginUser } from '../services/api';

const Login = () => {
  const [role, setRole] = useState('Customer');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const credentials = { username, password, role };
    try {
      await loginUser(credentials);
      navigate(`/${role.toLowerCase()}-dashboard`);
    } catch (error) {
      console.error('Login failed', error);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold">Login</h2>
      <form onSubmit={handleLogin}>
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="border p-2 mb-4"
        >
          <option value="Customer">Customer</option>
          <option value="Provider">Provider</option>
          <option value="Admin">Admin</option>
        </select>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="border p-2 mb-4 w-full"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border p-2 mb-4 w-full"
          required
        />
        <Button type="submit">Login</Button>
      </form>
    </div>
  );
};

export default Login;
