import { WashingMachine, Shirt, BusFront as Iron, Sparkles, Wind, Briefcase, Clock, Check } from 'lucide-react';
import CTASection from '../components/CTASection';

const ServicesPage = () => {
  const services = [
    {
      id: 'wash-fold',
      title: 'Wash & Fold',
      description: 'Our most popular service. We wash, dry, and neatly fold your everyday laundry items.',
      icon: <WashingMachine className="h-10 w-10 text-blue-600" />,
      details: [
        'Sorting by color and fabric type',
        'Pre-treatment of stains',
        'High-quality detergents',
        'Proper temperature settings',
        'Careful folding and packaging'
      ],
      price: 'From $2/lb',
      bgColor: 'bg-blue-50'
    },
    {
      id: 'dry-cleaning',
      title: 'Dry Cleaning',
      description: 'Professional cleaning for your delicate garments, suits, dresses, and special care items.',
      icon: <Shirt className="h-10 w-10 text-blue-600" />,
      details: [
        'Safe for delicate fabrics',
        'Preserves color and texture',
        'Removes tough stains',
        'Proper pressing and finishing',
        'Eco-friendly solvents'
      ],
      price: 'From $5/item',
      bgColor: 'bg-indigo-50'
    },
    {
      id: 'ironing',
      title: 'Ironing Service',
      description: 'Get your clothes perfectly pressed and ready to wear or hang.',
      icon: <Iron className="h-10 w-10 text-blue-600" />,
      details: [
        'Professional pressing equipment',
        'Attention to detail',
        'Proper temperature for each fabric',
        'Crisp, neat finishing',
        'Careful hanging and packaging'
      ],
      price: 'From $3/item',
      bgColor: 'bg-purple-50'
    },
    {
      id: 'stain-removal',
      title: 'Stain Removal',
      description: 'Specialized treatment for tough stains on your valuable garments.',
      icon: <Sparkles className="h-10 w-10 text-blue-600" />,
      details: [
        'Stain analysis',
        'Targeted treatment methods',
        'Safe for all fabric types',
        'Preserves garment integrity',
        'Multiple treatment options available'
      ],
      price: 'From $8/stain',
      bgColor: 'bg-red-50'
    },
    {
      id: 'bedding',
      title: 'Bedding & Linens',
      description: 'Thorough cleaning of your sheets, comforters, duvets, pillowcases, and other linens.',
      icon: <Wind className="h-10 w-10 text-blue-600" />,
      details: [
        'Deep cleaning',
        'Dust mite elimination',
        'Fresh scent options',
        'Proper folding',
        'Available in all sizes'
      ],
      price: 'From $15/set',
      bgColor: 'bg-green-50'
    },
    {
      id: 'commercial',
      title: 'Commercial Services',
      description: 'Specialized laundry solutions for businesses, restaurants, hotels, and other establishments.',
      icon: <Briefcase className="h-10 w-10 text-blue-600" />,
      details: [
        'Volume discounts',
        'Regular scheduled pickups',
        'Customized service plans',
        'Dedicated account manager',
        'Billing options for businesses'
      ],
      price: 'Custom quotes',
      bgColor: 'bg-yellow-50'
    }
  ];

  const additionalOptions = [
    {
      title: 'Express Service',
      description: 'Need your laundry faster? Get same-day service with our express option.',
      icon: <Clock className="h-6 w-6 text-blue-600" />,
      price: '+50% of base price'
    },
    {
      title: 'Eco-Friendly',
      description: 'Opt for our environmentally friendly cleaning products and processes.',
      icon: <Sparkles className="h-6 w-6 text-blue-600" />,
      price: 'No additional cost'
    },
    {
      title: 'Fragrance-Free',
      description: 'Perfect for those with sensitivities to fragrances and perfumes.',
      icon: <Wind className="h-6 w-6 text-blue-600" />,
      price: 'No additional cost'
    }
  ];

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-400 text-white py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Services</h1>
            <p className="text-xl opacity-90">
              Discover our comprehensive range of laundry and dry cleaning services designed to meet all your needs.
            </p>
          </div>
        </div>
      </section>

      {/* Services List */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 gap-16">
            {services.map((service, index) => (
              <div key={service.id} id={service.id} className={`${index % 2 === 1 ? 'lg:flex-row-reverse' : ''} flex flex-col lg:flex-row gap-12`}>
                <div className={`w-full lg:w-1/3 ${service.bgColor} rounded-xl p-8 flex flex-col items-center justify-center text-center`}>
                  <div className="mb-4">{service.icon}</div>
                  <h3 className="text-2xl font-bold mb-2">{service.title}</h3>
                  <p className="text-gray-600 mb-4">{service.description}</p>
                  <span className="font-semibold text-blue-600">{service.price}</span>
                </div>
                <div className="w-full lg:w-2/3">
                  <h3 className="text-2xl font-bold mb-6">What's Included</h3>
                  <ul className="space-y-4">
                    {service.details.map((detail, i) => (
                      <li key={i} className="flex items-start">
                        <Check className="h-5 w-5 text-blue-600 mr-3 mt-0.5" />
                        <span className="text-gray-600">{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Options */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Additional Options</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Customize your laundry experience with these additional services.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {additionalOptions.map((option, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <div className="mb-4">{option.icon}</div>
                <h3 className="text-lg font-semibold mb-2">{option.title}</h3>
                <p className="text-gray-600 mb-4">{option.description}</p>
                <span className="text-blue-600 font-medium">{option.price}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing FAQ */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Pricing FAQ</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Common questions about our pricing and services.
            </p>
          </div>
          
          <div className="max-w-3xl mx-auto divide-y">
            <div className="py-6">
              <h3 className="text-xl font-semibold mb-3">How is pricing calculated?</h3>
              <p className="text-gray-600">
                For wash & fold services, we charge by weight. For dry cleaning and specialty items, we charge per item. Commercial services are quoted based on volume and frequency.
              </p>
            </div>
            <div className="py-6">
              <h3 className="text-xl font-semibold mb-3">Are there any hidden fees?</h3>
              <p className="text-gray-600">
                No. We're transparent with our pricing. The only additional charges would be for express service or special stain treatment if required.
              </p>
            </div>
            <div className="py-6">
              <h3 className="text-xl font-semibold mb-3">Do you offer discounts?</h3>
              <p className="text-gray-600">
                Yes! We offer discounts for regular customers, bulk orders, and special promotions throughout the year. Students and seniors also receive special rates.
              </p>
            </div>
            <div className="py-6">
              <h3 className="text-xl font-semibold mb-3">How do I pay for services?</h3>
              <p className="text-gray-600">
                We accept M-Pesa, credit/debit cards, and cash on delivery. For regular customers, we offer monthly billing options.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <CTASection 
        title="Ready to Experience Our Services?"
        description="Book now and enjoy clean, fresh laundry without lifting a finger."
        buttonText="Book a Service"
        buttonLink="/booking"
      />
    </div>
  );
};

export default ServicesPage;