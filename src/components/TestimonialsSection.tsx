
import React from 'react';
import { Star } from 'lucide-react';

interface TestimonialProps {
  content: string;
  author: string;
  rating: number;
  avatar: string;
  location: string;
}

const Testimonial = ({ content, author, rating, avatar, location }: TestimonialProps) => {
  return (
    <div className="testimonial-card">
      <div className="flex mb-4">
        {Array.from({ length: 5 }).map((_, index) => (
          <Star 
            key={index} 
            className={`h-4 w-4 ${index < rating ? 'text-travel-yellow fill-travel-yellow' : 'text-gray-300'}`} 
          />
        ))}
      </div>
      <p className="text-gray-700 mb-4">{content}</p>
      <div className="flex items-center">
        <img 
          src={avatar} 
          alt={author} 
          className="h-12 w-12 rounded-full object-cover mr-4" 
        />
        <div>
          <h4 className="font-semibold text-gray-900">{author}</h4>
          <p className="text-gray-500 text-sm">{location}</p>
        </div>
      </div>
    </div>
  );
};

const TestimonialsSection = () => {
  const testimonials = [
    {
      id: 1,
      content: "The Santorini sunset cruise was absolutely magical. Our guide knew all the best spots and the small group size made it feel intimate and special.",
      author: "Emma Watson",
      rating: 5,
      avatar: "https://randomuser.me/api/portraits/women/44.jpg",
      location: "London, UK",
    },
    {
      id: 2,
      content: "Hiking in the Swiss Alps was a life-changing experience. The views were breathtaking and our guide was incredibly knowledgeable about the local flora and fauna.",
      author: "James Rodriguez",
      rating: 5,
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
      location: "Toronto, Canada",
    },
    {
      id: 3,
      content: "The Kyoto temple tour was the highlight of our Japan trip. We got to see places we would have never found on our own, and learned so much about Japanese culture.",
      author: "Sarah Chen",
      rating: 4,
      avatar: "https://randomuser.me/api/portraits/women/66.jpg",
      location: "Sydney, Australia",
    },
  ];

  return (
    <section className="py-16 bg-travel-lightGray">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-3">What Our Travelers Say</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Don't just take our word for it - hear from travelers who've experienced our tours firsthand.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <Testimonial
              key={testimonial.id}
              content={testimonial.content}
              author={testimonial.author}
              rating={testimonial.rating}
              avatar={testimonial.avatar}
              location={testimonial.location}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
