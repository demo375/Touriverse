
import React, { useState } from 'react';
import { Search, Calendar, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';

const HeroSection = () => {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <section className="relative h-[600px] overflow-hidden">
      {/* Hero Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat" 
        style={{ 
          backgroundImage: 'url("https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=2000&auto=format&fit=crop&q=80")', 
          backgroundPosition: 'center 40%' 
        }}
      >
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      {/* Hero Content */}
      <div className="relative container mx-auto px-4 h-full flex flex-col justify-center">
        <div className="max-w-3xl mx-auto text-center text-white">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 animate-fade-in">
            Discover the World's Hidden Gems
          </h1>
          <p className="text-lg sm:text-xl mb-8 animate-fade-in opacity-90">
            Explore breathtaking destinations with our guided tours designed for true adventurers
          </p>
          
          {/* Search Box */}
          <div className="bg-white p-4 rounded-lg shadow-lg mx-auto max-w-2xl animate-fade-in">
            <div className="flex flex-col sm:flex-row">
              <div className="relative flex-grow mb-3 sm:mb-0">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Where do you want to go?"
                  className="pl-10 py-2.5 block w-full rounded-md border-gray-300 bg-gray-50 text-gray-900 shadow-sm focus:border-travel-blue focus:ring-travel-blue"
                />
              </div>
              
              <div className="flex flex-col sm:flex-row">
                <div className="relative flex items-center px-4 py-2.5 bg-gray-100 sm:border-l border-gray-200 mb-2 sm:mb-0">
                  <Calendar className="h-5 w-5 text-gray-500 mr-2" />
                  <span className="text-gray-600 text-sm">Any Date</span>
                </div>
                
                <div className="relative flex items-center px-4 py-2.5 bg-gray-100 border-l border-gray-200">
                  <Users className="h-5 w-5 text-gray-500 mr-2" />
                  <span className="text-gray-600 text-sm">2 Adults</span>
                </div>
                
                <Button 
                  type="submit" 
                  className="bg-travel-blue hover:bg-travel-blue/90 text-white px-6 py-2.5 mt-2 sm:mt-0 sm:ml-2 rounded-md"
                >
                  Search
                </Button>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="flex justify-center mt-12 space-x-8 sm:space-x-16">
            <div className="text-center">
              <p className="text-3xl font-bold">250+</p>
              <p className="text-sm opacity-90">Destinations</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold">10K+</p>
              <p className="text-sm opacity-90">Happy Travelers</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold">650+</p>
              <p className="text-sm opacity-90">Tours</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
