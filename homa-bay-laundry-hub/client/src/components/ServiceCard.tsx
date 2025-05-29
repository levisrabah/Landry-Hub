import { Shirt, WashingMachine, BusFront as Iron } from 'lucide-react';
import { Link } from 'react-router-dom';

interface ServiceProps {
  service: {
    title: string;
    description: string;
    icon: string;
    price: string;
    bgColor: string;
  };
}

const ServiceCard = ({ service }: ServiceProps) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Shirt':
        return <Shirt className="h-8 w-8 text-blue-600" />;
      case 'Iron':
        return <Iron className="h-8 w-8 text-blue-600" />;
      case 'WashingMachine':
      default:
        return <WashingMachine className="h-8 w-8 text-blue-600" />;
    }
  };

  return (
    <div className={`${service.bgColor} p-6 rounded-xl hover:shadow-md transition-shadow`}>
      <div className="mb-4">
        {getIcon(service.icon)}
      </div>
      <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
      <p className="text-gray-600 mb-4">{service.description}</p>
      <div className="flex justify-between items-center">
        <span className="text-blue-600 font-medium">{service.price}</span>
        <Link to="/booking" className="text-blue-600 hover:text-blue-800 font-medium text-sm transition-colors">
          Book Now
        </Link>
      </div>
    </div>
  );
};

export default ServiceCard;