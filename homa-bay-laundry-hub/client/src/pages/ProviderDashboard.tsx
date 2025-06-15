import { useAuth } from '../contexts/AuthContext';
import { useState, useEffect } from 'react';
import BookingCard from '../components/BookingCard';
import ReviewCard from '../components/ReviewCard';
import LoyaltyBanner from '../components/LoyaltyBanner';
import ReferralBanner from '../components/ReferralBanner';
import AnimatedButton from '../components/AnimatedButton';
import Modal from '../components/Modal';
import Loader from '../components/Loader';
import { useNotification } from '../contexts/NotificationContext';

const ProviderDashboard = () => {
  const { user } = useAuth();
  const [bookings, setBookings] = useState<any[]>([]);
  const [services, setServices] = useState<any[]>([]);
  const [reviews, setReviews] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showServiceModal, setShowServiceModal] = useState(false);
  const [serviceForm, setServiceForm] = useState({ name: '', price: '', description: '' });
  const { pushNotification } = useNotification();

  useEffect(() => {
    // Fetch bookings, services, reviews from API
    setIsLoading(false);
    pushNotification({ type: 'info', message: 'Welcome, provider! Manage your services and bookings here.', duration: 4000 });
  }, []);

  const handleAddService = () => {
    setShowServiceModal(true);
  };

  const handleServiceFormChange = (e: any) => {
    setServiceForm({ ...serviceForm, [e.target.name]: e.target.value });
  };

  const handleServiceFormSubmit = (e: any) => {
    e.preventDefault();
    // Call API to add service
    setShowServiceModal(false);
    pushNotification({ type: 'success', message: 'Service added successfully!', duration: 3000 });
  };

  return (
    <div className="pt-16">
      {/* Loyalty & Referral Banners */}
      <div className="container mx-auto px-4 md:px-6 flex flex-col md:flex-row gap-4 mb-8">
        <LoyaltyBanner points={200} discount={15} />
        <ReferralBanner code="PROVIDER15" bonus="Earn Ksh.150 per referral!" />
      </div>
      {/* Services Section */}
      <section className="py-8 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Your Services</h2>
            <AnimatedButton onClick={handleAddService}>Add Service</AnimatedButton>
          </div>
          {isLoading ? <Loader /> : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((service) => (
                <div key={service.id} className="bg-white p-4 rounded shadow">
                  <h3 className="text-lg font-bold">{service.name}</h3>
                  <p className="text-gray-500">{service.description}</p>
                  <p className="text-gray-900 font-medium">Price: Ksh {service.price}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
      {/* Add Service Modal */}
      <Modal open={showServiceModal} onClose={() => setShowServiceModal(false)}>
        <h2 className="text-xl font-bold mb-4">Add New Service</h2>
        <form onSubmit={handleServiceFormSubmit}>
          <input name="name" placeholder="Service Name" value={serviceForm.name} onChange={handleServiceFormChange} className="w-full mb-3 p-2 border rounded" required />
          <input name="price" placeholder="Price" value={serviceForm.price} onChange={handleServiceFormChange} className="w-full mb-3 p-2 border rounded" required />
          <textarea name="description" placeholder="Description" value={serviceForm.description} onChange={handleServiceFormChange} className="w-full mb-3 p-2 border rounded" required />
          <AnimatedButton type="submit">Add Service</AnimatedButton>
        </form>
      </Modal>
      {/* Bookings Section */}
      <section className="py-8 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-2xl font-bold mb-6">Your Bookings</h2>
          {isLoading ? <Loader /> : bookings.length > 0 ? (
            bookings.map((booking) => <BookingCard key={booking.id} booking={booking} />)
          ) : (
            <p>No bookings found.</p>
          )}
        </div>
      </section>
      {/* Reviews Section */}
      <section className="py-8 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-2xl font-bold mb-6">Your Reviews</h2>
          {isLoading ? <Loader /> : reviews.length > 0 ? (
            reviews.map((review) => <ReviewCard key={review.id} review={review} />)
          ) : (
            <p>No reviews yet.</p>
          )}
        </div>
      </section>
    </div>
  );
};

export default ProviderDashboard;