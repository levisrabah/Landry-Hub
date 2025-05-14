import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex flex-col items-center">
      <section className="w-full max-w-2xl text-center py-12">
        <h1 className="text-4xl md:text-5xl font-extrabold text-blue-800 mb-4 animate-fade-in">Find Laundry Services Near You</h1>
        <p className="text-lg text-blue-700 mb-6">Book, pay, and track your laundry with trusted providers in Homa-Bay Town.</p>
        <Link to="/register" className="bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold shadow-lg hover:bg-blue-800 transition">Get Started</Link>
      </section>
      <section className="w-full max-w-3xl bg-white rounded-xl shadow-lg p-6 mb-8 animate-fade-in-up">
        <h2 className="text-2xl font-bold text-blue-700 mb-4">How It Works</h2>
        <div className="flex flex-col md:flex-row gap-6 justify-center">
          <div className="flex-1">
            <div className="text-4xl mb-2">🧺</div>
            <h3 className="font-semibold text-blue-600">Browse Providers</h3>
            <p className="text-gray-600">Filter by service, price, rating, or location.</p>
          </div>
          <div className="flex-1">
            <div className="text-4xl mb-2">📱</div>
            <h3 className="font-semibold text-blue-600">Book & Pay</h3>
            <p className="text-gray-600">Book instantly and pay via M-Pesa STK Push.</p>
          </div>
          <div className="flex-1">
            <div className="text-4xl mb-2">⭐</div>
            <h3 className="font-semibold text-blue-600">Rate & Review</h3>
            <p className="text-gray-600">Leave feedback and earn loyalty rewards.</p>
          </div>
        </div>
      </section>
      <section className="w-full max-w-3xl mb-12 animate-fade-in-up">
        <h2 className="text-xl font-bold text-blue-700 mb-4">Featured Providers</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Example cards, replace with real data */}
          <div className="bg-white rounded-lg shadow p-4 flex flex-col items-center">
            <img src="/assets/provider1.jpg" alt="Provider 1" className="w-20 h-20 rounded-full mb-2" />
            <div className="font-semibold">Jane Otieno</div>
            <div className="text-blue-600">Duvet Cleaning</div>
            <div className="text-yellow-400">★★★★★</div>
          </div>
          <div className="bg-white rounded-lg shadow p-4 flex flex-col items-center">
            <img src="/assets/provider2.jpg" alt="Provider 2" className="w-20 h-20 rounded-full mb-2" />
            <div className="font-semibold">Wycliffe Ouma</div>
            <div className="text-blue-600">Dry Cleaning</div>
            <div className="text-yellow-400">★★★★☆</div>
          </div>
          <div className="bg-white rounded-lg shadow p-4 flex flex-col items-center">
            <img src="/assets/provider3.jpg" alt="Provider 3" className="w-20 h-20 rounded-full mb-2" />
            <div className="font-semibold">Mary Achieng</div>
            <div className="text-blue-600">Ironing</div>
            <div className="text-yellow-400">★★★★★</div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home; 