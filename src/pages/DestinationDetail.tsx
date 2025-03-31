
import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { 
  MapPin, 
  Globe, 
  Calendar, 
  Users, 
  Camera, 
  ChevronRight, 
  Clock, 
  ArrowRight,
  CheckCircle2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const DestinationDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  
  // In a real app, you would fetch this data from an API
  const destinations = [
    {
      id: 1,
      title: 'Kyoto',
      description: 'Experience the perfect blend of traditional Japan and modern amenities in this cultural capital with hundreds of temples, shrines, and gardens.',
      fullDescription: `Kyoto, once the capital of Japan for more than a thousand years, is a city that beautifully preserves the heart and soul of traditional Japanese culture. Walking through its streets feels like stepping back in time, with over 1,600 Buddhist temples, 400 Shinto shrines, and 17 UNESCO World Heritage sites.

The city is known for its distinct seasons, each offering a unique perspective on its beauty. Spring brings cherry blossoms that transform temple gardens into pink wonderlands. Summer offers lush greenery and fascinating festivals. Autumn paints the landscape in vibrant reds and golds. Winter dusts the temples with snow, creating serene, postcard-perfect scenes.

Beyond its historical treasures, Kyoto offers visitors a chance to experience authentic Japanese traditions firsthand. You can participate in a traditional tea ceremony, witness the grace of geisha in the Gion district, or find inner peace at a Zen meditation session. The city's traditional wooden machiya houses have been lovingly preserved, many now serving as shops, restaurants, and accommodations.`,
      image: 'https://images.unsplash.com/photo-1466442929976-97f336a657be?w=500&auto=format&fit=crop&q=80',
      images: [
        'https://images.unsplash.com/photo-1493780474015-ba834fd0ce2f?w=500&auto=format&fit=crop&q=80',
        'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=500&auto=format&fit=crop&q=80',
        'https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=500&auto=format&fit=crop&q=80',
        'https://images.unsplash.com/photo-1524413840807-0c3cb6fa808d?w=500&auto=format&fit=crop&q=80',
      ],
      country: 'Japan',
      continent: 'Asia',
      attractions: [
        'Fushimi Inari Shrine', 
        'Arashiyama Bamboo Grove', 
        'Kinkaku-ji Temple', 
        'Gion District',
        'Philosophers Path',
        'Nijo Castle',
        'Kyoto Imperial Palace',
        'Nishiki Market'
      ],
      bestTimeToVisit: 'Spring (March to May) for cherry blossoms and Fall (October to November) for autumn colors',
      language: 'Japanese',
      currency: 'Japanese Yen (JPY)',
      weather: 'Four distinct seasons with mild springs, hot and humid summers, beautiful autumns, and cold winters',
      food: ['Kyoto-style sushi', 'Kaiseki (traditional multi-course dinner)', 'Yudofu (tofu hot pot)', 'Matcha desserts'],
      transportation: ['Subway', 'City buses', 'Rental bicycles', 'Taxis'],
      accommodations: ['Traditional ryokans', 'Modern hotels', 'Machiya stay', 'Budget hostels'],
      tips: [
        'Purchase a bus day pass for unlimited travel',
        'Visit popular temples early in the morning to avoid crowds',
        'Rent a bicycle to explore the city at your own pace',
        'Learn a few basic Japanese phrases before your trip'
      ],
      tours: [
        {
          id: 1,
          title: 'Ancient Wonders of Kyoto',
          duration: '5 hours',
          price: 129,
          rating: 4.9,
          slug: 'ancient-wonders-kyoto'
        },
        {
          id: 2,
          title: 'Kyoto Food & Culture Tour',
          duration: '3 hours',
          price: 79,
          rating: 4.8,
          slug: 'kyoto-food-culture'
        },
        {
          id: 3,
          title: 'Geisha Districts Night Walk',
          duration: '2 hours',
          price: 65,
          rating: 4.7,
          slug: 'geisha-districts-night'
        }
      ],
      featured: true,
      slug: 'kyoto',
      latitude: 35.0116,
      longitude: 135.7681
    },
    {
      id: 2,
      title: 'Santorini',
      description: 'Discover the iconic white-washed buildings with blue domes, perched on cliffs overlooking the brilliant blue Aegean Sea.',
      fullDescription: `Santorini, formed by a massive volcanic eruption around 3,600 years ago, is one of the most instantly recognizable destinations in the world. The island's crescent shape embraces the vast caldera, a flooded volcanic crater that offers some of the most spectacular views on the planet.

The island's iconic architecture features white-washed cubic buildings adorned with vibrant blue domes, cascading down the steep cliffs. This distinctive Cycladic style creates the perfect contrast against the deep blue of the Aegean Sea, resulting in the postcard-perfect images that have made Santorini famous worldwide.

Santorini offers much more than just breathtaking views. History enthusiasts can explore the ancient site of Akrotiri, a Minoan Bronze Age settlement preserved in volcanic ash like a Greek Pompeii. Wine lovers can sample the island's unique varieties, grown in volcanic soil using a distinctive "basket" growing method to protect grapes from strong winds.

The island's magical sunsets, best viewed from the village of Oia, attract travelers from across the globe. As the sun dips below the horizon, the whitewashed buildings are bathed in golden light, creating an unforgettable spectacle that epitomizes the romantic allure of the Greek Islands.`,
      image: 'https://images.unsplash.com/photo-1492321936769-b49830bc1d1e?w=500&auto=format&fit=crop&q=80',
      images: [
        'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=500&auto=format&fit=crop&q=80',
        'https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?w=500&auto=format&fit=crop&q=80',
        'https://images.unsplash.com/photo-1601581875039-e899893d520c?w=500&auto=format&fit=crop&q=80',
        'https://images.unsplash.com/photo-1613395878682-ac393aff6015?w=500&auto=format&fit=crop&q=80',
      ],
      country: 'Greece',
      continent: 'Europe',
      attractions: [
        'Oia Sunset',
        'Fira',
        'Red Beach',
        'Akrotiri Archaeological Site',
        'Ancient Thera',
        'Ammoudi Bay',
        'Perissa Black Sand Beach',
        'Santo Wines Winery'
      ],
      bestTimeToVisit: 'Late April to early June, or September to early October for fewer crowds and pleasant weather',
      language: 'Greek',
      currency: 'Euro (EUR)',
      weather: 'Mediterranean climate with hot, dry summers and mild winters',
      food: ['Fresh seafood', 'Fava (yellow split pea puree)', 'Tomatokeftedes (tomato fritters)', 'Local wines'],
      transportation: ['Local buses', 'Rental cars', 'ATVs', 'Taxis'],
      accommodations: ['Luxury cave hotels', 'Boutique cliff-side villas', 'Beach resorts', 'Budget apartments'],
      tips: [
        'Book accommodations well in advance, especially for summer',
        'Wear comfortable shoes for walking the steep streets',
        'Reserve a sunset dinner spot in Oia at least 1-2 weeks ahead',
        'Consider visiting in shoulder season for better prices and fewer crowds'
      ],
      tours: [
        {
          id: 1,
          title: 'Santorini Sunset Cruise',
          duration: '3 hours',
          price: 89,
          rating: 4.8,
          slug: 'santorini-sunset-cruise'
        },
        {
          id: 2,
          title: 'Volcanic Islands Tour',
          duration: '6 hours',
          price: 129,
          rating: 4.7,
          slug: 'volcanic-islands-tour'
        },
        {
          id: 3,
          title: 'Wine Tasting Experience',
          duration: '4 hours',
          price: 79,
          rating: 4.9,
          slug: 'santorini-wine-tasting'
        }
      ],
      featured: true,
      slug: 'santorini',
      latitude: 36.4640,
      longitude: 25.3963
    }
  ];

  const destination = destinations.find(d => d.slug === slug);

  if (!destination) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Destination Not Found</h2>
            <p className="text-gray-600 mb-6">The destination you're looking for doesn't exist or has been removed.</p>
            <Button onClick={() => navigate('/destinations')}>Browse All Destinations</Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-4 pb-16">
        <div className="container mx-auto px-4">
          {/* Breadcrumbs */}
          <div className="flex items-center text-sm text-gray-500 mb-4">
            <Button variant="link" className="p-0 h-auto text-gray-500" onClick={() => navigate('/')}>Home</Button>
            <ChevronRight className="h-4 w-4 mx-1" />
            <Button variant="link" className="p-0 h-auto text-gray-500" onClick={() => navigate('/destinations')}>Destinations</Button>
            <ChevronRight className="h-4 w-4 mx-1" />
            <span className="text-gray-700">{destination.title}</span>
          </div>
          
          {/* Hero Section */}
          <div className="relative h-[30vh] md:h-[50vh] lg:h-[60vh] w-full rounded-lg overflow-hidden mb-8">
            <img 
              src={destination.image} 
              alt={destination.title} 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
            <div className="absolute bottom-0 left-0 p-6 md:p-8 text-white">
              <div className="flex items-center mb-2">
                <Globe className="h-5 w-5 mr-2" />
                <span className="font-medium">{destination.continent}</span>
              </div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-2">{destination.title}, {destination.country}</h1>
              <p className="max-w-2xl text-white/90">{destination.description}</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <Tabs defaultValue="overview" className="w-full">
                <TabsList className="w-full justify-start border-b mb-6">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="attractions">Attractions</TabsTrigger>
                  <TabsTrigger value="info">Travel Info</TabsTrigger>
                  <TabsTrigger value="tips">Travel Tips</TabsTrigger>
                </TabsList>
                
                <TabsContent value="overview" className="animate-fade-in">
                  <div className="space-y-8">
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900 mb-4">About {destination.title}</h2>
                      <p className="text-gray-700 whitespace-pre-line leading-relaxed">
                        {destination.fullDescription}
                      </p>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {destination.images.map((image, index) => (
                        <div key={index} className="aspect-square rounded-lg overflow-hidden">
                          <img src={image} alt={`${destination.title} ${index + 1}`} className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
                        </div>
                      ))}
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="attractions" className="animate-fade-in">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Top Attractions in {destination.title}</h2>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {destination.attractions.map((attraction, index) => (
                      <Card key={index}>
                        <CardContent className="p-6">
                          <div className="flex items-start">
                            <div className="flex-shrink-0 bg-travel-blue/10 text-travel-blue rounded-full w-10 h-10 flex items-center justify-center mr-4">
                              <span className="font-bold">{index + 1}</span>
                            </div>
                            <div>
                              <h3 className="font-semibold text-gray-900 mb-1">{attraction}</h3>
                              <p className="text-gray-600 text-sm">Popular attraction in {destination.title}</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>
                
                <TabsContent value="info" className="animate-fade-in">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Travel Information</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 flex items-center mb-3">
                          <Calendar className="h-5 w-5 text-travel-blue mr-2" />
                          Best Time to Visit
                        </h3>
                        <p className="text-gray-700">{destination.bestTimeToVisit}</p>
                      </div>
                      
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 flex items-center mb-3">
                          <Globe className="h-5 w-5 text-travel-blue mr-2" />
                          Language
                        </h3>
                        <p className="text-gray-700">{destination.language}</p>
                      </div>
                      
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 flex items-center mb-3">
                          <Clock className="h-5 w-5 text-travel-blue mr-2" />
                          Weather
                        </h3>
                        <p className="text-gray-700">{destination.weather}</p>
                      </div>
                    </div>
                    
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 flex items-center mb-3">
                          <Users className="h-5 w-5 text-travel-blue mr-2" />
                          Local Transportation
                        </h3>
                        <div className="flex flex-wrap gap-2">
                          {destination.transportation.map((item, index) => (
                            <Badge key={index} variant="secondary" className="font-normal">
                              {item}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 flex items-center mb-3">
                          <Camera className="h-5 w-5 text-travel-blue mr-2" />
                          Local Cuisine
                        </h3>
                        <ul className="space-y-1 list-disc list-inside text-gray-700">
                          {destination.food.map((item, index) => (
                            <li key={index}>{item}</li>
                          ))}
                        </ul>
                      </div>
                      
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 flex items-center mb-3">
                          <MapPin className="h-5 w-5 text-travel-blue mr-2" />
                          Accommodation Types
                        </h3>
                        <div className="flex flex-wrap gap-2">
                          {destination.accommodations.map((item, index) => (
                            <Badge key={index} variant="outline" className="font-normal">
                              {item}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="tips" className="animate-fade-in">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Travel Tips for {destination.title}</h2>
                  
                  <div className="space-y-4">
                    {destination.tips.map((tip, index) => (
                      <div key={index} className="flex items-start">
                        <CheckCircle2 className="h-5 w-5 text-travel-blue mr-3 mt-0.5 flex-shrink-0" />
                        <p className="text-gray-700">{tip}</p>
                      </div>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </div>
            
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg border border-gray-200 shadow-lg p-6 sticky top-24">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Popular Tours in {destination.title}</h2>
                
                <div className="space-y-4">
                  {destination.tours.map((tour) => (
                    <div key={tour.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                      <h3 className="font-semibold text-gray-900 mb-1">{tour.title}</h3>
                      <div className="flex justify-between items-center mb-2">
                        <div className="flex items-center text-sm text-gray-500">
                          <Clock className="h-4 w-4 mr-1" />
                          {tour.duration}
                        </div>
                        <div className="flex items-center">
                          <span className="text-travel-yellow font-bold">${tour.price}</span>
                          <span className="text-gray-500 text-sm">/person</span>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <div className="flex items-center text-sm">
                          <span className="text-travel-yellow font-medium">{tour.rating}</span>
                          <span className="text-gray-500">/5</span>
                        </div>
                        <Button 
                          variant="link" 
                          className="p-0 h-auto text-travel-blue font-medium"
                          onClick={() => navigate(`/tours/${tour.slug}`)}
                        >
                          View Tour
                          <ArrowRight className="h-4 w-4 ml-1" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
                
                <Separator className="my-6" />
                
                <div className="text-center">
                  <h3 className="font-semibold text-gray-900 mb-4">Explore More</h3>
                  <Button 
                    className="w-full bg-travel-blue hover:bg-travel-blue/90"
                    onClick={() => navigate('/tours')}
                  >
                    View All Tours
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default DestinationDetail;
