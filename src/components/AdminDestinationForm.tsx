
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent } from '@/components/ui/card';
import { X, Plus, Upload, CheckCircle2 } from 'lucide-react';

interface Destination {
  id: number;
  title: string;
  country: string;
  continent: string;
  featured: boolean;
  attractions: string[];
  slug: string;
}

interface DestinationFormData {
  title: string;
  description: string;
  fullDescription: string;
  country: string;
  continent: string;
  featured: boolean;
  bestTimeToVisit: string;
  language: string;
  currency: string;
  weather: string;
  attractions: string[];
  food: string[];
  transportation: string[];
  accommodations: string[];
  tips: string[];
  images: string[];
  slug: string;
}

interface AdminDestinationFormProps {
  destination: Destination | null;
  onClose: () => void;
  onSubmit: (data: DestinationFormData) => void;
}

const continents = [
  "Africa",
  "Asia",
  "Europe",
  "North America",
  "South America",
  "Oceania",
  "Antarctica"
];

const AdminDestinationForm = ({ destination, onClose, onSubmit }: AdminDestinationFormProps) => {
  const isEditing = !!destination;
  
  const [formData, setFormData] = useState<DestinationFormData>({
    title: destination?.title || '',
    description: '',
    fullDescription: '',
    country: destination?.country || '',
    continent: destination?.continent || 'Asia',
    featured: destination?.featured || false,
    bestTimeToVisit: '',
    language: '',
    currency: '',
    weather: '',
    attractions: destination?.attractions || [''],
    food: [''],
    transportation: [''],
    accommodations: [''],
    tips: [''],
    images: [''],
    slug: destination?.slug || '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!formData.title || !formData.country || !formData.continent) {
      alert('Please fill in all required fields');
      return;
    }
    
    // Clean up arrays (remove empty entries)
    const cleanFormData = {
      ...formData,
      attractions: formData.attractions.filter(item => item.trim() !== ''),
      food: formData.food.filter(item => item.trim() !== ''),
      transportation: formData.transportation.filter(item => item.trim() !== ''),
      accommodations: formData.accommodations.filter(item => item.trim() !== ''),
      tips: formData.tips.filter(item => item.trim() !== ''),
      images: formData.images.filter(item => item.trim() !== ''),
      slug: formData.slug || formData.title.toLowerCase().replace(/\s+/g, '-'),
    };
    
    onSubmit(cleanFormData);
  };

  const handleArrayItemChange = (
    array: string[], 
    index: number, 
    value: string,
    arrayName: keyof Pick<DestinationFormData, 'attractions' | 'food' | 'transportation' | 'accommodations' | 'tips' | 'images'>
  ) => {
    const newArray = [...array];
    newArray[index] = value;
    setFormData(prev => ({ ...prev, [arrayName]: newArray }));
  };

  const addArrayItem = (
    array: string[],
    arrayName: keyof Pick<DestinationFormData, 'attractions' | 'food' | 'transportation' | 'accommodations' | 'tips' | 'images'>
  ) => {
    setFormData(prev => ({ ...prev, [arrayName]: [...array, ''] }));
  };

  const removeArrayItem = (
    array: string[],
    index: number,
    arrayName: keyof Pick<DestinationFormData, 'attractions' | 'food' | 'transportation' | 'accommodations' | 'tips' | 'images'>
  ) => {
    if (array.length === 1) {
      // Don't remove the last item, just clear it
      handleArrayItemChange(array, 0, '', arrayName);
      return;
    }
    
    const newArray = [...array];
    newArray.splice(index, 1);
    setFormData(prev => ({ ...prev, [arrayName]: newArray }));
  };

  const handleSlugGenerate = () => {
    if (formData.title) {
      const slug = formData.title.toLowerCase().replace(/\s+/g, '-');
      setFormData(prev => ({ ...prev, slug }));
    }
  };

  return (
    <Card className="bg-white rounded-lg shadow-lg">
      <CardContent className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">
            {isEditing ? `Edit: ${destination.title}` : 'Add New Destination'}
          </h2>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="title" className="text-base font-medium">Destination Name*</Label>
                <Input 
                  id="title"
                  name="title" 
                  value={formData.title} 
                  onChange={handleChange}
                  placeholder="e.g. Kyoto"
                  required
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="country" className="text-base font-medium">Country*</Label>
                  <Input 
                    id="country"
                    name="country" 
                    value={formData.country} 
                    onChange={handleChange}
                    placeholder="e.g. Japan"
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="continent" className="text-base font-medium">Continent*</Label>
                  <select
                    id="continent"
                    name="continent"
                    value={formData.continent}
                    onChange={handleChange}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    required
                  >
                    {continents.map((continent) => (
                      <option key={continent} value={continent}>
                        {continent}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              
              <div>
                <Label htmlFor="description" className="text-base font-medium">Short Description*</Label>
                <Textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Brief description for cards and previews"
                  className="min-h-[80px] resize-y"
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="fullDescription" className="text-base font-medium">Full Description*</Label>
                <Textarea
                  id="fullDescription"
                  name="fullDescription"
                  value={formData.fullDescription}
                  onChange={handleChange}
                  placeholder="Detailed description of the destination"
                  className="min-h-[160px] resize-y"
                  required
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="language" className="text-base font-medium">Language</Label>
                  <Input 
                    id="language"
                    name="language" 
                    value={formData.language} 
                    onChange={handleChange}
                    placeholder="e.g. Japanese"
                  />
                </div>
                
                <div>
                  <Label htmlFor="currency" className="text-base font-medium">Currency</Label>
                  <Input 
                    id="currency"
                    name="currency" 
                    value={formData.currency} 
                    onChange={handleChange}
                    placeholder="e.g. Japanese Yen (JPY)"
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="bestTimeToVisit" className="text-base font-medium">Best Time To Visit</Label>
                <Input 
                  id="bestTimeToVisit"
                  name="bestTimeToVisit" 
                  value={formData.bestTimeToVisit} 
                  onChange={handleChange}
                  placeholder="e.g. Spring (March to May)"
                />
              </div>
              
              <div>
                <Label htmlFor="weather" className="text-base font-medium">Weather</Label>
                <Textarea
                  id="weather"
                  name="weather"
                  value={formData.weather}
                  onChange={handleChange}
                  placeholder="Description of the local weather patterns"
                  className="min-h-[80px] resize-y"
                />
              </div>
            </div>
            
            <div className="space-y-6">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <Label className="text-base font-medium">Attractions</Label>
                  <Button 
                    type="button" 
                    variant="outline" 
                    size="sm"
                    onClick={() => addArrayItem(formData.attractions, 'attractions')}
                  >
                    <Plus className="h-4 w-4 mr-1" />
                    Add
                  </Button>
                </div>
                {formData.attractions.map((attraction, index) => (
                  <div key={index} className="flex gap-2 mb-2">
                    <Input
                      value={attraction}
                      onChange={(e) => handleArrayItemChange(formData.attractions, index, e.target.value, 'attractions')}
                      placeholder={`Attraction ${index + 1}`}
                    />
                    <Button 
                      type="button" 
                      variant="ghost" 
                      size="icon"
                      onClick={() => removeArrayItem(formData.attractions, index, 'attractions')}
                      className="h-10 w-10 text-red-500"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-2">
                  <Label className="text-base font-medium">Local Cuisine</Label>
                  <Button 
                    type="button" 
                    variant="outline" 
                    size="sm"
                    onClick={() => addArrayItem(formData.food, 'food')}
                  >
                    <Plus className="h-4 w-4 mr-1" />
                    Add
                  </Button>
                </div>
                {formData.food.map((item, index) => (
                  <div key={index} className="flex gap-2 mb-2">
                    <Input
                      value={item}
                      onChange={(e) => handleArrayItemChange(formData.food, index, e.target.value, 'food')}
                      placeholder={`Food item ${index + 1}`}
                    />
                    <Button 
                      type="button" 
                      variant="ghost" 
                      size="icon"
                      onClick={() => removeArrayItem(formData.food, index, 'food')}
                      className="h-10 w-10 text-red-500"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-2">
                  <Label className="text-base font-medium">Images</Label>
                  <Button 
                    type="button" 
                    variant="outline" 
                    size="sm"
                    onClick={() => addArrayItem(formData.images, 'images')}
                  >
                    <Plus className="h-4 w-4 mr-1" />
                    Add
                  </Button>
                </div>
                {formData.images.map((image, index) => (
                  <div key={index} className="flex gap-2 mb-2">
                    <div className="flex-grow relative">
                      <Input
                        value={image}
                        onChange={(e) => handleArrayItemChange(formData.images, index, e.target.value, 'images')}
                        placeholder="Image URL"
                        className="pr-10"
                      />
                      <Button 
                        type="button" 
                        variant="ghost" 
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 text-gray-500"
                      >
                        <Upload className="h-4 w-4" />
                      </Button>
                    </div>
                    <Button 
                      type="button" 
                      variant="ghost" 
                      size="icon"
                      onClick={() => removeArrayItem(formData.images, index, 'images')}
                      className="h-10 w-10 text-red-500"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                <p className="text-xs text-gray-500 mt-1">Provide image URLs (first image will be used as main image)</p>
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-2">
                  <Label className="text-base font-medium">Travel Tips</Label>
                  <Button 
                    type="button" 
                    variant="outline" 
                    size="sm"
                    onClick={() => addArrayItem(formData.tips, 'tips')}
                  >
                    <Plus className="h-4 w-4 mr-1" />
                    Add
                  </Button>
                </div>
                {formData.tips.map((tip, index) => (
                  <div key={index} className="flex gap-2 mb-2">
                    <Input
                      value={tip}
                      onChange={(e) => handleArrayItemChange(formData.tips, index, e.target.value, 'tips')}
                      placeholder={`Travel tip ${index + 1}`}
                    />
                    <Button 
                      type="button" 
                      variant="ghost" 
                      size="icon"
                      onClick={() => removeArrayItem(formData.tips, index, 'tips')}
                      className="h-10 w-10 text-red-500"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
              
              <div className="flex items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <Label className="text-base">Featured Destination</Label>
                  <p className="text-sm text-gray-500">Show this destination on the homepage</p>
                </div>
                <Switch
                  checked={formData.featured}
                  onCheckedChange={(checked) => setFormData(prev => ({ ...prev, featured: checked }))}
                />
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-2">
                  <Label htmlFor="slug" className="text-base font-medium">URL Slug</Label>
                  <Button 
                    type="button" 
                    variant="outline" 
                    size="sm"
                    onClick={handleSlugGenerate}
                  >
                    <CheckCircle2 className="h-4 w-4 mr-1" />
                    Generate
                  </Button>
                </div>
                <Input 
                  id="slug"
                  name="slug" 
                  value={formData.slug} 
                  onChange={handleChange}
                  placeholder="e.g. kyoto"
                />
                <p className="text-xs text-gray-500 mt-1">The URL-friendly name (e.g. destinations/kyoto)</p>
              </div>
            </div>
          </div>
          
          <div className="flex justify-end gap-4 pt-4">
            <Button 
              type="button" 
              variant="outline"
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button 
              type="submit"
              className="bg-travel-blue hover:bg-travel-blue/90"
            >
              {isEditing ? 'Update Destination' : 'Create Destination'}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default AdminDestinationForm;
