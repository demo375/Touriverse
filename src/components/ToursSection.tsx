
import React from 'react';
import { Clock, Map, Star, Users, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';

interface TourCardProps {
  image: string;
  title: string;
  description: string;
  price: number;
  duration: string;
  rating: number;
  groupSize: string;
  location: string;
  featured?: boolean;
  slug: string;
}

const TourCard = ({
  image,
  title,
  description,
  price,
  duration,
  rating,
  groupSize,
  location,
  featured = false,
  slug,
}: TourCardProps) => {
  return (
    <div className="tour-card group">
      <div className="relative">
        <img src={image} alt={title} className="w-full h-48 object-cover" />
        {featured && (
          <Badge className="absolute top-3 left-3 bg-travel-yellow text-gray-900">
            Featured
          </Badge>
        )}
        <div className="absolute bottom-3 left-3 flex items-center space-x-1 bg-white/90 rounded-full px-2 py-1">
          <Star className="h-3 w-3 text-travel-yellow fill-travel-yellow" />
          <span className="text-xs font-semibold">{rating}</span>
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2 line-clamp-1 group-hover:text-travel-blue transition-colors">
          {title}
        </h3>
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{description}</p>
        
        <div className="flex flex-wrap gap-3 mb-4">
          <div className="flex items-center text-xs text-gray-500">
            <Clock className="mr-1 h-3 w-3" />
            {duration}
          </div>
          <div className="flex items-center text-xs text-gray-500">
            <Users className="mr-1 h-3 w-3" />
            {groupSize}
          </div>
          <div className="flex items-center text-xs text-gray-500">
            <Map className="mr-1 h-3 w-3" />
            {location}
          </div>
        </div>
        
        <div className="flex justify-between items-center">
          <div>
            <span className="text-xl font-bold text-travel-blue">${price}</span>
            <span className="text-sm text-gray-500"> / person</span>
          </div>
          <Link to={`/tours/${slug}`}>
            <Button size="sm" className="bg-travel-blue hover:bg-travel-blue/90">
              View Details
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

const ToursSection = () => {
  const tours = [
    {
      id: 1,
      title: 'Ancient Wonders of Kyoto',
      description: 'Explore the historic temples and gardens of Kyoto with an expert local guide.',
      image: 'https://images.unsplash.com/photo-1466442929976-97f336a657be?w=500&auto=format&fit=crop&q=80',
      price: 129,
      duration: '5 hours',
      rating: 4.9,
      groupSize: 'Up to 8',
      location: 'Kyoto, Japan',
      featured: true,
      slug: 'ancient-wonders-kyoto',
    },
    {
      id: 2,
      title: 'Santorini Sunset Cruise',
      description: "Sail around Santorini's caldera and enjoy the spectacular sunset views.",
      image: 'https://images.unsplash.com/photo-1492321936769-b49830bc1d1e?w=500&auto=format&fit=crop&q=80',
      price: 89,
      duration: '3 hours',
      rating: 4.8,
      groupSize: 'Up to 12',
      location: 'Santorini, Greece',
      featured: false,
      slug: 'santorini-sunset-cruise',
    },
    {
      id: 3,
      title: 'Swiss Alps Hiking Adventure',
      description: 'Trek through the breathtaking landscapes of the Swiss Alps with experienced mountain guides.',
      image: 'https://images.unsplash.com/photo-1482938289607-e9573fc25ebb?w=500&auto=format&fit=crop&q=80',
      price: 159,
      duration: '7 hours',
      rating: 4.7,
      groupSize: 'Up to 6',
      location: 'Swiss Alps',
      featured: false,
      slug: 'swiss-alps-hiking',
    },
    {
      id: 4,
      title: 'Yosemite Valley Exploration',
      description: 'Discover the natural wonders of Yosemite National Park with a certified wilderness guide.',
      image: 'https://images.unsplash.com/photo-1426604966848-d7adac402bff?w=500&auto=format&fit=crop&q=80',
      price: 199,
      duration: 'Full day',
      rating: 4.9,
      groupSize: 'Up to 10',
      location: 'California, USA',
      featured: true,
      slug: 'yosemite-valley-exploration',
    },
  ];

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-3">Popular Tours</h2>
            <p className="text-gray-600 max-w-2xl">
              Immerse yourself in culture, nature, and adventure with our expert-led tours.
              Each experience is carefully crafted to create unforgettable memories.
            </p>
          </div>
          <Button 
            variant="outline" 
            className="mt-4 md:mt-0 border-travel-blue text-travel-blue hover:bg-travel-blue hover:text-white flex"
          >
            All Tours <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {tours.map((tour) => (
            <TourCard
              key={tour.id}
              image={tour.image}
              title={tour.title}
              description={tour.description}
              price={tour.price}
              duration={tour.duration}
              rating={tour.rating}
              groupSize={tour.groupSize}
              location={tour.location}
              featured={tour.featured}
              slug={tour.slug}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ToursSection;
