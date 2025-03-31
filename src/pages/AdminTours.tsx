
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { 
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { 
  Pencil, 
  Trash, 
  Plus, 
  Star, 
  Search,
  Eye,
  Filter,
  Calendar,
  Clock,
  MapPin,
  DollarSign
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { toast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface Tour {
  id: number;
  title: string;
  description: string;
  price: number;
  duration: string;
  location: string;
  country: string;
  featured: boolean;
  rating: number;
  reviewCount: number;
  slug: string;
}

const AdminTours = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedTourId, setSelectedTourId] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState('all');
  
  // Mock data - in a real application this would be fetched from an API
  const tours: Tour[] = [
    {
      id: 1,
      title: 'Ancient Wonders of Kyoto',
      description: 'Explore the historic temples and gardens of Kyoto with an expert local guide.',
      price: 129,
      duration: '5 hours',
      location: 'Kyoto',
      country: 'Japan',
      featured: true,
      rating: 4.9,
      reviewCount: 247,
      slug: 'ancient-wonders-kyoto',
    },
    {
      id: 2,
      title: 'Santorini Sunset Cruise',
      description: 'Sail around Santorini\'s caldera and enjoy the spectacular sunset views.',
      price: 89,
      duration: '3 hours',
      location: 'Santorini',
      country: 'Greece',
      featured: false,
      rating: 4.8,
      reviewCount: 186,
      slug: 'santorini-sunset-cruise',
    },
    {
      id: 3,
      title: 'Swiss Alps Hiking Adventure',
      description: 'Trek through the breathtaking landscapes of the Swiss Alps with experienced mountain guides.',
      price: 159,
      duration: '7 hours',
      location: 'Swiss Alps',
      country: 'Switzerland',
      featured: false,
      rating: 4.7,
      reviewCount: 153,
      slug: 'swiss-alps-hiking',
    },
    {
      id: 4,
      title: 'Yosemite Valley Exploration',
      description: 'Discover the natural wonders of Yosemite National Park with a certified wilderness guide.',
      price: 199,
      duration: 'Full day',
      location: 'Yosemite National Park',
      country: 'United States',
      featured: true,
      rating: 4.9,
      reviewCount: 218,
      slug: 'yosemite-valley-exploration',
    },
    {
      id: 5,
      title: 'Tokyo by Night Food Tour',
      description: 'Experience Tokyo\'s vibrant nightlife and culinary scene with a local food expert.',
      price: 110,
      duration: '4 hours',
      location: 'Tokyo',
      country: 'Japan',
      featured: true,
      rating: 4.8,
      reviewCount: 175,
      slug: 'tokyo-night-food-tour',
    },
    {
      id: 6,
      title: 'Barcelona Gaudi Architecture Tour',
      description: 'Discover the unique architectural wonders of Antoni Gaudi throughout Barcelona.',
      price: 79,
      duration: '4 hours',
      location: 'Barcelona',
      country: 'Spain',
      featured: false,
      rating: 4.7,
      reviewCount: 162,
      slug: 'barcelona-gaudi-tour',
    },
  ];

  // Filter tours based on search term and active tab
  const filteredTours = tours.filter(tour => {
    const matchesSearch = tour.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tour.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tour.country.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (activeTab === 'all') return matchesSearch;
    if (activeTab === 'featured') return matchesSearch && tour.featured;
    return matchesSearch;
  });

  // Pagination
  const itemsPerPage = 5;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentTours = filteredTours.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredTours.length / itemsPerPage);

  const handleEdit = (id: number) => {
    // In a real application, navigate to edit form with id
    toast({
      title: "Edit Tour",
      description: `Editing tour with ID ${id} would open in a real application.`,
    });
  };

  const handleDelete = (id: number) => {
    setSelectedTourId(id);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    // In a real application, you would make an API call to delete
    toast({
      title: "Tour Deleted",
      description: `Tour with ID ${selectedTourId} has been deleted successfully.`,
    });
    setIsDeleteDialogOpen(false);
  };

  const handlePreview = (slug: string) => {
    navigate(`/tours/${slug}`);
  };

  const handleAddNewTour = () => {
    // In a real application, navigate to add tour form
    toast({
      title: "Add New Tour",
      description: "Creating a new tour form would open in a real application.",
    });
  };

  const toggleFeatured = (id: number, currentStatus: boolean) => {
    // In a real application, make API call to update featured status
    toast({
      title: currentStatus ? "Removed from Featured" : "Added to Featured",
      description: `Tour has been ${currentStatus ? "removed from" : "added to"} featured tours.`,
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-8 pb-16">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Tour Management</h1>
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                className="text-travel-blue border-travel-blue hover:bg-travel-blue/10"
                onClick={() => navigate('/admin')}
              >
                Manage Destinations
              </Button>
              <Button 
                className="bg-travel-blue hover:bg-travel-blue/90"
                onClick={handleAddNewTour}
              >
                <Plus className="h-4 w-4 mr-2" />
                Add New Tour
              </Button>
            </div>
          </div>
          
          {/* Search and Filters */}
          <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search tours..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="flex gap-2">
                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-auto">
                  <TabsList>
                    <TabsTrigger value="all">All Tours</TabsTrigger>
                    <TabsTrigger value="featured">Featured</TabsTrigger>
                  </TabsList>
                </Tabs>
                <Button variant="outline" className="flex items-center">
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                </Button>
              </div>
            </div>
          </div>
          
          {/* Tours Table */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Tour</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Duration</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Rating</TableHead>
                  <TableHead>Featured</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {currentTours.map((tour) => (
                  <TableRow key={tour.id}>
                    <TableCell className="font-medium">{tour.id}</TableCell>
                    <TableCell>
                      <div className="font-medium">{tour.title}</div>
                      <div className="text-xs text-gray-500 max-w-xs truncate">{tour.description}</div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <DollarSign className="h-4 w-4 text-gray-500 mr-1" />
                        {tour.price}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 text-gray-500 mr-1" />
                        {tour.duration}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 text-gray-500 mr-1" />
                        {tour.location}, {tour.country}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-travel-yellow fill-travel-yellow mr-1" />
                        <span>{tour.rating}</span>
                        <span className="text-xs text-gray-500 ml-1">({tour.reviewCount})</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="ghost"
                        className="h-8 w-8 p-0"
                        onClick={() => toggleFeatured(tour.id, tour.featured)}
                      >
                        <Star className={`h-5 w-5 ${tour.featured ? "text-travel-yellow fill-travel-yellow" : "text-gray-300"}`} />
                        <span className="sr-only">{tour.featured ? "Featured" : "Not Featured"}</span>
                      </Button>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handlePreview(tour.slug)}
                          className="h-8 w-8 p-0"
                        >
                          <Eye className="h-4 w-4" />
                          <span className="sr-only">Preview</span>
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEdit(tour.id)}
                          className="h-8 w-8 p-0 text-blue-600"
                        >
                          <Pencil className="h-4 w-4" />
                          <span className="sr-only">Edit</span>
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDelete(tour.id)}
                          className="h-8 w-8 p-0 text-red-600"
                        >
                          <Trash className="h-4 w-4" />
                          <span className="sr-only">Delete</span>
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            
            {filteredTours.length === 0 && (
              <div className="text-center py-8">
                <p className="text-gray-500">No tours found</p>
              </div>
            )}
            
            {filteredTours.length > itemsPerPage && (
              <div className="px-4 py-4 border-t">
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious 
                        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                        className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
                      />
                    </PaginationItem>
                    
                    {Array.from({ length: totalPages }).map((_, i) => (
                      <PaginationItem key={i}>
                        <PaginationLink
                          isActive={currentPage === i + 1}
                          onClick={() => setCurrentPage(i + 1)}
                        >
                          {i + 1}
                        </PaginationLink>
                      </PaginationItem>
                    ))}
                    
                    <PaginationItem>
                      <PaginationNext 
                        onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                        className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </div>
            )}
          </div>
        </div>
      </main>
      
      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
          </DialogHeader>
          <p className="py-4">Are you sure you want to delete this tour? This action cannot be undone.</p>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>Cancel</Button>
            <Button variant="destructive" onClick={confirmDelete}>Delete</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      <Footer />
    </div>
  );
};

export default AdminTours;
