
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Search, Map, Clock, Users, Calendar } from 'lucide-react';
import { Command, CommandInput, CommandList, CommandEmpty, CommandGroup, CommandItem } from "@/components/ui/command";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type SearchResult = {
  id: number;
  type: 'destination' | 'tour';
  title: string;
  image: string;
  location: string;
  slug: string;
};

export const SearchModal = ({ isOpen, onClose }: SearchModalProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  
  // Mock search results
  const allResults: SearchResult[] = [
    {
      id: 1,
      type: 'destination',
      title: 'Kyoto',
      image: 'https://images.unsplash.com/photo-1466442929976-97f336a657be?w=500&auto=format&fit=crop&q=80',
      location: 'Japan',
      slug: 'kyoto'
    },
    {
      id: 2,
      type: 'destination',
      title: 'Santorini',
      image: 'https://images.unsplash.com/photo-1492321936769-b49830bc1d1e?w=500&auto=format&fit=crop&q=80',
      location: 'Greece',
      slug: 'santorini'
    },
    {
      id: 3,
      type: 'tour',
      title: 'Ancient Wonders of Kyoto',
      image: 'https://images.unsplash.com/photo-1466442929976-97f336a657be?w=500&auto=format&fit=crop&q=80',
      location: 'Kyoto, Japan',
      slug: 'ancient-wonders-kyoto'
    },
    {
      id: 4,
      type: 'tour',
      title: 'Santorini Sunset Cruise',
      image: 'https://images.unsplash.com/photo-1492321936769-b49830bc1d1e?w=500&auto=format&fit=crop&q=80',
      location: 'Santorini, Greece',
      slug: 'santorini-sunset-cruise'
    },
    {
      id: 5,
      type: 'destination',
      title: 'Swiss Alps',
      image: 'https://images.unsplash.com/photo-1482938289607-e9573fc25ebb?w=500&auto=format&fit=crop&q=80',
      location: 'Switzerland',
      slug: 'swiss-alps'
    },
    {
      id: 6,
      type: 'tour',
      title: 'Swiss Alps Hiking Adventure',
      image: 'https://images.unsplash.com/photo-1482938289607-e9573fc25ebb?w=500&auto=format&fit=crop&q=80',
      location: 'Swiss Alps, Switzerland',
      slug: 'swiss-alps-hiking'
    },
  ];

  // Filter results based on search query
  const filteredResults = searchQuery.length > 0 
    ? allResults.filter(result => 
        result.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        result.location.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="text-2xl">Search Touriverse</DialogTitle>
        </DialogHeader>
        
        <div className="py-4">
          <div className="relative mb-6">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
            <Input
              placeholder="Search destinations, tours, or activities..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              autoFocus
            />
          </div>
          
          <Command className="rounded-lg border shadow-md">
            <CommandInput placeholder="Type to search..." className="hidden" />
            <CommandList>
              {searchQuery.length === 0 ? (
                <div className="p-4 text-center text-gray-500">
                  <p>Start typing to search for destinations and tours</p>
                </div>
              ) : filteredResults.length === 0 ? (
                <CommandEmpty className="py-6">
                  No results found for "{searchQuery}"
                </CommandEmpty>
              ) : (
                <>
                  {filteredResults.some(r => r.type === 'destination') && (
                    <CommandGroup heading="Destinations">
                      {filteredResults
                        .filter(r => r.type === 'destination')
                        .map(result => (
                          <CommandItem key={result.id} className="cursor-pointer p-2">
                            <Link 
                              to={`/destinations/${result.slug}`}
                              className="flex items-center space-x-3 w-full"
                              onClick={onClose}
                            >
                              <img 
                                src={result.image} 
                                alt={result.title} 
                                className="h-10 w-10 object-cover rounded-md"
                              />
                              <div>
                                <p className="font-medium">{result.title}</p>
                                <p className="text-sm text-gray-500">
                                  <Map className="inline h-3 w-3 mr-1" />
                                  {result.location}
                                </p>
                              </div>
                            </Link>
                          </CommandItem>
                        ))}
                    </CommandGroup>
                  )}
                  
                  {filteredResults.some(r => r.type === 'tour') && (
                    <CommandGroup heading="Tours">
                      {filteredResults
                        .filter(r => r.type === 'tour')
                        .map(result => (
                          <CommandItem key={result.id} className="cursor-pointer p-2">
                            <Link 
                              to={`/tours/${result.slug}`}
                              className="flex items-center space-x-3 w-full"
                              onClick={onClose}
                            >
                              <img 
                                src={result.image} 
                                alt={result.title} 
                                className="h-10 w-10 object-cover rounded-md"
                              />
                              <div>
                                <p className="font-medium">{result.title}</p>
                                <p className="text-sm text-gray-500">
                                  <Map className="inline h-3 w-3 mr-1" />
                                  {result.location}
                                </p>
                              </div>
                            </Link>
                          </CommandItem>
                        ))}
                    </CommandGroup>
                  )}
                </>
              )}
            </CommandList>
          </Command>
        </div>
      </DialogContent>
    </Dialog>
  );
};
