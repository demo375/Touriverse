
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
  Filter
} from 'lucide-react';
import AdminDestinationForm from '@/components/AdminDestinationForm';

interface Destination {
  id: number;
  title: string;
  country: string;
  continent: string;
  featured: boolean;
  attractions: string[];
  slug: string;
}

const Admin = () => {
  const navigate = useNavigate();
  const [showAddForm, setShowAddForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedDestination, setSelectedDestination] = useState<Destination | null>(null);
  
  // Mock data - in a real application this would be fetched from an API
  const destinations: Destination[] = [
    {
      id: 1,
      title: 'Kyoto',
      country: 'Japan',
      continent: 'Asia',
      featured: true,
      attractions: ['Fushimi Inari Shrine', 'Arashiyama Bamboo Grove', 'Kinkaku-ji Temple', 'Gion District'],
      slug: 'kyoto',
    },
    {
      id: 2,
      title: 'Santorini',
      country: 'Greece',
      continent: 'Europe',
      featured: true,
      attractions: ['Oia Sunset', 'Fira', 'Red Beach', 'Akrotiri Archaeological Site'],
      slug: 'santorini',
    },
    {
      id: 3,
      title: 'Swiss Alps',
      country: 'Switzerland',
      continent: 'Europe',
      featured: false,
      attractions: ['Matterhorn', 'Interlaken', 'Jungfraujoch', 'Lake Lucerne'],
      slug: 'swiss-alps',
    },
    {
      id: 4,
      title: 'Yosemite',
      country: 'United States',
      continent: 'North America',
      featured: false,
      attractions: ['El Capitan', 'Half Dome', 'Yosemite Falls', 'Mariposa Grove'],
      slug: 'yosemite',
    },
    {
      id: 5,
      title: 'Bali',
      country: 'Indonesia',
      continent: 'Asia',
      featured: true,
      attractions: ['Ubud Monkey Forest', 'Tanah Lot Temple', 'Mount Batur', 'Tegallalang Rice Terraces'],
      slug: 'bali',
    },
    {
      id: 6,
      title: 'Marrakech',
      country: 'Morocco',
      continent: 'Africa',
      featured: false,
      attractions: ['Jardin Majorelle', 'Medina', 'Bahia Palace', 'Jemaa el-Fnaa'],
      slug: 'marrakech',
    },
    {
      id: 7,
      title: 'Machu Picchu',
      country: 'Peru',
      continent: 'South America',
      featured: true,
      attractions: ['Sun Gate', 'Huayna Picchu', 'Intihuatana Stone', 'Temple of the Sun'],
      slug: 'machu-picchu',
    },
    {
      id: 8,
      title: 'Great Barrier Reef',
      country: 'Australia',
      continent: 'Oceania',
      featured: false,
      attractions: ['Whitehaven Beach', 'Heart Reef', 'Lady Musgrave Island', 'Michaelmas Cay'],
      slug: 'great-barrier-reef',
    },
  ];

  // Filter destinations based on search term
  const filteredDestinations = destinations.filter(destination => 
    destination.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    destination.country.toLowerCase().includes(searchTerm.toLowerCase()) ||
    destination.continent.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination
  const itemsPerPage = 5;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentDestinations = filteredDestinations.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredDestinations.length / itemsPerPage);

  const handleEdit = (destination: Destination) => {
    setSelectedDestination(destination);
    setShowAddForm(true);
  };

  const handleDelete = (id: number) => {
    // In a real application, you would make an API call to delete
    alert(`Destination with ID ${id} would be deleted in a real application`);
  };

  const handlePreview = (slug: string) => {
    navigate(`/destinations/${slug}`);
  };

  const handleCloseForm = () => {
    setShowAddForm(false);
    setSelectedDestination(null);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-8 pb-16">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Destination Management</h1>
            <Button 
              className="bg-travel-blue hover:bg-travel-blue/90"
              onClick={() => {
                setSelectedDestination(null);
                setShowAddForm(true);
              }}
            >
              <Plus className="h-4 w-4 mr-2" />
              Add New Destination
            </Button>
          </div>
          
          {showAddForm ? (
            <AdminDestinationForm 
              destination={selectedDestination} 
              onClose={handleCloseForm}
              onSubmit={(data) => {
                console.log('Form submitted with data:', data);
                // In a real application, you would make an API call to save the data
                handleCloseForm();
              }}
            />
          ) : (
            <>
              <div className="bg-white p-6 rounded-lg shadow-md mb-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Search destinations..."
                      className="pl-10"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" className="flex items-center">
                      <Filter className="h-4 w-4 mr-2" />
                      Filter
                    </Button>
                    <Button 
                      variant="outline" 
                      className="text-green-600 border-green-600 hover:bg-green-50"
                      onClick={() => navigate('/admin/tours')}
                    >
                      Manage Tours
                    </Button>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Destination</TableHead>
                      <TableHead>Country</TableHead>
                      <TableHead>Continent</TableHead>
                      <TableHead>Attractions</TableHead>
                      <TableHead>Featured</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {currentDestinations.map((destination) => (
                      <TableRow key={destination.id}>
                        <TableCell className="font-medium">{destination.id}</TableCell>
                        <TableCell>{destination.title}</TableCell>
                        <TableCell>{destination.country}</TableCell>
                        <TableCell>{destination.continent}</TableCell>
                        <TableCell>
                          {destination.attractions.slice(0, 2).join(', ')}
                          {destination.attractions.length > 2 && '...'}
                        </TableCell>
                        <TableCell>
                          {destination.featured ? (
                            <Star className="h-5 w-5 text-travel-yellow fill-travel-yellow" />
                          ) : (
                            <Star className="h-5 w-5 text-gray-300" />
                          )}
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handlePreview(destination.slug)}
                              className="h-8 w-8 p-0"
                            >
                              <Eye className="h-4 w-4" />
                              <span className="sr-only">Preview</span>
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleEdit(destination)}
                              className="h-8 w-8 p-0 text-blue-600"
                            >
                              <Pencil className="h-4 w-4" />
                              <span className="sr-only">Edit</span>
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDelete(destination.id)}
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
                
                {filteredDestinations.length === 0 && (
                  <div className="text-center py-8">
                    <p className="text-gray-500">No destinations found</p>
                  </div>
                )}
                
                {filteredDestinations.length > itemsPerPage && (
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
            </>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Admin;
