
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Star, Clock, Users, MapPin, Calendar, ChevronRight, Heart, Share2, Info, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from '@/components/ui/separator';
import { toast } from "@/hooks/use-toast";
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

interface TourDetails {
  id: number;
  title: string;
  description: string;
  fullDescription: string;
  images: string[];
  price: number;
  duration: string;
  rating: number;
  reviewCount: number;
  groupSize: string;
  location: string;
  country: string;
  featured: boolean;
  included: string[];
  notIncluded: string[];
  itinerary: {day: string; title: string; description: string;}[];
  highlights: string[];
  latitude: number;
  longitude: number;
  slug: string;
  availableDates: string[];
}

const tours: TourDetails[] = [
  {
    id: 1,
    title: 'Ancient Wonders of Kyoto',
    description: 'Explore the historic temples and gardens of Kyoto with an expert local guide.',
    fullDescription: 'Immerse yourself in the rich cultural heritage of Kyoto, Japan's ancient capital. This guided tour takes you through the city's most iconic temples, shrines, and traditional gardens, offering insights into Japanese history, art, and spirituality. Walk through the thousands of vermilion torii gates at Fushimi Inari Shrine, visit the golden pavilion of Kinkaku-ji, and experience the tranquility of Arashiyama's bamboo grove. Our expert local guides provide fascinating historical context and help you discover hidden gems off the typical tourist path.',
    images: [
      'https://images.unsplash.com/photo-1466442929976-97f336a657be?w=1600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1493780474015-ba834fd0ce2f?w=1600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=1600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1524413840807-0c3cb6fa808d?w=1600&auto=format&fit=crop&q=80',
    ],
    price: 129,
    duration: '5 hours',
    rating: 4.9,
    reviewCount: 247,
    groupSize: 'Up to 8',
    location: 'Kyoto',
    country: 'Japan',
    featured: true,
    included: [
      'Professional English-speaking guide',
      'Transportation between sites',
      'Entrance fees to all temples and shrines',
      'Tea ceremony experience',
      'Bottled water',
    ],
    notIncluded: [
      'Hotel pickup and drop-off',
      'Food and additional drinks',
      'Gratuities (optional)',
      'Personal expenses',
    ],
    itinerary: [
      {
        day: 'Stop 1',
        title: 'Fushimi Inari Shrine',
        description: 'Begin your journey at the iconic Fushimi Inari Shrine, famous for its thousands of vermilion torii gates. Explore the mountain trails and enjoy panoramic views of Kyoto.'
      },
      {
        day: 'Stop 2',
        title: 'Kinkaku-ji (Golden Pavilion)',
        description: 'Visit the stunning Zen temple covered in gold leaf, set alongside a reflective pond that creates perfect photo opportunities.'
      },
      {
        day: 'Stop 3',
        title: 'Traditional Tea Ceremony',
        description: 'Experience an authentic tea ceremony in a historic tea house, learning about this important cultural tradition from a master.'
      },
      {
        day: 'Stop 4',
        title: 'Arashiyama Bamboo Grove',
        description: 'Walk through the ethereal bamboo forest and visit nearby Tenryu-ji Temple, a UNESCO World Heritage site.'
      },
      {
        day: 'Stop 5',
        title: 'Gion District',
        description: 'Conclude your tour in Kyoto's famous geisha district, with its traditional wooden machiya houses and atmospheric streets.'
      }
    ],
    highlights: [
      'Walk through thousands of vibrant torii gates at Fushimi Inari Shrine',
      'Visit the magnificent gold-covered Kinkaku-ji Temple',
      'Experience a traditional Japanese tea ceremony',
      'Explore the otherworldly Arashiyama Bamboo Grove',
      'Discover the historic Gion district, known for geisha traditions',
    ],
    latitude: 35.0116,
    longitude: 135.7681,
    slug: 'ancient-wonders-kyoto',
    availableDates: [
      '2023-11-15',
      '2023-11-17',
      '2023-11-20',
      '2023-11-22',
      '2023-11-25',
      '2023-11-30',
      '2023-12-02',
      '2023-12-05',
    ]
  },
  {
    id: 2,
    title: 'Santorini Sunset Cruise',
    description: 'Sail around Santorini\'s caldera and enjoy the spectacular sunset views.',
    fullDescription: 'Experience the magic of Santorini from the water on this unforgettable sunset cruise. Sail along the island's caldera, formed by one of the largest volcanic eruptions in recorded history. Visit the natural hot springs for a therapeutic soak, explore secluded beaches accessible only by boat, and anchor near the Red and White beaches for swimming and snorkeling in crystal-clear waters. As the day comes to a close, witness the famous Santorini sunset from the best vantage point possible – the sea. Enjoy Greek wine and a freshly prepared dinner on board as the sky transforms into a palette of oranges, pinks, and purples.',
    images: [
      'https://images.unsplash.com/photo-1492321936769-b49830bc1d1e?w=1600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=1600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?w=1600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1601581875039-e899893d520c?w=1600&auto=format&fit=crop&q=80',
    ],
    price: 89,
    duration: '3 hours',
    rating: 4.8,
    reviewCount: 186,
    groupSize: 'Up to 12',
    location: 'Santorini',
    country: 'Greece',
    featured: false,
    included: [
      'Sunset cruise in traditional wooden or catamaran vessel',
      'Professional crew and captain',
      'Greek wine and refreshments',
      'Full dinner with local specialties',
      'Snorkeling equipment',
      'Towels',
      'Wi-Fi on board',
    ],
    notIncluded: [
      'Hotel transfers (available at additional cost)',
      'Additional alcoholic beverages beyond what's provided',
      'Gratuities (optional)',
      'Personal expenses',
    ],
    itinerary: [
      {
        day: 'Stop 1',
        title: 'Departure from Ammoudi Port',
        description: 'Board our traditional wooden vessel or luxury catamaran at Ammoudi Port, located below Oia village.'
      },
      {
        day: 'Stop 2',
        title: 'Volcanic Hot Springs',
        description: 'Sail to the volcanic hot springs for a therapeutic swim in the warm, mineral-rich waters known for their healing properties.'
      },
      {
        day: 'Stop 3',
        title: 'Red Beach & White Beach',
        description: 'Anchor near these famous beaches, accessible only by boat, for swimming and snorkeling in crystal-clear waters.'
      },
      {
        day: 'Stop 4',
        title: 'Greek Dinner On Board',
        description: 'Enjoy a freshly prepared dinner featuring local Greek specialties while sailing along the coastline.'
      },
      {
        day: 'Stop 5',
        title: 'Sunset Viewing',
        description: 'Position for the perfect view of Santorini's world-famous sunset from the caldera, with views of the white-washed villages perched on the cliffs.'
      }
    ],
    highlights: [
      'Witness the legendary Santorini sunset from the perfect vantage point',
      'Swim in volcanic hot springs with therapeutic properties',
      'Explore secluded beaches only accessible by boat',
      'Enjoy Greek wine and traditional cuisine on board',
      'Take stunning photos of Oia's whitewashed buildings from the sea',
    ],
    latitude: 36.4640,
    longitude: 25.3963,
    slug: 'santorini-sunset-cruise',
    availableDates: [
      '2023-11-14',
      '2023-11-16',
      '2023-11-18',
      '2023-11-21',
      '2023-11-24',
      '2023-11-28',
      '2023-12-01',
      '2023-12-04',
    ]
  },
  {
    id: 3,
    title: 'Swiss Alps Hiking Adventure',
    description: 'Trek through the breathtaking landscapes of the Swiss Alps with experienced mountain guides.',
    fullDescription: 'Experience the majesty of the Swiss Alps on this guided hiking adventure. Trek through stunning alpine landscapes featuring snow-capped peaks, emerald-green meadows, and crystal-clear mountain lakes. Our experienced mountain guides will lead you along well-established trails, sharing their knowledge of the region's unique flora, fauna, and geological formations. Enjoy a picnic lunch with panoramic views and visit charming mountain villages along the way. This moderate-difficulty hike is suitable for reasonably fit travelers who want to experience the natural beauty of Switzerland up close.',
    images: [
      'https://images.unsplash.com/photo-1482938289607-e9573fc25ebb?w=1600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1502636621341-452fa6264858?w=1600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1527006400673-b32fd1e07d0d?w=1600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1531400158697-004665595312?w=1600&auto=format&fit=crop&q=80',
    ],
    price: 159,
    duration: '7 hours',
    rating: 4.7,
    reviewCount: 153,
    groupSize: 'Up to 6',
    location: 'Swiss Alps',
    country: 'Switzerland',
    featured: false,
    included: [
      'Professional certified mountain guide',
      'Hiking equipment (poles, crampons if needed)',
      'Picnic lunch with local specialties',
      'Hot beverages and water',
      'Transportation to and from trailhead',
      'Safety equipment',
    ],
    notIncluded: [
      'Hotel pickup and drop-off',
      'Hiking boots and personal clothing',
      'Travel insurance',
      'Gratuities (optional)',
    ],
    itinerary: [
      {
        day: 'Stop 1',
        title: 'Meet at Base Camp',
        description: 'Meet your guide at our base camp for a safety briefing and equipment check before setting off on the trail.'
      },
      {
        day: 'Stop 2',
        title: 'Alpine Meadow Traverse',
        description: 'Hike through stunning flower-filled alpine meadows with views of snow-capped peaks in the distance.'
      },
      {
        day: 'Stop 3',
        title: 'Mountain Lake Picnic',
        description: 'Reach a pristine mountain lake where you'll enjoy a gourmet picnic lunch featuring local Swiss specialties.'
      },
      {
        day: 'Stop 4',
        title: 'Mountain Village Visit',
        description: 'Stop at a traditional Swiss mountain village to experience local culture and architecture.'
      },
      {
        day: 'Stop 5',
        title: 'Panoramic Vista Point',
        description: 'Climb to a spectacular viewpoint offering 360-degree panoramas of the surrounding mountains and valleys.'
      }
    ],
    highlights: [
      'Trek through pristine alpine landscapes with a certified mountain guide',
      'Enjoy panoramic views of Switzerland\'s most famous peaks',
      'Discover local flora and fauna with expert commentary',
      'Visit an authentic Swiss mountain village',
      'Savor a picnic lunch with local specialties in a scenic location',
    ],
    latitude: 46.8182,
    longitude: 8.2275,
    slug: 'swiss-alps-hiking',
    availableDates: [
      '2023-11-15',
      '2023-11-19',
      '2023-11-22',
      '2023-11-26',
      '2023-11-29',
      '2023-12-03',
      '2023-12-06',
      '2023-12-10',
    ]
  },
  {
    id: 4,
    title: 'Yosemite Valley Exploration',
    description: 'Discover the natural wonders of Yosemite National Park with a certified wilderness guide.',
    fullDescription: 'Experience the awe-inspiring beauty of Yosemite National Park on this full-day guided exploration. Discover the park's iconic attractions including Half Dome, El Capitan, and Yosemite Falls, as well as hidden gems off the beaten path. Your certified wilderness guide will share fascinating insights about the park's geology, wildlife, and conservation efforts. Enjoy moderate hikes to scenic viewpoints, take memorable photos of the dramatic landscapes, and connect with nature in one of America's most beloved national parks. This tour is perfect for nature enthusiasts and first-time visitors who want to maximize their Yosemite experience.',
    images: [
      'https://images.unsplash.com/photo-1426604966848-d7adac402bff?w=1600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1562310503-a96c2ded09a5?w=1600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1590064661010-1b5bc92b4f7c?w=1600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1551575085-45a5615b6f8f?w=1600&auto=format&fit=crop&q=80',
    ],
    price: 199,
    duration: 'Full day',
    rating: 4.9,
    reviewCount: 218,
    groupSize: 'Up to 10',
    location: 'Yosemite National Park',
    country: 'United States',
    featured: true,
    included: [
      'Professional certified wilderness guide',
      'Park entrance fees',
      'Transportation within the park',
      'Picnic lunch and snacks',
      'Bottled water',
      'Binoculars for wildlife viewing',
      'Field guides and maps',
    ],
    notIncluded: [
      'Transportation to and from Yosemite National Park',
      'Accommodation',
      'Personal hiking gear',
      'Gratuities (optional)',
      'Souvenirs and personal items',
    ],
    itinerary: [
      {
        day: 'Stop 1',
        title: 'Tunnel View',
        description: 'Begin with the iconic Tunnel View for a spectacular panorama of Yosemite Valley, El Capitan, Half Dome, and Bridalveil Fall.'
      },
      {
        day: 'Stop 2',
        title: 'Bridalveil Fall Trail',
        description: 'Take a short hike to the base of the 620-foot Bridalveil Fall, one of Yosemite's most photographed waterfalls.'
      },
      {
        day: 'Stop 3',
        title: 'El Capitan Meadow',
        description: 'Visit El Capitan Meadow for an up-close view of the largest exposed granite monolith in the world, a favorite challenge for rock climbers.'
      },
      {
        day: 'Stop 4',
        title: 'Valley Loop Trail & Picnic Lunch',
        description: 'Enjoy portions of the Valley Loop Trail with a picnic lunch amid the splendor of Yosemite Valley.'
      },
      {
        day: 'Stop 5',
        title: 'Yosemite Falls & Sentinel Bridge',
        description: 'View the magnificent Yosemite Falls and visit Sentinel Bridge for classic views of Half Dome reflected in the Merced River.'
      }
    ],
    highlights: [
      'Witness Yosemite\'s iconic landmarks including Half Dome and El Capitan',
      'Experience the thundering power of Yosemite Falls, North America\'s tallest waterfall',
      'Learn about the park\'s unique geology, wildlife, and natural history',
      'Discover hidden viewpoints away from the tourist crowds',
      'Capture stunning photographs with expert guidance on the best angles and lighting',
    ],
    latitude: 37.8651,
    longitude: -119.5383,
    slug: 'yosemite-valley-exploration',
    availableDates: [
      '2023-11-16',
      '2023-11-20',
      '2023-11-23',
      '2023-11-27',
      '2023-11-30',
      '2023-12-04',
      '2023-12-07',
      '2023-12-11',
    ]
  }
];

const TourDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [tour, setTour] = useState<TourDetails | null>(null);
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    // Simulate API fetch
    setIsLoading(true);
    setTimeout(() => {
      const foundTour = tours.find(t => t.slug === slug);
      
      if (foundTour) {
        setTour(foundTour);
        if (foundTour.availableDates && foundTour.availableDates.length > 0) {
          setSelectedDate(foundTour.availableDates[0]);
        }
      } else {
        console.error('Tour not found');
        navigate('/tours');
      }
      
      setIsLoading(false);
    }, 500);
  }, [slug, navigate]);

  const handleBookNow = () => {
    if (!selectedDate) {
      toast({
        title: "Please select a date",
        description: "You need to select a travel date before booking.",
        variant: "destructive"
      });
      return;
    }
    
    toast({
      title: "Booking Confirmed!",
      description: `Your ${tour?.title} tour is booked for ${selectedDate} with ${quantity} ${quantity === 1 ? 'person' : 'people'}.`,
    });
  };

  const handleAddToWishlist = () => {
    toast({
      title: "Added to Wishlist",
      description: `${tour?.title} has been added to your wishlist.`,
    });
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: tour?.title,
        text: tour?.description,
        url: window.location.href,
      })
      .catch((error) => console.log('Error sharing', error));
    } else {
      toast({
        title: "Share Link Copied",
        description: "Tour link copied to clipboard!",
      });
      navigator.clipboard.writeText(window.location.href);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow flex items-center justify-center">
          <div className="animate-pulse flex flex-col items-center">
            <div className="h-8 w-64 bg-gray-200 rounded mb-4"></div>
            <div className="h-4 w-32 bg-gray-200 rounded"></div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!tour) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Tour Not Found</h2>
            <p className="text-gray-600 mb-6">The tour you're looking for doesn't exist or has been removed.</p>
            <Button onClick={() => navigate('/tours')}>Browse All Tours</Button>
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
            <Button variant="link" className="p-0 h-auto text-gray-500" onClick={() => navigate('/tours')}>Tours</Button>
            <ChevronRight className="h-4 w-4 mx-1" />
            <span className="text-gray-700">{tour.title}</span>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              {/* Tour Image Carousel */}
              <Carousel className="w-full mb-6">
                <CarouselContent>
                  {tour.images.map((image, index) => (
                    <CarouselItem key={index}>
                      <div className="relative h-80 sm:h-96 md:h-[500px] w-full rounded-lg overflow-hidden">
                        <img 
                          src={image} 
                          alt={`${tour.title} - photo ${index + 1}`} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="left-2" />
                <CarouselNext className="right-2" />
              </Carousel>
              
              {/* Tour Details Tabs */}
              <Tabs defaultValue="overview" className="w-full">
                <TabsList className="w-full justify-start border-b mb-6">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="itinerary">Itinerary</TabsTrigger>
                  <TabsTrigger value="inclusions">What's Included</TabsTrigger>
                </TabsList>
                
                <TabsContent value="overview" className="animate-fade-in">
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900 mb-4">About This Tour</h2>
                      <p className="text-gray-700 whitespace-pre-line">
                        {tour.fullDescription}
                      </p>
                    </div>
                    
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-3">Highlights</h3>
                      <ul className="space-y-2">
                        {tour.highlights.map((highlight, index) => (
                          <li key={index} className="flex items-start">
                            <CheckCircle2 className="h-5 w-5 text-travel-blue mr-2 flex-shrink-0 mt-0.5" />
                            <span className="text-gray-700">{highlight}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="itinerary" className="animate-fade-in">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Tour Itinerary</h2>
                  
                  <div className="space-y-6">
                    {tour.itinerary.map((item, index) => (
                      <div key={index} className="flex">
                        <div className="mr-4 flex flex-col items-center">
                          <div className="bg-travel-blue text-white w-8 h-8 rounded-full flex items-center justify-center font-bold">
                            {index + 1}
                          </div>
                          {index < tour.itinerary.length - 1 && (
                            <div className="w-0.5 h-full bg-gray-200 my-1"></div>
                          )}
                        </div>
                        <div className="flex-1 pb-6">
                          <h3 className="text-lg font-semibold text-gray-900">{item.title}</h3>
                          <p className="text-gray-600 text-sm mb-2">{item.day}</p>
                          <p className="text-gray-700">{item.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>
                
                <TabsContent value="inclusions" className="animate-fade-in">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                        <CheckCircle2 className="h-5 w-5 text-travel-blue mr-2" />
                        What's Included
                      </h3>
                      <ul className="space-y-2">
                        {tour.included.map((item, index) => (
                          <li key={index} className="flex items-start">
                            <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                            <span className="text-gray-700">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                        <Info className="h-5 w-5 text-travel-blue mr-2" />
                        Not Included
                      </h3>
                      <ul className="space-y-2">
                        {tour.notIncluded.map((item, index) => (
                          <li key={index} className="flex items-start">
                            <span className="text-gray-700">• {item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
            
            {/* Booking Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg border border-gray-200 shadow-lg p-6 sticky top-24">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">${tour.price}</h2>
                    <p className="text-gray-500 text-sm">per person</p>
                  </div>
                  <div className="flex items-center">
                    <Star className="h-5 w-5 text-travel-yellow fill-travel-yellow" />
                    <span className="ml-1 font-semibold">{tour.rating}</span>
                    <span className="text-gray-500 text-sm ml-1">({tour.reviewCount} reviews)</span>
                  </div>
                </div>
                
                <div className="space-y-4 mb-6">
                  <div className="flex items-center">
                    <Clock className="h-5 w-5 text-gray-500 mr-3" />
                    <div>
                      <p className="text-sm text-gray-500">Duration</p>
                      <p className="font-medium">{tour.duration}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <Users className="h-5 w-5 text-gray-500 mr-3" />
                    <div>
                      <p className="text-sm text-gray-500">Group Size</p>
                      <p className="font-medium">{tour.groupSize}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <MapPin className="h-5 w-5 text-gray-500 mr-3" />
                    <div>
                      <p className="text-sm text-gray-500">Location</p>
                      <p className="font-medium">{tour.location}, {tour.country}</p>
                    </div>
                  </div>
                </div>
                
                <Separator className="my-6" />
                
                <div className="space-y-4 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Select Date
                    </label>
                    <select 
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                      className="w-full border-gray-300 rounded-md shadow-sm focus:border-travel-blue focus:ring-travel-blue"
                    >
                      <option value="">Select a Date</option>
                      {tour.availableDates.map((date) => (
                        <option key={date} value={date}>
                          {new Date(date).toLocaleDateString('en-US', {
                            weekday: 'short',
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric'
                          })}
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Number of Travelers
                    </label>
                    <div className="flex items-center">
                      <button 
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="border border-gray-300 rounded-l-md px-3 py-2 bg-gray-50 hover:bg-gray-100"
                      >
                        -
                      </button>
                      <input 
                        type="number"
                        min="1"
                        value={quantity}
                        onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                        className="w-16 border-y border-gray-300 py-2 text-center focus:outline-none focus:ring-0 focus:border-gray-300"
                      />
                      <button 
                        onClick={() => setQuantity(quantity + 1)}
                        className="border border-gray-300 rounded-r-md px-3 py-2 bg-gray-50 hover:bg-gray-100"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-between items-center mb-6">
                  <span className="text-gray-700">Total price:</span>
                  <span className="text-xl font-bold text-gray-900">${tour.price * quantity}</span>
                </div>
                
                <div className="space-y-3">
                  <Button 
                    className="w-full bg-travel-blue hover:bg-travel-blue/90"
                    onClick={handleBookNow}
                  >
                    Book Now
                  </Button>
                  
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      className="flex-1 border-travel-blue text-travel-blue hover:bg-travel-blue hover:text-white"
                      onClick={handleAddToWishlist}
                    >
                      <Heart className="h-4 w-4 mr-2" />
                      Wishlist
                    </Button>
                    
                    <Button
                      variant="outline"
                      className="flex-1 border-travel-blue text-travel-blue hover:bg-travel-blue hover:text-white"
                      onClick={handleShare}
                    >
                      <Share2 className="h-4 w-4 mr-2" />
                      Share
                    </Button>
                  </div>
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

export default TourDetail;
