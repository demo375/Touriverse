
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
  Map,
  Route,
  LayoutDashboard,
  Users,
  FileText,
  Settings,
  Bell
} from 'lucide-react';
import AdminDestinationForm from '@/components/AdminDestinationForm';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { toast } from "@/hooks/use-toast";
import { Drawer, DrawerTrigger, DrawerContent, DrawerHeader, DrawerTitle, DrawerFooter, DrawerClose } from "@/components/ui/drawer";

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
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedDestinationId, setSelectedDestinationId] = useState<number | null>(null);
  const [isHelpDrawerOpen, setIsHelpDrawerOpen] = useState(false);
  
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
  
  // Mock dashboard metrics
  const dashboardMetrics = [
    { title: "Total Destinations", value: destinations.length, icon: Map, color: "text-blue-500" },
    { title: "Total Tours", value: 6, icon: Route, color: "text-purple-500" },
    { title: "Featured Places", value: destinations.filter(d => d.featured).length, icon: Star, color: "text-yellow-500" },
    { title: "User Bookings", value: 152, icon: Users, color: "text-green-500" },
  ];

  // Recent notifications
  const notifications = [
    { title: "New Booking", message: "A new booking was made for Kyoto tour", time: "10 minutes ago" },
    { title: "Review Added", message: "A user left a 5-star review for Santorini", time: "2 hours ago" },
    { title: "Content Update", message: "Yosemite description was updated", time: "Yesterday" },
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
    setSelectedDestinationId(id);
    setIsDeleteDialogOpen(true);
  };
  
  const confirmDelete = () => {
    // In a real application, you would make an API call to delete
    toast({
      title: "Destination Deleted",
      description: `Destination with ID ${selectedDestinationId} has been deleted successfully.`,
    });
    setIsDeleteDialogOpen(false);
  };

  const handlePreview = (slug: string) => {
    navigate(`/destinations/${slug}`);
  };

  const handleCloseForm = () => {
    setShowAddForm(false);
    setSelectedDestination(null);
  };
  
  const toggleFeatured = (id: number) => {
    // In a real application, make API call to update featured status
    toast({
      title: "Featured Status Updated",
      description: "Destination featured status has been updated successfully.",
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-8 pb-16">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                className="text-travel-blue border-travel-blue hover:bg-travel-blue/10"
                onClick={() => setIsHelpDrawerOpen(true)}
              >
                Need Help?
              </Button>
              <Button
                variant="outline"
                className="relative"
                onClick={() => toast({
                  title: "Notifications",
                  description: "You have 3 unread notifications.",
                })}
              >
                <Bell className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  3
                </span>
              </Button>
            </div>
          </div>
          
          {/* Admin Navigation */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => {}}>
              <CardContent className="p-4 flex items-center justify-between">
                <div className="flex items-center">
                  <LayoutDashboard className="h-5 w-5 mr-2 text-travel-blue" />
                  <span>Dashboard</span>
                </div>
                <Badge className="bg-travel-blue">Active</Badge>
              </CardContent>
            </Card>
            
            <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => navigate('/admin')}>
              <CardContent className="p-4 flex items-center">
                <Map className="h-5 w-5 mr-2 text-gray-600" />
                <span>Destinations</span>
              </CardContent>
            </Card>
            
            <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => navigate('/admin/tours')}>
              <CardContent className="p-4 flex items-center">
                <Route className="h-5 w-5 mr-2 text-gray-600" />
                <span>Tours</span>
              </CardContent>
            </Card>
            
            <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => toast({
              title: "Coming Soon",
              description: "The settings page is under development.",
            })}>
              <CardContent className="p-4 flex items-center">
                <Settings className="h-5 w-5 mr-2 text-gray-600" />
                <span>Settings</span>
              </CardContent>
            </Card>
          </div>
          
          {/* Dashboard Metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {dashboardMetrics.map((metric, index) => (
              <Card key={index}>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-500">{metric.title}</p>
                      <p className="text-3xl font-bold">{metric.value}</p>
                    </div>
                    <div className={`p-2 rounded-full bg-gray-100 ${metric.color}`}>
                      <metric.icon className="h-6 w-6" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          {/* Recent Activity & Notifications */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <Card className="lg:col-span-2">
              <CardHeader className="pb-2">
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {notifications.map((notification, index) => (
                    <div key={index} className="flex items-start pb-4 border-b border-gray-100 last:border-0">
                      <div className="p-2 rounded-full bg-blue-100 text-blue-500 mr-3">
                        <Bell className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="font-medium">{notification.title}</p>
                        <p className="text-sm text-gray-600">{notification.message}</p>
                        <p className="text-xs text-gray-400 mt-1">{notification.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Button 
                    className="w-full bg-travel-blue hover:bg-travel-blue/90"
                    onClick={() => {
                      setSelectedDestination(null);
                      setShowAddForm(true);
                    }}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add New Destination
                  </Button>
                  <Button 
                    className="w-full"
                    variant="outline"
                    onClick={() => navigate('/admin/tours')}
                  >
                    <Route className="h-4 w-4 mr-2" />
                    Manage Tours
                  </Button>
                  <Button 
                    className="w-full"
                    variant="outline"
                    onClick={() => toast({
                      title: "Export Data",
                      description: "Report has been generated and downloaded.",
                    })}
                  >
                    <FileText className="h-4 w-4 mr-2" />
                    Export Reports
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900">Destination Management</h2>
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
                toast({
                  title: selectedDestination ? "Destination Updated" : "Destination Created",
                  description: `The destination has been ${selectedDestination ? "updated" : "created"} successfully.`,
                });
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
                      className="text-travel-blue border-travel-blue hover:bg-travel-blue/10"
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
                          <Button
                            variant="ghost"
                            className="h-8 w-8 p-0"
                            onClick={() => toggleFeatured(destination.id)}
                          >
                            <Star className={`h-5 w-5 ${destination.featured ? "text-travel-yellow fill-travel-yellow" : "text-gray-300"}`} />
                          </Button>
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
      
      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
          </DialogHeader>
          <p className="py-4">Are you sure you want to delete this destination? This action cannot be undone.</p>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>Cancel</Button>
            <Button variant="destructive" onClick={confirmDelete}>Delete</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Help Drawer */}
      <Drawer open={isHelpDrawerOpen} onOpenChange={setIsHelpDrawerOpen}>
        <DrawerContent>
          <DrawerHeader className="text-left">
            <DrawerTitle>Admin Panel Help</DrawerTitle>
          </DrawerHeader>
          <div className="px-4 pb-4">
            <div className="space-y-4">
              <div>
                <h3 className="font-medium mb-2 text-lg">Managing Destinations</h3>
                <ul className="list-disc pl-5 space-y-1 text-gray-600">
                  <li>Add new destinations using the "Add New Destination" button</li>
                  <li>Edit existing destinations by clicking the pencil icon</li>
                  <li>Preview how destinations appear on the site with the eye icon</li>
                  <li>Toggle featured status with the star icon</li>
                  <li>Delete destinations using the trash icon (requires confirmation)</li>
                </ul>
              </div>
              <div>
                <h3 className="font-medium mb-2 text-lg">Managing Tours</h3>
                <ul className="list-disc pl-5 space-y-1 text-gray-600">
                  <li>Navigate to the Tours management page</li>
                  <li>Add, edit, preview, and delete tours</li>
                  <li>Mark tours as featured to highlight them on the homepage</li>
                </ul>
              </div>
              <div>
                <h3 className="font-medium mb-2 text-lg">Need More Help?</h3>
                <p className="text-gray-600 mb-2">Contact support at:</p>
                <p className="text-travel-blue">support@wanderlust.example</p>
              </div>
            </div>
          </div>
          <DrawerFooter>
            <Button onClick={() => setIsHelpDrawerOpen(false)}>Close</Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
      
      <Footer />
    </div>
  );
};

export default Admin;
