
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Wrench, Leaf, Sparkles, Zap, Settings, Smartphone, ChefHat, Scissors, Play, ArrowRight, Star, Search, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import EveryFixHowItWorks from "@/components/home/EveryFixHowItWorks";
import LiveFixFeed from "@/components/home/LiveFixFeed";
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from "@/components/ui/carousel";
import { createIcon } from "@/utils/iconUtils";
import { Badge } from "@/components/ui/badge";

const EveryFixHome = () => {
  const [activeVideos, setActiveVideos] = useState(0);
  const [searchInput, setSearchInput] = useState("");

  // Animation to cycle through active videos count
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveVideos(prev => (prev + 1) % 4);
    }, 3000);
    
    return () => clearInterval(interval);
  }, []);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // You can add search functionality here
  };

  const products = [
    {
      name: "Plumber's Helper",
      description: "Your AI plumbing expert. Fix leaks, clogs, and more without calling a plumber.",
      iconType: "droplet" as const,
      emoji: "🔧",
      path: "/plumber",
      color: "bg-gradient-to-r from-blue-400 to-blue-600",
      avatar: "/lovable-uploads/1d4662ea-cc69-4e4f-9c18-078726ebe91e.png",
      avatarFallback: "🔧",
      bgClass: "bg-blue-50",
      featured: true
    },
    {
      name: "Cleaning Genius",
      description: "The AI that knows how to clean anything — without Googling.",
      iconType: "bath" as const,
      emoji: "🧼",
      path: "/cleaning",
      color: "bg-gradient-to-r from-blue-400 to-blue-500",
      avatar: "/lovable-uploads/8b852c7f-6b8c-40ef-9d7a-b38e45699b56.png",
      avatarFallback: "🧼",
      bgClass: "bg-blue-50",
      featured: false
    },
    {
      name: "Handyman Hero",
      description: "Fix furniture, patch walls, hang shelves — no handyman required.",
      iconType: "hammer" as const,
      emoji: "🔨",
      path: "/handyman",
      color: "bg-gradient-to-r from-orange-400 to-orange-600",
      avatar: "/lovable-uploads/c8ef72aa-6bbc-4cde-a827-e42f3bc112a0.png",
      avatarFallback: "🔨",
      bgClass: "bg-orange-50",
      featured: true
    },
    {
      name: "Electrician Genius",
      description: "Flip the switch on electrical problems — safely and smart.",
      iconType: "zap" as const, 
      emoji: "⚡",
      path: "/electrician",
      color: "bg-gradient-to-r from-yellow-400 to-yellow-600",
      avatar: "/lovable-uploads/3be27937-18fe-451e-a339-37459edc18bb.png",
      avatarFallback: "⚡",
      bgClass: "bg-yellow-50",
      featured: false
    },
    {
      name: "Landscaper Buddy",
      description: "Your AI yard partner — from soil to sprinkler.",
      iconType: "wrench" as const,
      emoji: "🌿",
      path: "/landscaper",
      color: "bg-gradient-to-r from-green-400 to-green-600",
      avatar: "/lovable-uploads/3be27937-18fe-451e-a339-37459edc18bb.png",
      avatarFallback: "🌿",
      bgClass: "bg-green-50",
      featured: false
    },
    {
      name: "Mechanic Assistant",
      description: "Your virtual auto mechanic — diagnose car problems and get repair guidance.",
      iconType: "car" as const,
      emoji: "🔩",
      path: "/mechanic",
      color: "bg-gradient-to-r from-red-400 to-red-600",
      avatar: "/lovable-uploads/c8ef72aa-6bbc-4cde-a827-e42f3bc112a0.png",
      avatarFallback: "🔩",
      bgClass: "bg-red-50",
      featured: false
    },
    {
      name: "Gadget Fix Genie",
      description: "Troubleshoot phones, tablets, routers, remotes and other electronic devices.",
      iconType: "smartphone" as const,
      emoji: "📱",
      path: "/gadgetfixgenie",
      color: "bg-gradient-to-r from-purple-400 to-purple-600",
      avatar: "/lovable-uploads/8b852c7f-6b8c-40ef-9d7a-b38e45699b56.png",
      avatarFallback: "📱",
      bgClass: "bg-purple-50",
      featured: true
    },
    {
      name: "Chef's Assistant",
      description: "Your cooking companion — recipes, techniques, and kitchen problem-solving.",
      iconType: "chef" as const,
      emoji: "👨‍🍳",
      path: "/chef",
      color: "bg-gradient-to-r from-amber-400 to-amber-600",
      avatar: "/lovable-uploads/1d4662ea-cc69-4e4f-9c18-078726ebe91e.png",
      avatarFallback: "👨‍🍳",
      bgClass: "bg-amber-50",
      featured: false
    },
    {
      name: "Stylist's Helper",
      description: "Hair, fashion, and beauty advice from your personal AI stylist.",
      iconType: "scissors" as const,
      emoji: "💇",
      path: "/stylist",
      color: "bg-gradient-to-r from-pink-400 to-pink-600",
      avatar: "/lovable-uploads/8b852c7f-6b8c-40ef-9d7a-b38e45699b56.png",
      avatarFallback: "💇",
      bgClass: "bg-pink-50",
      featured: false
    }
  ];

  // Filter featured products
  const featuredProducts = products.filter(product => product.featured);

  const benefits = [
    "No appointments necessary",
    "Available 24/7",
    "Step-by-step guidance",
    "Photo diagnosis",
    "Save money on service calls",
    "Fix it yourself with confidence"
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section - Angi/TaskRabbit Inspired */}
      <section className="bg-gradient-to-r from-blue-50 to-indigo-50 pt-16 pb-24">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-1/2 space-y-6">
              <h1 className="text-4xl md:text-5xl font-bold text-primary leading-tight">
                Fix anything at home with AI assistance
              </h1>
              <p className="text-xl text-gray-700">
                Your personal AI experts for every home challenge — available instantly, any time.
              </p>
              
              {/* Search Bar - TaskRabbit Inspired */}
              <form onSubmit={handleSearchSubmit} className="mt-8 relative">
                <div className="flex">
                  <div className="relative flex-grow">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <Input 
                      type="text" 
                      placeholder="What needs fixing?" 
                      className="pl-10 pr-4 py-6 w-full text-lg rounded-l-lg border-r-0 focus-visible:ring-blue-400" 
                      value={searchInput}
                      onChange={handleSearchChange}
                    />
                  </div>
                  <Button type="submit" className="rounded-l-none py-6 px-8 text-lg" size="lg">
                    Get Help
                  </Button>
                </div>
              </form>
              
              {/* Benefits - Angi Inspired */}
              <div className="grid grid-cols-2 gap-3 mt-6">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span className="text-gray-700">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="md:w-1/2">
              <div className="relative rounded-xl overflow-hidden shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1621905252472-943afaa20e20?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80" 
                  alt="Home repairs" 
                  className="w-full h-auto object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/70 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-6 text-white">
                  <p className="text-xl font-semibold">Get expert help instantly</p>
                  <p>No waiting for service appointments</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Helpers Section - TaskRabbit Card Style */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-primary mb-4">Featured Helpers</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Our most popular AI assistants ready to help you solve home challenges
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredProducts.map((product, index) => (
              <motion.div
                key={product.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="h-full"
              >
                <Link to={product.path} className="block h-full no-underline group">
                  <Card className={`h-full hover:shadow-xl transition-all border border-gray-200 group-hover:border-blue-200 relative overflow-hidden`}>
                    <div className="absolute top-4 right-4 z-10">
                      <div className="bg-yellow-400 text-yellow-900 p-1 px-3 rounded-full flex items-center shadow-md">
                        <Star className="h-3 w-3 fill-yellow-900 mr-1" />
                        <span className="text-xs font-bold">Featured</span>
                      </div>
                    </div>
                    <CardHeader className="p-6 pb-4">
                      <div className="flex items-center gap-4">
                        <Avatar className="h-16 w-16 border-2 border-blue-100 bg-blue-50">
                          <AvatarImage src={product.avatar} alt={product.name} />
                          <AvatarFallback className="text-2xl">{product.avatarFallback}</AvatarFallback>
                        </Avatar>
                        <div>
                          <CardTitle className="text-2xl text-primary">
                            {product.name}
                          </CardTitle>
                          <div className="flex items-center mt-1">
                            <div className="flex">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <Star key={star} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                              ))}
                            </div>
                            <span className="text-sm text-gray-500 ml-2">5.0 (250+ fixes)</span>
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="px-6">
                      <p className="text-gray-700">{product.description}</p>
                      
                      <div className="mt-4 flex flex-wrap gap-2">
                        <Badge variant="outline" className="bg-blue-50 font-normal">No appointment</Badge>
                        <Badge variant="outline" className="bg-green-50 font-normal">24/7 help</Badge>
                        <Badge variant="outline" className="bg-purple-50 font-normal">Photo diagnosis</Badge>
                      </div>
                    </CardContent>
                    <CardFooter className="p-6 pt-4">
                      <Button className="w-full" size="lg">
                        Get Started
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </CardFooter>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
          
          <div className="text-center mt-10">
            <Button asChild variant="outline" size="lg">
              <Link to="/all-helpers">See All Helpers</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Live Fix Feed */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-primary mb-4">Live Activity</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              See what others are fixing right now with our AI assistants
            </p>
          </div>
          <LiveFixFeed specialty="gadget" />
        </div>
      </section>

      {/* How It Works Section - Angi Style */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-primary mb-4">How EveryFixAI Works</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Get expert help in three simple steps
            </p>
          </div>
          <EveryFixHowItWorks />
        </div>
      </section>

      {/* Helper Cards Grid - TaskRabbit Inspired */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-primary mb-4">Explore All Helpers</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Select the expert that matches your current challenge
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product, index) => (
              <motion.div
                key={product.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className="h-full"
              >
                <Link to={product.path} className="block h-full no-underline group">
                  <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-all h-full flex flex-col">
                    <div className="flex items-center gap-3 mb-4">
                      <Avatar className="h-12 w-12 bg-blue-50">
                        <AvatarImage src={product.avatar} alt={product.name} />
                        <AvatarFallback>{product.avatarFallback}</AvatarFallback>
                      </Avatar>
                      <h3 className="font-semibold text-lg text-primary">{product.name}</h3>
                    </div>
                    
                    <p className="text-gray-600 text-sm mb-4 flex-grow">{product.description}</p>
                    
                    <Button variant="outline" className="w-full group-hover:bg-blue-50 transition-colors">
                      Get Help
                      <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <footer className="bg-primary text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">EveryFixAI</h3>
              <p className="text-white/80">
                Your personal AI assistants for every home challenge. Available 24/7 to help you fix anything.
              </p>
            </div>
            
            <div>
              <h3 className="text-xl font-bold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><Link to="/" className="text-white/80 hover:text-white">Home</Link></li>
                <li><Link to="/about" className="text-white/80 hover:text-white">About Us</Link></li>
                <li><Link to="/contact" className="text-white/80 hover:text-white">Contact</Link></li>
                <li><Link to="/blog" className="text-white/80 hover:text-white">Blog</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-xl font-bold mb-4">Contact Us</h3>
              <p className="text-white/80">Have questions or feedback? We'd love to hear from you.</p>
              <Button variant="outline" className="mt-4 border-white text-white hover:bg-white hover:text-primary">
                Contact Support
              </Button>
            </div>
          </div>
          
          <div className="border-t border-white/20 mt-8 pt-8 text-center text-white/60">
            <p>© 2023 EveryFixAI. All rights reserved.</p>
            <p className="mt-2">For emergencies or complex issues, always consult a professional.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default EveryFixHome;
