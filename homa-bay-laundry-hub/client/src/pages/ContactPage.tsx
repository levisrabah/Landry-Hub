import { useState } from 'react';
import { useNotification } from '../contexts/NotificationContext';
import { Mail, Phone, MapPin, Clock, Send } from 'lucide-react';
import { sendContactMessage } from '../api/contact';

const ContactPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const { pushNotification } = useNotification();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Call the API
      await sendContactMessage(formData);
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
      });
      
      // Show success message
      pushNotification({ type: 'success', message: 'Message sent successfully! We will contact you shortly.', duration: 4000 });
    } catch (error) {
      pushNotification({ type: 'error', message: 'Failed to send message. Please try again.', duration: 4000 });
      console.error('Contact form error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="pt-16 animate-fade-in">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-400 text-white py-16 md:py-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Contact Us</h1>
            <p className="text-xl opacity-90">
              Have questions or need assistance? We're here to help!
            </p>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-gray-50 p-6 rounded-xl text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 text-blue-600 mb-4">
                <Phone className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Phone</h3>
              <p className="text-gray-600">+254 123 456 789</p>
              <p className="text-gray-600">+254 987 654 321</p>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-xl text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 text-blue-600 mb-4">
                <Mail className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Email</h3>
              <p className="text-gray-600">info@laundryhub.com</p>
              <p className="text-gray-600">support@laundryhub.com</p>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-xl text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 text-blue-600 mb-4">
                <MapPin className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Location</h3>
              <p className="text-gray-600">123 Laundry Street</p>
              <p className="text-gray-600">Nairobi, Kenya</p>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-xl text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 text-blue-600 mb-4">
                <Clock className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Business Hours</h3>
              <p className="text-gray-600">Mon - Fri: 8am - 8pm</p>
              <p className="text-gray-600">Sat - Sun: 9am - 6pm</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form and Map */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <h2 className="text-2xl font-bold mb-6">Send Us a Message</h2>
              
              <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-sm">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
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
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                    <select
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Select a subject</option>
                      <option value="general">General Inquiry</option>
                      <option value="booking">Booking Question</option>
                      <option value="feedback">Feedback</option>
                      <option value="complaint">Complaint</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>
                
                <div className="mb-6">
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Your Message</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={5}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  ></textarea>
                </div>
                
                <button
                  type="submit"
                  disabled={isLoading}
                  className={`bg-blue-600 text-white py-3 px-6 rounded-md font-medium hover:bg-blue-700 transition-colors inline-flex items-center ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
                >
                  {isLoading ? 'Sending...' : (
                    <>
                      Send Message <Send className="ml-2 h-4 w-4" />
                    </>
                  )}
                </button>
              </form>
            </div>
            
            {/* Map */}
            <div>
              <h2 className="text-2xl font-bold mb-6">Find Us</h2>
              
              <div className="bg-white p-4 rounded-xl shadow-sm h-[400px] flex items-center justify-center">
                {/* This is a placeholder for Google Maps */}
                <div className="text-center">
                  <MapPin className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                  <p className="text-gray-600">Google Maps will be embedded here</p>
                  <p className="text-gray-500 text-sm mt-2">123 Laundry Street, Nairobi, Kenya</p>
                </div>
              </div>
              
              <div className="mt-6">
                <h3 className="text-lg font-semibold mb-3">Directions</h3>
                <p className="text-gray-600 mb-4">
                  Our main facility is located in central Nairobi, just off the main highway. There's ample parking available for customers dropping off their laundry in person.
                </p>
                <p className="text-gray-600">
                  Nearby landmarks: Central Park Mall, Nairobi City Hospital, Green Gardens Apartments
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Find quick answers to common questions about our services.
            </p>
          </div>
          
          <div className="max-w-3xl mx-auto divide-y">
            <div className="py-6">
              <h3 className="text-xl font-semibold mb-3">What areas do you serve?</h3>
              <p className="text-gray-600">
                We currently serve all major neighborhoods in Nairobi, with plans to expand to other cities in Kenya soon.
              </p>
            </div>
            <div className="py-6">
              <h3 className="text-xl font-semibold mb-3">How quickly can I get my laundry back?</h3>
              <p className="text-gray-600">
                Our standard turnaround time is 24-48 hours. We also offer express service for an additional fee, which provides same-day or next-morning delivery.
              </p>
            </div>
            <div className="py-6">
              <h3 className="text-xl font-semibold mb-3">Do you handle delicate fabrics?</h3>
              <p className="text-gray-600">
                Yes, we specialize in cleaning all types of fabrics, including delicate items. Our professional team uses appropriate methods for each fabric type.
              </p>
            </div>
            <div className="py-6">
              <h3 className="text-xl font-semibold mb-3">What if I'm not satisfied with the service?</h3>
              <p className="text-gray-600">
                We offer a 100% satisfaction guarantee. If you're not happy with our service, we'll re-clean your items at no additional cost or provide a refund.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;