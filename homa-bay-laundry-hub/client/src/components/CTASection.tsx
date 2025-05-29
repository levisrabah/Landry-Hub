import { Link } from 'react-router-dom';

interface CTASectionProps {
  title: string;
  description: string;
  buttonText: string;
  buttonLink: string;
}

const CTASection = ({ title, description, buttonText, buttonLink }: CTASectionProps) => {
  return (
    <section className="py-16 bg-blue-600 text-white">
      <div className="container mx-auto px-4 md:px-6 text-center">
        <h2 className="text-3xl font-bold mb-4">{title}</h2>
        <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
          {description}
        </p>
        <Link
          to={buttonLink}
          className="bg-white text-blue-600 font-medium py-3 px-8 rounded-lg hover:bg-gray-100 transition-colors inline-block"
        >
          {buttonText}
        </Link>
      </div>
    </section>
  );
};

export default CTASection;