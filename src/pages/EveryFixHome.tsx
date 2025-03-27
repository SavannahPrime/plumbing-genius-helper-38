
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Wrench, Leaf, Sparkles, Zap, Settings, Smartphone, ChefHat, Scissors, Play, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
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

  // Animation to cycle through active videos count
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveVideos(prev => (prev + 1) % 4);
    }, 3000);
    
    return () => clearInterval(interval);
  }, []);

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
      videoTitle: "Fixing a Sink Leak",
      placeholderText: "AI Plumber in action"
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
      videoTitle: "Stain Removal Techniques",
      placeholderText: "AI Cleaning Expert in action"
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
      videoTitle: "Wall Repair Step-by-Step",
      placeholderText: "AI Handyman in action"
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
      videoTitle: "Light Fixture Installation",
      placeholderText: "AI Electrician in action"
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
      videoTitle: "Garden Bed Setup",
      placeholderText: "AI Landscaper in action"
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
      videoTitle: "Oil Change Tutorial",
      placeholderText: "AI Mechanic in action"
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
      videoTitle: "Phone Troubleshooting",
      placeholderText: "AI Tech Expert in action"
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
      videoTitle: "Recipe Rescue Tips",
      placeholderText: "AI Chef in action"
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
      videoTitle: "Hair Styling Tutorial",
      placeholderText: "AI Stylist in action"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col items-center justify-center text-center">
            <h1 className="text-3xl md:text-5xl font-bold font-space-grotesk text-primary mb-2">
              EveryFixAI
            </h1>
            <p className="text-gray-600 max-w-2xl mx-auto mb-4">
              Your personal AI assistants for every home challenge — from plumbing and electrical to cleaning and landscaping.
            </p>
            <div className="flex flex-wrap justify-center gap-2 mt-2">
              <Badge variant="outline" className="bg-blue-50">No appointments</Badge>
              <Badge variant="outline" className="bg-green-50">24/7 availability</Badge>
              <Badge variant="outline" className="bg-amber-50">Step-by-step guidance</Badge>
              <Badge variant="outline" className="bg-purple-50">Photo diagnosis</Badge>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Featured Video Section */}
        <section className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold font-space-grotesk mb-2">Featured Video Tutorials</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Watch how our AI assistants can help you tackle common household challenges
            </p>
          </div>
          
          <div className="relative px-10 md:px-16">
            <Carousel className="w-full">
              <CarouselContent>
                {products.slice(0, 4).map((product, index) => (
                  <CarouselItem key={product.name} className="md:basis-1/2 lg:basis-1/3">
                    <div className="p-1">
                      <Card className="overflow-hidden">
                        <div className="relative aspect-video bg-gray-100 flex items-center justify-center">
                          <div className="absolute inset-0 flex items-center justify-center">
                            {/* Placeholder for video - replace with actual video component when available */}
                            <div className={`w-full h-full ${product.bgClass} flex flex-col items-center justify-center p-4`}>
                              <div className="w-16 h-16 rounded-full bg-white/30 flex items-center justify-center mb-3">
                                {createIcon(product.iconType)}
                              </div>
                              <p className="text-center text-gray-600">{product.placeholderText}</p>
                            </div>
                            <div className="absolute inset-0 flex items-center justify-center">
                              <button className="w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-100 transition-colors">
                                <Play className="h-6 w-6 text-primary ml-1" />
                              </button>
                            </div>
                          </div>
                        </div>
                        <CardContent className="p-4">
                          <h3 className="font-medium text-lg">{product.videoTitle}</h3>
                          <p className="text-sm text-gray-500">With {product.name}</p>
                        </CardContent>
                      </Card>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
            
            <div className="flex justify-center mt-4 gap-1">
              {[0, 1, 2, 3].map((i) => (
                <div 
                  key={i} 
                  className={`w-2 h-2 rounded-full ${activeVideos === i ? 'bg-primary' : 'bg-gray-300'}`}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Live Fix Feed */}
        <section className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold font-space-grotesk mb-2">Live Activity</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              See what others are fixing right now with our AI assistants
            </p>
          </div>
          <LiveFixFeed specialty="gadget" />
        </section>

        {/* Helper Cards Grid */}
        <section className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold font-space-grotesk mb-2">Choose Your AI Helper</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Select the expert that matches your current challenge
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
            {products.map((product, index) => (
              <motion.div
                key={product.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link to={product.path} className="block h-full no-underline group">
                  <Card className={`h-full shadow-sm hover:shadow-md transition-all ${product.bgClass} cursor-pointer border border-gray-200 group-hover:border-gray-300`}>
                    <CardHeader className={`${product.color} text-white rounded-t-xl`}>
                      <div className="flex justify-between items-center">
                        <div>
                          <CardTitle className="text-xl font-bold">
                            {product.emoji} {product.name}
                          </CardTitle>
                          <CardDescription className="text-white/90 mt-1">
                            Your AI Assistant
                          </CardDescription>
                        </div>
                        <Avatar className="h-12 w-12 border-2 border-white">
                          <AvatarImage src={product.avatar} alt={product.name} />
                          <AvatarFallback className="text-xl">{product.avatarFallback}</AvatarFallback>
                        </Avatar>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-4">
                      <p className="text-gray-700">{product.description}</p>
                    </CardContent>
                    <CardFooter className="pt-0">
                      <Button className="w-full group-hover:bg-primary/90 transition-colors" variant="outline">
                        Explore {product.name}
                        <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </Button>
                    </CardFooter>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </section>

        {/* How It Works Section */}
        <section className="mb-16">
          <div className="bg-white rounded-xl shadow-sm p-8 border border-gray-100">
            <div className="text-center mb-8">
              <h2 className="text-2xl md:text-3xl font-bold font-space-grotesk mb-2">How EveryFixAI Works</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Get expert help in three simple steps
              </p>
            </div>
            <EveryFixHowItWorks />
          </div>
        </section>
      </main>

      <footer className="bg-white border-t py-8">
        <div className="container mx-auto px-4 text-center text-sm text-gray-500">
          <p>© 2023 EveryFixAI. All AI assistants are here to help you tackle home projects with confidence.</p>
          <p className="mt-2">For emergencies or complex issues, always consult a professional.</p>
        </div>
      </footer>
    </div>
  );
};

export default EveryFixHome;
