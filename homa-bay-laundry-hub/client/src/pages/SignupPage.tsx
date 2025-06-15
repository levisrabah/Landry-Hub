import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useNotification } from '../contexts/NotificationContext';

const SignupPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: '', email: '', password: '', location: '' });
  const [profilePhoto, setProfilePhoto] = useState<File | null>(null);
  const { pushNotification } = useNotification();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setProfilePhoto(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    formDataToSend.append('name', formData.name);
    formDataToSend.append('email', formData.email);
    formDataToSend.append('password', formData.password);
    formDataToSend.append('location', formData.location);
    formDataToSend.append('role', 'provider');
    if (profilePhoto) {
      formDataToSend.append('profilePhoto', profilePhoto);
    }
    try {
      await fetch(`${import.meta.env.VITE_API_URL}/api/auth/register`, {
        method: 'POST',
        body: formDataToSend,
      });
      pushNotification({ type: 'success', message: 'Signup successful! Please log in.', duration: 4000 });
      navigate('/login');
    } catch (error) {
      pushNotification({ type: 'error', message: 'Signup failed. Please try again.', duration: 4000 });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 animate-fade-in">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Provider Signup</h2>
        <input type="text" name="name" placeholder="Full Name" value={formData.name} onChange={handleChange} required className="w-full mb-4 p-2 border rounded" />
        <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required className="w-full mb-4 p-2 border rounded" />
        <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required className="w-full mb-4 p-2 border rounded" />
        <input type="text" name="location" placeholder="Location" value={formData.location} onChange={handleChange} className="w-full mb-4 p-2 border rounded" />
        <input type="file" name="profilePhoto" accept="image/*" onChange={handleFileChange} className="w-full mb-4 p-2 border rounded" />
        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded">Sign Up</button>
      </form>
    </div>
  );
};

export default SignupPage;