
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, ChevronDown, Globe, Search, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';
import { LoginModal, SignupModal } from './AuthModals';
import { SearchModal } from './SearchModal';

interface NavItemProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

const NavItem = ({ href, children, className }: NavItemProps) => (
  <Link 
    to={href} 
    className={cn("text-gray-700 hover:text-travel-blue transition-colors text-base font-medium", className)}
  >
    {children}
  </Link>
);

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSignupOpen, setIsSignupOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const isMobile = useIsMobile();

  const handleOpenSearch = () => {
    setIsSearchOpen(true);
    if (isMobile) setIsMenuOpen(false);
  };

  const handleOpenLogin = () => {
    setIsLoginOpen(true);
    if (isMobile) setIsMenuOpen(false);
  };

  const handleOpenSignup = () => {
    setIsSignupOpen(true);
    if (isMobile) setIsMenuOpen(false);
  };

  return (
    <>
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md shadow-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center">
              <Link to="/" className="flex items-center space-x-2">
                <Globe className="h-8 w-8 text-travel-blue" />
                <span className="text-xl font-bold text-gray-900">Touriverse</span>
              </Link>
            </div>

            {/* Desktop Navigation */}
            {!isMobile && (
              <nav className="hidden md:flex space-x-8">
                <NavItem href="/">Home</NavItem>
                <NavItem href="/destinations">Destinations</NavItem>
                <NavItem href="/tours">Tours</NavItem>
                <NavItem href="/about">About Us</NavItem>
                <NavItem href="/contact">Contact</NavItem>
              </nav>
            )}

            {/* Desktop Buttons */}
            {!isMobile && (
              <div className="hidden md:flex items-center space-x-4">
                <Button variant="ghost" size="sm" className="text-gray-700" onClick={handleOpenSearch}>
                  <Search className="h-5 w-5 mr-1" />
                  Search
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="border-travel-blue text-travel-blue hover:bg-travel-blue hover:text-white"
                  onClick={handleOpenLogin}
                >
                  Log in
                </Button>
                <Button 
                  size="sm" 
                  className="bg-travel-blue hover:bg-travel-blue/90"
                  onClick={handleOpenSignup}
                >
                  Sign up
                </Button>
              </div>
            )}

            {/* Mobile menu button */}
            {isMobile && (
              <div className="flex md:hidden">
                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-travel-blue focus:outline-none"
                >
                  {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Mobile menu */}
        {isMobile && isMenuOpen && (
          <div className="md:hidden bg-white shadow-lg animate-fade-in">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <NavItem href="/" className="block px-3 py-2 rounded-md">Home</NavItem>
              <NavItem href="/destinations" className="block px-3 py-2 rounded-md">Destinations</NavItem>
              <NavItem href="/tours" className="block px-3 py-2 rounded-md">Tours</NavItem>
              <NavItem href="/about" className="block px-3 py-2 rounded-md">About Us</NavItem>
              <NavItem href="/contact" className="block px-3 py-2 rounded-md">Contact</NavItem>
            </div>
            <div className="pt-4 pb-3 border-t border-gray-200">
              <div className="flex items-center px-5">
                <div className="flex-shrink-0">
                  <User className="h-10 w-10 rounded-full text-gray-500" />
                </div>
                <div className="ml-3">
                  <div className="text-base font-medium text-gray-800">Account</div>
                </div>
              </div>
              <div className="mt-3 px-2 space-y-1">
                <Button 
                  variant="ghost" 
                  className="block w-full px-3 py-2 text-left rounded-md text-base font-medium text-gray-700 hover:text-travel-blue"
                  onClick={handleOpenSearch}
                >
                  <Search className="h-5 w-5 mr-2 inline" />
                  Search
                </Button>
                <Button 
                  variant="ghost" 
                  className="block w-full px-3 py-2 text-left rounded-md text-base font-medium text-gray-700 hover:text-travel-blue"
                  onClick={handleOpenLogin}
                >
                  Log in
                </Button>
                <Button 
                  variant="ghost" 
                  className="block w-full px-3 py-2 text-left rounded-md text-base font-medium text-gray-700 hover:text-travel-blue"
                  onClick={handleOpenSignup}
                >
                  Sign up
                </Button>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Auth Modals */}
      <LoginModal 
        isOpen={isLoginOpen} 
        onClose={() => setIsLoginOpen(false)} 
        onOpenSignup={() => {
          setIsLoginOpen(false);
          setIsSignupOpen(true);
        }} 
      />
      
      <SignupModal 
        isOpen={isSignupOpen} 
        onClose={() => setIsSignupOpen(false)} 
        onOpenLogin={() => {
          setIsSignupOpen(false);
          setIsLoginOpen(true);
        }} 
      />

      {/* Search Modal */}
      <SearchModal 
        isOpen={isSearchOpen} 
        onClose={() => setIsSearchOpen(false)} 
      />
    </>
  );
};

export default Navbar;
