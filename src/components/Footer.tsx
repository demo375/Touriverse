
import React from 'react';
import { Link } from 'react-router-dom';
import { Globe, Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Globe className="h-6 w-6 text-travel-blue" />
              <span className="text-xl font-bold">Touriverse</span>
            </div>
            <p className="text-gray-400 mb-4">
              Discover the world's most breathtaking destinations with our expertly crafted tours and travel experiences.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-travel-blue transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-travel-blue transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-travel-blue transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-travel-blue transition-colors">
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-white transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/destinations" className="text-gray-400 hover:text-white transition-colors">Destinations</Link>
              </li>
              <li>
                <Link to="/tours" className="text-gray-400 hover:text-white transition-colors">Tours</Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-400 hover:text-white transition-colors">About Us</Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-white transition-colors">Contact</Link>
              </li>
            </ul>
          </div>
          
          {/* Top Destinations */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Top Destinations</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/destinations/santorini-greece" className="text-gray-400 hover:text-white transition-colors">Santorini, Greece</Link>
              </li>
              <li>
                <Link to="/destinations/kyoto-japan" className="text-gray-400 hover:text-white transition-colors">Kyoto, Japan</Link>
              </li>
              <li>
                <Link to="/destinations/swiss-alps" className="text-gray-400 hover:text-white transition-colors">Swiss Alps</Link>
              </li>
              <li>
                <Link to="/destinations/bali-indonesia" className="text-gray-400 hover:text-white transition-colors">Bali, Indonesia</Link>
              </li>
              <li>
                <Link to="/destinations/machu-picchu-peru" className="text-gray-400 hover:text-white transition-colors">Machu Picchu, Peru</Link>
              </li>
            </ul>
          </div>
          
          {/* Contact Us */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex">
                <MapPin className="h-5 w-5 text-travel-blue mr-3 shrink-0" />
                <span className="text-gray-400">123 Adventure St, Travel City, TC 98765</span>
              </li>
              <li className="flex">
                <Phone className="h-5 w-5 text-travel-blue mr-3 shrink-0" />
                <span className="text-gray-400">+1 (555) 123-4567</span>
              </li>
              <li className="flex">
                <Mail className="h-5 w-5 text-travel-blue mr-3 shrink-0" />
                <span className="text-gray-400">info@touriverse.com</span>
              </li>
            </ul>
          </div>
        </div>
        
        <hr className="border-gray-800 my-8" />
        
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} Touriverse. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <Link to="/terms" className="text-gray-500 hover:text-white text-sm transition-colors">
              Terms of Service
            </Link>
            <Link to="/privacy" className="text-gray-500 hover:text-white text-sm transition-colors">
              Privacy Policy
            </Link>
            <Link to="/faq" className="text-gray-500 hover:text-white text-sm transition-colors">
              FAQ
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
