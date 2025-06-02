import { CheckCircle } from 'lucide-react';
import CTASection from '../components/CTASection';
import LevisImage from '../assets/levis.jpeg';
import CalebImage from '../assets/Midusa.jpeg'
import midusa from '../assets/eye.gif';
import WhyChooseUs from '../assets/Why-Choose.jpeg';
import storyImage from '../assets/storyImage.png';

const AboutPage = () => {
  const teamMembers = [
    {
      name: 'Levis Rabah',
      role: 'Founder & CEO',
      image: LevisImage,
      bio: 'Levis founded LeClean with a vision to revolutionize laundry services in Kenya.',
    },
    {
      name: 'Caleb Oduor',
      role: 'Operations Manager',
      image: CalebImage,
      bio: 'Caleb ensures that all operations run smoothly and all customers receive excellent service.',
    },
    {
      name: 'Whitney Rashel',
      role: 'Customer Service Lead',
      image: midusa,
      bio: 'Whitney leads our customer service team, ensuring every customer is completely satisfied.',
    },
  ];

  const values = [
    {
      title: 'Quality',
      description: 'We are committed to delivering the highest quality cleaning services using premium products.',
    },
    {
      title: 'Reliability',
      description: 'Our customers can count on us to pick up and deliver on time, every time.',
    },
    {
      title: 'Sustainability',
      description: 'We use eco-friendly products and processes to minimize our environmental impact.',
    },
    {
      title: 'Innovation',
      description: 'We continuously improve our services by adopting new technologies and methods.',
    },
  ];

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-400 text-white py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">About LeClean</h1> 
            <p className="text-xl opacity-90">
              We're on a mission to give you back your time by taking care of your laundry needs with professional and reliable service.
            </p>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Our Story</h2>
              <p className="text-gray-600 mb-4">
                LeClean was founded in 2024 with a simple mission: to provide busy professionals, families, and businesses with high-quality laundry services that save time and deliver exceptional results.
              </p>
              <p className="text-gray-600 mb-4">
                What started as a small operation has grown into a trusted laundry service provider across Nairobi, with plans for expansion to other major cities in Kenya.
              </p>
              <p className="text-gray-600">
                Our team of experienced professionals is dedicated to ensuring that every garment is treated with care, every stain is tackled effectively, and every customer is completely satisfied with our service.
              </p>
            </div>
            <div className="bg-gray-200 h-80 rounded-lg flex items-center justify-center">
              <img src={storyImage} alt="Our Story" className="w-full h-full object-cover rounded-lg" />
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Values</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              These core values guide everything we do at LeClean.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <h3 className="text-xl font-semibold mb-3">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1 bg-gray-200 h-80 rounded-lg flex items-center justify-center">
              <img
                src={WhyChooseUs}
                alt="Why Choose LeClean"
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
            <div className="order-1 lg:order-2">
              <h2 className="text-3xl font-bold mb-6">Why Choose LeClean?</h2>
              <ul className="space-y-4">
                <li className="flex">
                  <CheckCircle className="h-6 w-6 text-blue-600 mr-3 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold mb-1">Experienced Team</h4>
                    <p className="text-gray-600">Our staff has years of experience in professional laundry services.</p>
                  </div>
                </li>
                <li className="flex">
                  <CheckCircle className="h-6 w-6 text-blue-600 mr-3 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold mb-1">Quality Guaranteed</h4>
                    <p className="text-gray-600">We guarantee your satisfaction or we'll re-clean your items at no extra charge.</p>
                  </div>
                </li>
                <li className="flex">
                  <CheckCircle className="h-6 w-6 text-blue-600 mr-3 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold mb-1">Convenient Service</h4>
                    <p className="text-gray-600">Free pickup and delivery at times that suit your schedule.</p>
                  </div>
                </li>
                <li className="flex">
                  <CheckCircle className="h-6 w-6 text-blue-600 mr-3 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold mb-1">Eco-Friendly</h4>
                    <p className="text-gray-600">We use environmentally friendly cleaning products and energy-efficient equipment.</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Meet Our Team */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Meet Our Team</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              The dedicated professionals behind LeClean's exceptional service.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow text-center">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
                />
                <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
                <p className="text-blue-600 mb-3">{member.role}</p>
                <p className="text-gray-600">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <CTASection 
        title="Experience the LeClean Difference"
        description="Join our growing family of satisfied customers and never worry about laundry again."
        buttonText="Book Our Services"
        buttonLink="/booking"
      />
    </div>
  );
};

export default AboutPage;