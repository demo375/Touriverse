
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Mail, Phone, MapPin, Globe, Clock, Send } from 'lucide-react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';

// Form validation schema
const contactFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  subject: z.string().min(5, { message: "Subject must be at least 5 characters" }),
  message: z.string().min(10, { message: "Message must be at least 10 characters" }),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

const Contact = () => {
  const { toast } = useToast();
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  const onSubmit = (data: ContactFormValues) => {
    console.log("Form submitted:", data);
    // Display success message to user
    toast({
      title: "Message sent successfully!",
      description: "We'll get back to you as soon as possible.",
    });
    // Reset the form
    form.reset();
  };

  // Office locations data
  const offices = [
    {
      city: "New York",
      address: "123 Travel Plaza, Suite 400, New York, NY 10001",
      phone: "+1 (212) 555-1234",
      email: "newyork@touriverse.com",
      hours: "Mon-Fri: 9am-6pm",
    },
    {
      city: "London",
      address: "45 Explorer Street, London, UK SW1A 1AA",
      phone: "+44 20 7946 0958",
      email: "london@touriverse.com",
      hours: "Mon-Fri: 9am-5:30pm",
    },
    {
      city: "Tokyo",
      address: "8-1 Traveler Building, Shibuya, Tokyo 150-0002",
      phone: "+81 3 1234 5678",
      email: "tokyo@touriverse.com",
      hours: "Mon-Fri: 9am-6pm",
    },
  ];

  // FAQ data for contact
  const faqs = [
    {
      question: "How quickly can I expect a response to my inquiry?",
      answer: "We aim to respond to all inquiries within 24-48 hours during business days. For urgent matters, please call our customer service line.",
    },
    {
      question: "Can I book a tour over the phone?",
      answer: "Yes! You can book any of our tours by calling our customer service team during business hours.",
    },
    {
      question: "How do I request a refund or cancellation?",
      answer: "For refunds or cancellations, please email bookings@touriverse.com with your booking reference number and details.",
    },
    {
      question: "Do you offer custom or private tours?",
      answer: "Yes, we offer customized and private tour options. Please contact us with your requirements, and we'll help create your perfect travel experience.",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative py-20 bg-gradient-to-b from-blue-50 to-white">
          <div className="container mx-auto px-4 text-center">
            <Badge className="mb-4">Get in Touch</Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Contact Us</h1>
            <p className="text-gray-600 max-w-3xl mx-auto text-lg">
              Have questions about our tours, destinations, or booking process? 
              We're here to help you plan your perfect travel experience.
            </p>
          </div>
        </section>
        
        {/* Contact Form & Info Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="flex flex-col lg:flex-row gap-12">
              {/* Contact Form */}
              <div className="lg:w-2/3">
                <div className="bg-white p-8 rounded-lg shadow-md">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Send Us a Message</h2>
                  
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField
                          control={form.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Your Name</FormLabel>
                              <FormControl>
                                <Input placeholder="John Doe" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Email Address</FormLabel>
                              <FormControl>
                                <Input placeholder="you@example.com" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      
                      <FormField
                        control={form.control}
                        name="subject"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Subject</FormLabel>
                            <FormControl>
                              <Input placeholder="How can we help you?" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="message"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Message</FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder="Please provide details about your inquiry..." 
                                className="min-h-[150px]"
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <Button 
                        type="submit" 
                        className="w-full bg-travel-blue hover:bg-travel-blue/90"
                      >
                        <Send className="h-4 w-4 mr-2" />
                        Send Message
                      </Button>
                    </form>
                  </Form>
                </div>
              </div>
              
              {/* Contact Info */}
              <div className="lg:w-1/3">
                <div className="bg-white p-8 rounded-lg shadow-md mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Contact Information</h2>
                  
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <Mail className="h-5 w-5 text-travel-blue mr-3 mt-0.5" />
                      <div>
                        <p className="font-medium">Email</p>
                        <a href="mailto:info@touriverse.com" className="text-travel-blue hover:underline">
                          info@touriverse.com
                        </a>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <Phone className="h-5 w-5 text-travel-blue mr-3 mt-0.5" />
                      <div>
                        <p className="font-medium">Phone</p>
                        <a href="tel:+18005551234" className="text-travel-blue hover:underline">
                          +1 (800) 555-1234
                        </a>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <Globe className="h-5 w-5 text-travel-blue mr-3 mt-0.5" />
                      <div>
                        <p className="font-medium">Website</p>
                        <a href="https://touriverse.com" className="text-travel-blue hover:underline">
                          www.touriverse.com
                        </a>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <Clock className="h-5 w-5 text-travel-blue mr-3 mt-0.5" />
                      <div>
                        <p className="font-medium">Business Hours</p>
                        <p className="text-gray-600">Monday - Friday: 9am - 6pm</p>
                        <p className="text-gray-600">Saturday: 10am - 4pm</p>
                        <p className="text-gray-600">Sunday: Closed</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-travel-blue text-white p-8 rounded-lg shadow-md">
                  <h3 className="text-xl font-bold mb-4">Emergency Contact</h3>
                  <p className="mb-4">For urgent assistance while on one of our tours:</p>
                  <div className="flex items-center mb-3">
                    <Phone className="h-5 w-5 mr-2" />
                    <span>+1 (888) 999-7777</span>
                  </div>
                  <p className="text-sm">This line is available 24/7 for customers currently on tours.</p>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Office Locations */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Offices</h2>
              <p className="text-gray-600 max-w-3xl mx-auto">
                Visit us at one of our global offices to speak with our travel experts in person.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {offices.map((office, index) => (
                <Card key={index}>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold text-travel-blue mb-4">{office.city}</h3>
                    <div className="space-y-3">
                      <div className="flex items-start">
                        <MapPin className="h-5 w-5 text-gray-500 mr-3 mt-0.5" />
                        <p className="text-gray-600">{office.address}</p>
                      </div>
                      <div className="flex items-center">
                        <Phone className="h-5 w-5 text-gray-500 mr-3" />
                        <p className="text-gray-600">{office.phone}</p>
                      </div>
                      <div className="flex items-center">
                        <Mail className="h-5 w-5 text-gray-500 mr-3" />
                        <p className="text-gray-600">{office.email}</p>
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-5 w-5 text-gray-500 mr-3" />
                        <p className="text-gray-600">{office.hours}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
        
        {/* FAQ Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
              <p className="text-gray-600 max-w-3xl mx-auto">
                Find quick answers to common questions about contacting and working with us.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {faqs.map((faq, index) => (
                <Card key={index}>
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold mb-2">{faq.question}</h3>
                    <p className="text-gray-600">{faq.answer}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
        
        {/* Map Section - This would typically include an embedded map */}
        <section className="py-8">
          <div className="container mx-auto px-4 text-center">
            <div className="bg-gray-200 p-16 rounded-lg flex items-center justify-center">
              <div className="text-gray-500">
                <MapPin className="h-12 w-12 mx-auto mb-4" />
                <p className="text-xl font-medium">Interactive Map Would Be Here</p>
                <p>Showing our office locations worldwide</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Contact;
