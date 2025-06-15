import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { User, Lock } from 'lucide-react';
import { useNotification } from '../contexts/NotificationContext';

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({ email: '', password: '' });
  const { pushNotification } = useNotification();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await login(formData.email, formData.password);
      pushNotification({ type: 'success', message: 'Login successful!', duration: 3000 });
      navigate('/');
    } catch (error) {
      pushNotification({ type: 'error', message: 'Login failed. Please check your credentials.', duration: 4000 });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="pt-16 min-h-screen bg-gray-50 flex flex-col justify-center animate-fade-in">
      <div className="container mx-auto px-4 md:px-6 py-12">
        <div className="max-w-md mx-auto">
          <div className="text-center mb-8">
            <Link to="/">
              <img src="/src/assets/logo.png" alt="Laundry Hub Logo" className="h-16 w-auto mx-auto mb-4 object-contain" />
            </Link>
            <h1 className="text-2xl font-bold text-gray-800">Sign In</h1>
            <p className="text-gray-600 mt-2">Access your dashboard</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 md:p-8">
            <form onSubmit={handleLogin}>
              <div className="mb-6">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-gray-400" />
                  </div>
                  <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Enter your email" />
                </div>
              </div>
              <div className="mb-6">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} required className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Enter your password" />
                </div>
              </div>
              <button type="submit" disabled={isLoading} className={`w-full bg-blue-600 text-white py-2 px-4 rounded-md font-medium hover:bg-blue-700 transition-colors ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}>{isLoading ? 'Signing in...' : 'Sign In'}</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;