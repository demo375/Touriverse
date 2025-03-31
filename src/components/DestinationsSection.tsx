
import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

interface DestinationCardProps {
  image: string;
  name: string;
  tours: number;
  slug: string;
}

const DestinationCard = ({ image, name, tours, slug }: DestinationCardProps) => {
  return (
    <Link to={`/destinations/${slug}`} className="destination-card group">
      <div className="h-full">
        <img 
          src={image} 
          alt={name} 
          className="w-full h-64 object-cover transition-transform duration-700 ease-in-out"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/70 p-6 flex flex-col justify-end">
          <h3 className="text-xl font-bold text-white mb-1">{name}</h3>
          <p className="text-white/90 text-sm">{tours} tours</p>
        </div>
      </div>
    </Link>
  );
};

const DestinationsSection = () => {
  const destinations = [
    {
      id: 1,
      name: 'Santorini, Greece',
      image: 'https://images.unsplash.com/photo-1492321936769-b49830bc1d1e?w=500&auto=format&fit=crop&q=80',
      tours: 15,
      slug: 'santorini-greece',
    },
    {
      id: 2,
      name: 'Swiss Alps',
      image: 'https://images.unsplash.com/photo-1482938289607-e9573fc25ebb?w=500&auto=format&fit=crop&q=80',
      tours: 12,
      slug: 'swiss-alps',
    },
    {
      id: 3,
      name: 'Kyoto, Japan',
      image: 'https://images.unsplash.com/photo-1466442929976-97f336a657be?w=500&auto=format&fit=crop&q=80', 
      tours: 9,
      slug: 'kyoto-japan',
    },
    {
      id: 4,
      name: 'Yosemite, USA',
      image: 'https://images.unsplash.com/photo-1426604966848-d7adac402bff?w=500&auto=format&fit=crop&q=80',
      tours: 14,
      slug: 'yosemite-usa',
    },
    {
      id: 5,
      name: 'Bali, Indonesia',
      image: 'https://images.unsplash.com/photo-1615729947596-a598e5de0ab3?w=500&auto=format&fit=crop&q=80',
      tours: 18,
      slug: 'bali-indonesia',
    },
    {
      id: 6,
      name: 'Machu Picchu, Peru',
      image: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=500&auto=format&fit=crop&q=80',
      tours: 7,
      slug: 'machu-picchu-peru',
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-3">Popular Destinations</h2>
            <p className="text-gray-600 max-w-2xl">
              Explore our handpicked destinations loved by adventurers worldwide. 
              From pristine beaches to mountain getaways, we have something for everyone.
            </p>
          </div>
          <Button 
            variant="outline" 
            className="mt-4 md:mt-0 border-travel-blue text-travel-blue hover:bg-travel-blue hover:text-white flex"
          >
            All Destinations <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {destinations.map((destination) => (
            <DestinationCard
              key={destination.id}
              image={destination.image}
              name={destination.name}
              tours={destination.tours}
              slug={destination.slug}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default DestinationsSection;
