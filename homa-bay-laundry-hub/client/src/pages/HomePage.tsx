import { Link } from 'react-router-dom';
import { Clock, Truck, CreditCard, Award, ArrowRight } from 'lucide-react';
import TestimonialCard from '../components/TestimonialCard';
import ServiceCard from '../components/ServiceCard';
import CTASection from '../components/CTASection';
import LaundryServiceImage from '../assets/LaundryService.jpeg';

const HomePage = () => {
  const features = [
    {
      icon: <Clock className="h-6 w-6 text-blue-600" />,
      title: '24 Hour Turnaround',
      description: 'Get your clean laundry back in just 24 hours with our express service.'
    },
    {
      icon: <Truck className="h-6 w-6 text-blue-600" />,
      title: 'Free Pickup & Delivery',
      description: 'We collect and deliver your laundry at no extra cost within our service areas.'
    },
    {
      icon: <CreditCard className="h-6 w-6 text-blue-600" />,
      title: 'M-Pesa Supported',
      description: 'Conveniently pay for your laundry services using M-Pesa mobile payments.'
    },
    {
      icon: <Award className="h-6 w-6 text-blue-600" />,
      title: 'Eco-Friendly Cleaning',
      description: 'We use environmentally friendly detergents and energy-efficient machines.'
    }
  ];

  const popularServices = [
    {
      title: 'Wash & Fold',
      description: 'Your everyday laundry washed, dried, and neatly folded.',
      icon: 'WashingMachine',
      price: 'From $2/lb',
      bgColor: 'bg-blue-50'
    },
    {
      title: 'Dry Cleaning',
      description: 'Professional cleaning for your delicate and special garments.',
      icon: 'Shirt',
      price: 'From $5/item',
      bgColor: 'bg-indigo-50'
    },
    {
      title: 'Ironing Service',
      description: 'Get perfectly pressed clothes ready to wear or hang.',
      icon: 'Iron',
      price: 'From Ksh.200/item',
      bgColor: 'bg-purple-50'
    }
  ];

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-600 to-blue-400 text-white pt-16 pb-20 md:pt-24 md:pb-32">
        <div className="absolute inset-0 opacity-10 bg-pattern"></div>
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="max-w-2xl">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
                Professional Laundry Services at Your Doorstep
              </h1>
              <p className="text-xl mb-8 opacity-90">
                We pick up, clean, and deliver your laundry with care. Save time and enjoy fresh, clean clothes without the hassle.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/booking"
                  className="bg-white text-blue-600 font-medium py-3 px-6 rounded-lg hover:bg-gray-100 transition-colors inline-flex items-center justify-center"
                >
                  Book Now
                </Link>
                <Link
                  to="/services"
                  className="bg-blue-700 text-white font-medium py-3 px-6 rounded-lg hover:bg-blue-800 transition-colors inline-flex items-center justify-center"
                >
                  View Services
                </Link>
              </div>
            </div>
            <div className="hidden lg:block">
              {/* This will be replaced with an actual image or animation */}
              <div className="bg-blue-300 bg-opacity-30 rounded-lg h-96 flex items-center justify-center">
                <img src={LaundryServiceImage} alt="Laundry Service" className="w-full h-full object-cover rounded-lg" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">How It Works</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Getting your laundry done has never been easier. Just follow these simple steps:
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="relative bg-white p-6 rounded-xl shadow-sm border border-gray-100 text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 text-blue-600 font-bold text-xl mb-4">1</div>
              <h3 className="text-xl font-semibold mb-3">Schedule a Pickup</h3>
              <p className="text-gray-600 mb-4">Book a convenient time for us to collect your laundry through our website or app.</p>
            </div>
            
            {/* Step 2 */}
            <div className="relative bg-white p-6 rounded-xl shadow-sm border border-gray-100 text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 text-blue-600 font-bold text-xl mb-4">2</div>
              <h3 className="text-xl font-semibold mb-3">We Clean Your Clothes</h3>
              <p className="text-gray-600 mb-4">Our professionals clean your items with care using eco-friendly products.</p>
            </div>
            
            {/* Step 3 */}
            <div className="relative bg-white p-6 rounded-xl shadow-sm border border-gray-100 text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 text-blue-600 font-bold text-xl mb-4">3</div>
              <h3 className="text-xl font-semibold mb-3">Delivery to Your Door</h3>
              <p className="text-gray-600 mb-4">We deliver your fresh, clean laundry back to you at your scheduled time.</p>
            </div>
          </div>
          
          <div className="text-center mt-10">
            <Link to="/booking" className="inline-flex items-center text-blue-600 font-medium hover:text-blue-800 transition-colors">
              Schedule Your First Pickup <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Popular Services */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Popular Services</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              From everyday laundry to special care items, we provide a range of services to meet all your needs.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {popularServices.map((service, index) => (
              <ServiceCard key={index} service={service} />
            ))}
          </div>
          
          <div className="text-center mt-10">
            <Link to="/services" className="bg-blue-600 text-white font-medium py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors inline-block">
              View All Services
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">What Our Customers Say</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Don't just take our word for it. Here's what our customers have to say about our services.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <TestimonialCard
              name="Eligio"
              role="Student"
              image="https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=100"
              quote="Laundry Hub has been a lifesaver for me! With my busy schedule, I never have time to do laundry properly. Their service is reliable and my clothes always come back perfectly clean."
              rating={5}
            />
            <TestimonialCard
              name="Moses Oduor"
              role="Business Owner"
              image="https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=100"
              quote="We use Laundry Hub for our small restaurant's linens and staff uniforms. The quality is consistent and their commercial rates are very competitive. Highly recommended!"
              rating={5}
            />
            <TestimonialCard
              name="Emily Williams"
              role="Student"
              image="https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100"
              quote="As a student, I don't have access to good laundry facilities. Laundry Hub's student discount and quick turnaround make it perfect for me. Great service!"
              rating={4}
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <CTASection 
        title="Ready for Fresh, Clean Clothes Without the Hassle?"
        description="Join hundreds of satisfied customers who trust us with their laundry needs."
        buttonText="Book Your Pickup Now"
        buttonLink="/booking"
      />
    </div>
  );
};

export default HomePage;