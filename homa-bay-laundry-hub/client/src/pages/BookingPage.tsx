import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { Clock, MapPin, CreditCard, Phone, Check } from 'lucide-react';
import { createBooking } from '../api/bookings';

interface FormData {
  name: string;
  email: string;
  phone: string;
  address: string;
  service: string;
  date: string;
  time: string;
  paymentMethod: string;
  notes: string;
}

const BookingPage = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    address: '',
    service: '',
    date: '',
    time: '',
    paymentMethod: '',
    notes: '',
  });

  const services = [
    { id: 'wash-fold', name: 'Wash & Fold' },
    { id: 'dry-cleaning', name: 'Dry Cleaning' },
    { id: 'ironing', name: 'Ironing Service' },
    { id: 'stain-removal', name: 'Stain Removal' },
    { id: 'bedding', name: 'Bedding & Linens' },
    { id: 'commercial', name: 'Commercial Services' },
  ];

  const paymentMethods = [
    { id: 'mpesa', name: 'M-Pesa' },
    { id: 'card', name: 'Credit/Debit Card' },
    { id: 'cash', name: 'Cash on Delivery' },
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Call the API
      await createBooking(formData);
      
      // Show success message
      toast.success('Booking successful! We will confirm shortly.');
      
      // Redirect to home page or confirmation page
      navigate('/');
    } catch (error) {
      toast.error('Failed to create booking. Please try again.');
      console.error('Booking error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-400 text-white py-16 md:py-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Book Our Services</h1>
            <p className="text-xl opacity-90">
              Schedule a pickup for your laundry in just a few simple steps.
            </p>
          </div>
        </div>
      </section>

      {/* Booking Process */}
      <section className="py-8 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-wrap justify-center gap-4 md:gap-0">
            <div className="flex flex-col items-center px-4 md:px-8">
              <div className="bg-blue-100 text-blue-600 w-10 h-10 rounded-full flex items-center justify-center mb-3">
                <span className="font-bold">1</span>
              </div>
              <p className="text-center text-gray-700 font-medium">Fill Details</p>
            </div>
            <div className="hidden md:block w-16 pt-5">
              <div className="h-0.5 bg-blue-200"></div>
            </div>
            <div className="flex flex-col items-center px-4 md:px-8">
              <div className="bg-blue-100 text-blue-600 w-10 h-10 rounded-full flex items-center justify-center mb-3">
                <span className="font-bold">2</span>
              </div>
              <p className="text-center text-gray-700 font-medium">Confirm Pickup</p>
            </div>
            <div className="hidden md:block w-16 pt-5">
              <div className="h-0.5 bg-blue-200"></div>
            </div>
            <div className="flex flex-col items-center px-4 md:px-8">
              <div className="bg-blue-100 text-blue-600 w-10 h-10 rounded-full flex items-center justify-center mb-3">
                <span className="font-bold">3</span>
              </div>
              <p className="text-center text-gray-700 font-medium">We Collect</p>
            </div>
            <div className="hidden md:block w-16 pt-5">
              <div className="h-0.5 bg-blue-200"></div>
            </div>
            <div className="flex flex-col items-center px-4 md:px-8">
              <div className="bg-blue-100 text-blue-600 w-10 h-10 rounded-full flex items-center justify-center mb-3">
                <span className="font-bold">4</span>
              </div>
              <p className="text-center text-gray-700 font-medium">Delivered Clean</p>
            </div>
          </div>
        </div>
      </section>

      {/* Booking Form */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="md:flex">
                {/* Form Side */}
                <div className="md:w-2/3 p-6 md:p-8">
                  <h2 className="text-2xl font-bold mb-6">Booking Details</h2>
                  
                  <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      {/* Personal Information */}
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          required
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">Pickup Address</label>
                        <input
                          type="text"
                          id="address"
                          name="address"
                          value={formData.address}
                          onChange={handleChange}
                          required
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      {/* Service Details */}
                      <div>
                        <label htmlFor="service" className="block text-sm font-medium text-gray-700 mb-1">Service Type</label>
                        <select
                          id="service"
                          name="service"
                          value={formData.service}
                          onChange={handleChange}
                          required
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          <option value="">Select a service</option>
                          {services.map(service => (
                            <option key={service.id} value={service.id}>{service.name}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label htmlFor="paymentMethod" className="block text-sm font-medium text-gray-700 mb-1">Payment Method</label>
                        <select
                          id="paymentMethod"
                          name="paymentMethod"
                          value={formData.paymentMethod}
                          onChange={handleChange}
                          required
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          <option value="">Select payment method</option>
                          {paymentMethods.map(method => (
                            <option key={method.id} value={method.id}>{method.name}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">Pickup Date</label>
                        <input
                          type="date"
                          id="date"
                          name="date"
                          value={formData.date}
                          onChange={handleChange}
                          required
                          min={new Date().toISOString().split('T')[0]}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label htmlFor="time" className="block text-sm font-medium text-gray-700 mb-1">Pickup Time</label>
                        <select
                          id="time"
                          name="time"
                          value={formData.time}
                          onChange={handleChange}
                          required
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          <option value="">Select a time</option>
                          <option value="morning">Morning (8am - 12pm)</option>
                          <option value="afternoon">Afternoon (12pm - 4pm)</option>
                          <option value="evening">Evening (4pm - 8pm)</option>
                        </select>
                      </div>
                    </div>

                    <div className="mb-6">
                      <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-1">Special Instructions</label>
                      <textarea
                        id="notes"
                        name="notes"
                        value={formData.notes}
                        onChange={handleChange}
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Any special instructions or notes about your laundry..."
                      ></textarea>
                    </div>

                    <button
                      type="submit"
                      disabled={isLoading}
                      className={`w-full bg-blue-600 text-white py-3 px-6 rounded-md font-medium hover:bg-blue-700 transition-colors ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
                    >
                      {isLoading ? 'Processing...' : 'Confirm Booking'}
                    </button>
                  </form>
                </div>

                {/* Information Side */}
                <div className="md:w-1/3 bg-gray-50 p-6 md:p-8">
                  <h3 className="text-lg font-bold mb-4">Booking Information</h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <Clock className="h-5 w-5 text-blue-600 mr-3 mt-0.5" />
                      <div>
                        <h4 className="font-medium">Processing Time</h4>
                        <p className="text-sm text-gray-600">Standard: 24-48 hours</p>
                        <p className="text-sm text-gray-600">Express: Same day (additional fee)</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <MapPin className="h-5 w-5 text-blue-600 mr-3 mt-0.5" />
                      <div>
                        <h4 className="font-medium">Service Areas</h4>
                        <p className="text-sm text-gray-600">We currently serve all major neighborhoods in Nairobi.</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <CreditCard className="h-5 w-5 text-blue-600 mr-3 mt-0.5" />
                      <div>
                        <h4 className="font-medium">Payment</h4>
                        <p className="text-sm text-gray-600">Pay securely via M-Pesa, credit card, or cash on delivery.</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <Phone className="h-5 w-5 text-blue-600 mr-3 mt-0.5" />
                      <div>
                        <h4 className="font-medium">Need Help?</h4>
                        <p className="text-sm text-gray-600">Call us at +254 123 456 789</p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 pt-6 border-t border-gray-200">
                    <h4 className="font-medium mb-3">Why Book With Us:</h4>
                    <ul className="space-y-2">
                      <li className="flex items-center text-sm text-gray-600">
                        <Check className="h-4 w-4 text-blue-600 mr-2" />
                        Free pickup and delivery
                      </li>
                      <li className="flex items-center text-sm text-gray-600">
                        <Check className="h-4 w-4 text-blue-600 mr-2" />
                        Transparent pricing
                      </li>
                      <li className="flex items-center text-sm text-gray-600">
                        <Check className="h-4 w-4 text-blue-600 mr-2" />
                        Professional cleaning
                      </li>
                      <li className="flex items-center text-sm text-gray-600">
                        <Check className="h-4 w-4 text-blue-600 mr-2" />
                        Satisfaction guaranteed
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Payment Form - Conditionally Rendered */}
      {/*
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            <PaymentForm bookingId={selectedBookingId} />
          </div>
        </div>
      </section>
      */}
    </div>
  );
};

export default BookingPage;