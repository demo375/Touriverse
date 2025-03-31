
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { Map, ArrowRight, Globe } from 'lucide-react';

interface DestinationCardProps {
  image: string;
  title: string;
  description: string;
  attractions: string[];
  country: string;
  continent: string;
  featured?: boolean;
  slug: string;
}

const DestinationCard = ({
  image,
  title,
  description,
  attractions,
  country,
  continent,
  featured = false,
  slug,
}: DestinationCardProps) => {
  return (
    <Card className="overflow-hidden group">
      <div className="relative">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-52 object-cover transition-transform duration-500 group-hover:scale-105" 
        />
        {featured && (
          <Badge className="absolute top-3 left-3 bg-travel-yellow text-gray-900">
            Popular
          </Badge>
        )}
      </div>
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-bold group-hover:text-travel-blue transition-colors">{title}</h3>
          <Badge variant="outline" className="text-xs font-normal">
            {continent}
          </Badge>
        </div>
        
        <div className="flex items-center text-sm text-gray-500 mb-3">
          <Map className="h-4 w-4 mr-1" />
          {country}
        </div>
        
        <p className="text-gray-600 mb-4 line-clamp-2">{description}</p>
        
        <div className="mb-5">
          <p className="text-sm font-medium mb-2">Popular Attractions:</p>
          <div className="flex flex-wrap gap-2">
            {attractions.slice(0, 3).map((attraction, index) => (
              <Badge key={index} variant="secondary" className="font-normal">
                {attraction}
              </Badge>
            ))}
            {attractions.length > 3 && (
              <Badge variant="outline" className="font-normal">
                +{attractions.length - 3} more
              </Badge>
            )}
          </div>
        </div>
        
        <Link to={`/destinations/${slug}`}>
          <Button className="w-full bg-travel-blue hover:bg-travel-blue/90">
            Explore {title}
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
};

const Destinations = () => {
  const destinations = [
    {
      id: 1,
      title: 'Kyoto',
      description: 'Experience the perfect blend of traditional Japan and modern amenities in this cultural capital with hundreds of temples, shrines, and gardens.',
      image: 'https://images.unsplash.com/photo-1466442929976-97f336a657be?w=500&auto=format&fit=crop&q=80',
      country: 'Japan',
      continent: 'Asia',
      attractions: ['Fushimi Inari Shrine', 'Arashiyama Bamboo Grove', 'Kinkaku-ji Temple', 'Gion District'],
      featured: true,
      slug: 'kyoto',
    },
    {
      id: 2,
      title: 'Santorini',
      description: 'Discover the iconic white-washed buildings with blue domes, perched on cliffs overlooking the brilliant blue Aegean Sea.',
      image: 'https://images.unsplash.com/photo-1492321936769-b49830bc1d1e?w=500&auto=format&fit=crop&q=80',
      country: 'Greece',
      continent: 'Europe',
      attractions: ['Oia Sunset', 'Fira', 'Red Beach', 'Akrotiri Archaeological Site'],
      featured: true,
      slug: 'santorini',
    },
    {
      id: 3,
      title: 'Swiss Alps',
      description: 'Explore breathtaking mountain landscapes with snow-capped peaks, crystal-clear lakes, and charming alpine villages.',
      image: 'https://images.unsplash.com/photo-1482938289607-e9573fc25ebb?w=500&auto=format&fit=crop&q=80',
      country: 'Switzerland',
      continent: 'Europe',
      attractions: ['Matterhorn', 'Interlaken', 'Jungfraujoch', 'Lake Lucerne'],
      featured: false,
      slug: 'swiss-alps',
    },
    {
      id: 4,
      title: 'Yosemite',
      description: 'Visit this iconic national park known for its towering waterfalls, ancient sequoias, and vast wilderness areas.',
      image: 'https://images.unsplash.com/photo-1426604966848-d7adac402bff?w=500&auto=format&fit=crop&q=80',
      country: 'United States',
      continent: 'North America',
      attractions: ['El Capitan', 'Half Dome', 'Yosemite Falls', 'Mariposa Grove'],
      featured: false,
      slug: 'yosemite',
    },
    {
      id: 5,
      title: 'Bali',
      description: 'Experience the Island of the Gods with its forested volcanic mountains, iconic rice paddies, beaches, and coral reefs.',
      image: 'https://images.unsplash.com/photo-1573790387438-4da905039392?w=500&auto=format&fit=crop&q=80',
      country: 'Indonesia',
      continent: 'Asia',
      attractions: ['Ubud Monkey Forest', 'Tanah Lot Temple', 'Mount Batur', 'Tegallalang Rice Terraces'],
      featured: true,
      slug: 'bali',
    },
    {
      id: 6,
      title: 'Marrakech',
      description: 'Explore the vibrant markets, gardens, palaces, and mosques in this major city of the Kingdom of Morocco.',
      image: 'https://images.unsplash.com/photo-1597212618440-806262de4f6b?w=500&auto=format&fit=crop&q=80',
      country: 'Morocco',
      continent: 'Africa',
      attractions: ['Jardin Majorelle', 'Medina', 'Bahia Palace', 'Jemaa el-Fnaa'],
      featured: false,
      slug: 'marrakech',
    },
    {
      id: 7,
      title: 'Machu Picchu',
      description: 'Discover the iconic Incan citadel set high in the Andes Mountains, offering spectacular views and mysterious ancient ruins.',
      image: 'https://images.unsplash.com/photo-1526392060635-9d6019884377?w=500&auto=format&fit=crop&q=80',
      country: 'Peru',
      continent: 'South America',
      attractions: ['Sun Gate', 'Huayna Picchu', 'Intihuatana Stone', 'Temple of the Sun'],
      featured: true,
      slug: 'machu-picchu',
    },
    {
      id: 8,
      title: 'Great Barrier Reef',
      description: 'Explore the world\'s largest coral reef system composed of over 2,900 individual reefs and 900 islands.',
      image: 'https://images.unsplash.com/photo-1549201440-34361a6a5158?w=500&auto=format&fit=crop&q=80',
      country: 'Australia',
      continent: 'Oceania',
      attractions: ['Whitehaven Beach', 'Heart Reef', 'Lady Musgrave Island', 'Michaelmas Cay'],
      featured: false,
      slug: 'great-barrier-reef',
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-8 pb-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Explore Amazing Destinations</h1>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Discover breathtaking locations around the world, from pristine beaches and majestic mountains
              to vibrant cities and cultural landmarks.
            </p>
          </div>
          
          <div className="bg-gray-50 p-6 rounded-lg mb-12 flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center mb-4 md:mb-0">
              <Globe className="h-10 w-10 text-travel-blue mr-4" />
              <div>
                <h2 className="text-xl font-bold text-gray-900">Explore by Continent</h2>
                <p className="text-gray-600">Find your next adventure by region</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2 justify-center">
              <Button variant="outline" className="border-travel-blue text-travel-blue hover:bg-travel-blue hover:text-white">Asia</Button>
              <Button variant="outline" className="border-travel-blue text-travel-blue hover:bg-travel-blue hover:text-white">Europe</Button>
              <Button variant="outline" className="border-travel-blue text-travel-blue hover:bg-travel-blue hover:text-white">North America</Button>
              <Button variant="outline" className="border-travel-blue text-travel-blue hover:bg-travel-blue hover:text-white">South America</Button>
              <Button variant="outline" className="border-travel-blue text-travel-blue hover:bg-travel-blue hover:text-white">Africa</Button>
              <Button variant="outline" className="border-travel-blue text-travel-blue hover:bg-travel-blue hover:text-white">Oceania</Button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {destinations.map((destination) => (
              <DestinationCard
                key={destination.id}
                image={destination.image}
                title={destination.title}
                description={destination.description}
                attractions={destination.attractions}
                country={destination.country}
                continent={destination.continent}
                featured={destination.featured}
                slug={destination.slug}
              />
            ))}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Destinations;
