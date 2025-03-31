
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Globe, Mail, Map, Heart, Compass, Users } from 'lucide-react';

const About = () => {
  // Team members data
  const teamMembers = [
    {
      id: 1,
      name: 'Sarah Johnson',
      role: 'Founder & CEO',
      bio: 'Travel enthusiast with over 15 years of experience in the tourism industry. Sarah founded Touriverse to help travelers discover authentic experiences around the world.',
      image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=500&auto=format&fit=crop&q=80',
      initials: 'SJ',
    },
    {
      id: 2,
      name: 'Michael Chen',
      role: 'Head of Destinations',
      bio: 'Former travel journalist and photographer who has visited over 50 countries. Michael curates our destination collections to showcase the world\'s most remarkable places.',
      image: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=500&auto=format&fit=crop&q=80',
      initials: 'MC',
    },
    {
      id: 3,
      name: 'Elena Rodriguez',
      role: 'Lead Tour Designer',
      bio: 'With a background in cultural anthropology, Elena creates immersive tour experiences that connect travelers with local traditions, cuisine, and communities.',
      image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=500&auto=format&fit=crop&q=80',
      initials: 'ER',
    },
    {
      id: 4,
      name: 'James Wilson',
      role: 'Customer Experience Manager',
      bio: 'James ensures that every Touriverse customer receives exceptional service from the booking process through the completion of their journey.',
      image: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=500&auto=format&fit=crop&q=80',
      initials: 'JW',
    },
  ];

  // Values data
  const values = [
    {
      icon: <Heart className="h-6 w-6 text-travel-blue" />,
      title: 'Passion for Travel',
      description: 'We believe travel transforms lives and are passionate about creating meaningful journeys.',
    },
    {
      icon: <Map className="h-6 w-6 text-travel-blue" />,
      title: 'Authentic Experiences',
      description: 'We prioritize authentic, immersive experiences that connect travelers with local cultures.',
    },
    {
      icon: <Users className="h-6 w-6 text-travel-blue" />,
      title: 'Community Impact',
      description: 'We partner with local communities to ensure tourism benefits the places we visit.',
    },
    {
      icon: <Compass className="h-6 w-6 text-travel-blue" />,
      title: 'Responsible Tourism',
      description: 'We promote sustainable travel practices that protect our planet for future generations.',
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative py-20 bg-gradient-to-b from-blue-50 to-white">
          <div className="container mx-auto px-4 text-center">
            <Badge className="mb-4">Our Story</Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">About Touriverse</h1>
            <p className="text-gray-600 max-w-3xl mx-auto text-lg">
              We're a team of passionate travelers, tourism experts, and technology enthusiasts dedicated 
              to helping you discover the world's most extraordinary destinations and experiences.
            </p>
          </div>
        </section>
        
        {/* Mission Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="flex flex-col lg:flex-row items-center gap-12">
              <div className="lg:w-1/2">
                <img 
                  src="https://images.unsplash.com/photo-1483450388369-9ed95738483c?w=500&auto=format&fit=crop&q=80" 
                  alt="Our Mission" 
                  className="rounded-lg shadow-lg w-full h-auto object-cover aspect-video"
                />
              </div>
              <div className="lg:w-1/2">
                <Badge className="mb-2">Our Mission</Badge>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Connecting Travelers with Extraordinary Experiences
                </h2>
                <p className="text-gray-600 mb-6">
                  At Touriverse, our mission is to transform how people discover and experience the world. 
                  We believe that travel has the power to broaden perspectives, foster cultural understanding, 
                  and create lasting memories.
                </p>
                <p className="text-gray-600">
                  Founded in 2018, we've helped thousands of travelers explore iconic landmarks, hidden gems, 
                  and authentic cultural experiences across the globe. Our curated selection of destinations 
                  and tours reflects our commitment to quality, authenticity, and responsible tourism.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Values Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <Badge className="mb-2">Our Values</Badge>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                What Drives Us
              </h2>
              <p className="text-gray-600 max-w-3xl mx-auto">
                These core principles guide everything we do, from selecting our destinations and tours 
                to how we interact with customers, partners, and communities around the world.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => (
                <Card key={index} className="border-t-4 border-t-travel-blue">
                  <CardContent className="p-6">
                    <div className="mb-4">{value.icon}</div>
                    <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
                    <p className="text-gray-600">{value.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
        
        {/* Team Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <Badge className="mb-2">Our Team</Badge>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Meet the People Behind Touriverse
              </h2>
              <p className="text-gray-600 max-w-3xl mx-auto">
                Our diverse team brings together expertise in travel, technology, customer service, 
                and sustainable tourism to create exceptional travel experiences.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {teamMembers.map((member) => (
                <Card key={member.id} className="overflow-hidden">
                  <div className="p-6 text-center">
                    <Avatar className="h-24 w-24 mx-auto mb-4">
                      <AvatarImage src={member.image} alt={member.name} />
                      <AvatarFallback>{member.initials}</AvatarFallback>
                    </Avatar>
                    <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
                    <p className="text-travel-blue mb-4">{member.role}</p>
                    <p className="text-gray-600 text-sm">{member.bio}</p>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>
        
        {/* Stats Section */}
        <section className="py-16 bg-travel-blue text-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-4xl font-bold mb-2">50+</div>
                <div className="text-xl">Countries</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">500+</div>
                <div className="text-xl">Tours Available</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">15,000+</div>
                <div className="text-xl">Happy Travelers</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">4.9/5</div>
                <div className="text-xl">Average Rating</div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Contact CTA */}
        <section className="py-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Want to Learn More?
            </h2>
            <p className="text-gray-600 max-w-3xl mx-auto mb-8">
              We'd love to hear from you! Whether you have questions about our tours, want to partner with us, 
              or are interested in joining our team, please don't hesitate to reach out.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a href="/contact" className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-md bg-travel-blue text-white hover:bg-travel-blue/90 transition-colors">
                <Mail className="h-5 w-5" />
                Contact Us
              </a>
              <a href="mailto:info@touriverse.com" className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-md border border-travel-blue text-travel-blue hover:bg-travel-blue hover:text-white transition-colors">
                <Globe className="h-5 w-5" />
                info@touriverse.com
              </a>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default About;
