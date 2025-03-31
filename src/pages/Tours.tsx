
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Card, CardContent } from '@/components/ui/card';
import { Clock, Users, Map, Star, Filter, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

// Reusing the TourCard component with slight modifications
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
}: {
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
}) => {
  return (
    <Card className="overflow-hidden group">
      <div className="relative">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-105" 
        />
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
      
      <CardContent className="p-4">
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
      </CardContent>
    </Card>
  );
};

const Tours = () => {
  const [priceRange, setPriceRange] = useState([0, 500]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDuration, setSelectedDuration] = useState<string[]>([]);
  
  // Mock tours data
  const toursData = [
    {
      id: 1,
      title: 'Ancient Wonders of Kyoto',
      description: 'Explore the historic temples and gardens of Kyoto with an expert local guide.',
      image: 'https://images.unsplash.com/photo-1466442929976-97f336a657be?w=500&auto=format&fit=crop&q=80',
      price: 129,
      duration: '5 hours',
      durationCategory: 'half-day',
      rating: 4.9,
      groupSize: 'Up to 8',
      location: 'Kyoto, Japan',
      featured: true,
      slug: 'ancient-wonders-kyoto',
      categories: ['cultural', 'walking'],
    },
    {
      id: 2,
      title: 'Santorini Sunset Cruise',
      description: "Sail around Santorini's caldera and enjoy the spectacular sunset views.",
      image: 'https://images.unsplash.com/photo-1492321936769-b49830bc1d1e?w=500&auto=format&fit=crop&q=80',
      price: 89,
      duration: '3 hours',
      durationCategory: 'half-day',
      rating: 4.8,
      groupSize: 'Up to 12',
      location: 'Santorini, Greece',
      featured: false,
      slug: 'santorini-sunset-cruise',
      categories: ['cruise', 'sunset'],
    },
    {
      id: 3,
      title: 'Swiss Alps Hiking Adventure',
      description: 'Trek through the breathtaking landscapes of the Swiss Alps with experienced mountain guides.',
      image: 'https://images.unsplash.com/photo-1482938289607-e9573fc25ebb?w=500&auto=format&fit=crop&q=80',
      price: 159,
      duration: '7 hours',
      durationCategory: 'full-day',
      rating: 4.7,
      groupSize: 'Up to 6',
      location: 'Swiss Alps',
      featured: false,
      slug: 'swiss-alps-hiking',
      categories: ['adventure', 'nature', 'hiking'],
    },
    {
      id: 4,
      title: 'Yosemite Valley Exploration',
      description: 'Discover the natural wonders of Yosemite National Park with a certified wilderness guide.',
      image: 'https://images.unsplash.com/photo-1426604966848-d7adac402bff?w=500&auto=format&fit=crop&q=80',
      price: 199,
      duration: 'Full day',
      durationCategory: 'full-day',
      rating: 4.9,
      groupSize: 'Up to 10',
      location: 'California, USA',
      featured: true,
      slug: 'yosemite-valley-exploration',
      categories: ['nature', 'hiking', 'photography'],
    },
    {
      id: 5,
      title: 'Tokyo Street Food Tour',
      description: 'Sample a variety of delicious street foods in the vibrant neighborhoods of Tokyo.',
      image: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?w=500&auto=format&fit=crop&q=80',
      price: 75,
      duration: '3 hours',
      durationCategory: 'half-day',
      rating: 4.6,
      groupSize: 'Up to 8',
      location: 'Tokyo, Japan',
      featured: false,
      slug: 'tokyo-street-food',
      categories: ['food', 'culinary', 'walking'],
    },
    {
      id: 6,
      title: 'Serengeti Safari Experience',
      description: 'Witness the incredible wildlife of the Serengeti on this unforgettable safari adventure.',
      image: 'https://images.unsplash.com/photo-1523805009345-7448845a9e53?w=500&auto=format&fit=crop&q=80',
      price: 349,
      duration: '2 days',
      durationCategory: 'multi-day',
      rating: 4.9,
      groupSize: 'Up to 6',
      location: 'Serengeti, Tanzania',
      featured: true,
      slug: 'serengeti-safari',
      categories: ['wildlife', 'nature', 'photography'],
    },
    {
      id: 7,
      title: 'Venice Gondola Experience',
      description: 'Glide through the charming canals of Venice on a traditional gondola with a skilled gondolier.',
      image: 'https://images.unsplash.com/photo-1511193111202-1555063ad5e1?w=500&auto=format&fit=crop&q=80',
      price: 80,
      duration: '1 hour',
      durationCategory: 'short',
      rating: 4.5,
      groupSize: 'Up to 6',
      location: 'Venice, Italy',
      featured: false,
      slug: 'venice-gondola',
      categories: ['cultural', 'romantic'],
    },
    {
      id: 8,
      title: 'Machu Picchu Trek',
      description: 'Hike the legendary Inca Trail to the ancient citadel of Machu Picchu with expert guides.',
      image: 'https://images.unsplash.com/photo-1526392060635-9d6019884377?w=500&auto=format&fit=crop&q=80',
      price: 399,
      duration: '4 days',
      durationCategory: 'multi-day',
      rating: 4.8,
      groupSize: 'Up to 12',
      location: 'Cusco, Peru',
      featured: true,
      slug: 'machu-picchu-trek',
      categories: ['adventure', 'hiking', 'historical'],
    },
  ];

  // Filter tours based on criteria
  const filteredTours = toursData.filter(tour => {
    // Filter by price range
    const isPriceInRange = tour.price >= priceRange[0] && tour.price <= priceRange[1];
    
    // Filter by search term
    const isSearchMatch = searchTerm === "" || 
      tour.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
      tour.location.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Filter by duration
    const isDurationMatch = selectedDuration.length === 0 || 
      selectedDuration.includes(tour.durationCategory);
    
    return isPriceInRange && isSearchMatch && isDurationMatch;
  });

  const handleDurationToggle = (duration: string) => {
    setSelectedDuration(prev => 
      prev.includes(duration) 
        ? prev.filter(d => d !== duration) 
        : [...prev, duration]
    );
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-8 pb-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Find Your Perfect Tour</h1>
            <p className="text-gray-600 max-w-3xl mx-auto">
              From cultural experiences and adventure excursions to culinary journeys and wildlife encounters,
              discover tours that match your interests and travel style.
            </p>
          </div>
          
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Filters Sidebar */}
            <div className="lg:w-1/4">
              <div className="bg-white p-6 rounded-lg shadow-md sticky top-24">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold">Filters</h2>
                  <Filter className="h-5 w-5 text-gray-500" />
                </div>
                
                {/* Search */}
                <div className="mb-6">
                  <Label htmlFor="search" className="text-sm font-medium block mb-2">Search Tours</Label>
                  <Input
                    id="search"
                    placeholder="e.g. Kyoto, hiking, safari..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                
                {/* Price Range */}
                <div className="mb-6">
                  <Label className="text-sm font-medium block mb-2">Price Range</Label>
                  <Slider
                    defaultValue={[0, 500]}
                    max={500}
                    step={10}
                    value={priceRange}
                    onValueChange={setPriceRange}
                    className="my-4"
                  />
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">${priceRange[0]}</span>
                    <span className="text-sm text-gray-600">${priceRange[1]}</span>
                  </div>
                </div>
                
                <Separator className="mb-6" />
                
                {/* Duration */}
                <div className="mb-6">
                  <Label className="text-sm font-medium block mb-2">Duration</Label>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Button
                        variant={selectedDuration.includes('short') ? "default" : "outline"}
                        size="sm"
                        className={selectedDuration.includes('short') ? "bg-travel-blue hover:bg-travel-blue/90" : ""}
                        onClick={() => handleDurationToggle('short')}
                      >
                        Short (1-2 hours)
                      </Button>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button
                        variant={selectedDuration.includes('half-day') ? "default" : "outline"}
                        size="sm"
                        className={selectedDuration.includes('half-day') ? "bg-travel-blue hover:bg-travel-blue/90" : ""}
                        onClick={() => handleDurationToggle('half-day')}
                      >
                        Half-day (3-5 hours)
                      </Button>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button
                        variant={selectedDuration.includes('full-day') ? "default" : "outline"}
                        size="sm"
                        className={selectedDuration.includes('full-day') ? "bg-travel-blue hover:bg-travel-blue/90" : ""}
                        onClick={() => handleDurationToggle('full-day')}
                      >
                        Full-day (6-8 hours)
                      </Button>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button
                        variant={selectedDuration.includes('multi-day') ? "default" : "outline"}
                        size="sm"
                        className={selectedDuration.includes('multi-day') ? "bg-travel-blue hover:bg-travel-blue/90" : ""}
                        onClick={() => handleDurationToggle('multi-day')}
                      >
                        Multi-day
                      </Button>
                    </div>
                  </div>
                </div>
                
                <Separator className="mb-6" />
                
                {/* Reset Filters */}
                <Button 
                  variant="outline" 
                  className="w-full border-travel-blue text-travel-blue hover:bg-travel-blue hover:text-white"
                  onClick={() => {
                    setPriceRange([0, 500]);
                    setSearchTerm("");
                    setSelectedDuration([]);
                  }}
                >
                  Reset Filters
                </Button>
              </div>
            </div>
            
            {/* Tours Grid */}
            <div className="lg:w-3/4">
              <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center">
                <div>
                  <h2 className="text-xl font-semibold mb-1">
                    {filteredTours.length} {filteredTours.length === 1 ? 'Tour' : 'Tours'} Available
                  </h2>
                  <p className="text-gray-600 text-sm">Find your next adventure</p>
                </div>
                <div className="mt-3 sm:mt-0">
                  <Button variant="ghost" className="text-travel-blue border border-travel-blue">
                    Sort by: Popular <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              {filteredTours.length === 0 ? (
                <div className="bg-gray-50 p-8 rounded-lg text-center">
                  <h3 className="text-xl font-medium mb-2">No tours match your filters</h3>
                  <p className="text-gray-600 mb-4">Try adjusting your search criteria or filters</p>
                  <Button 
                    variant="outline" 
                    className="border-travel-blue text-travel-blue hover:bg-travel-blue hover:text-white"
                    onClick={() => {
                      setPriceRange([0, 500]);
                      setSearchTerm("");
                      setSelectedDuration([]);
                    }}
                  >
                    Reset Filters
                  </Button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                  {filteredTours.map((tour) => (
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
              )}
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Tours;
