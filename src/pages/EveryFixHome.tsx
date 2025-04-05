
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Wrench, Leaf, Sparkles, Zap, Settings, Smartphone, ChefHat, Scissors, Play, ArrowRight, Star, Scale, UserRound, Briefcase, HeartPulse, FileText } from "lucide-react";
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
import { PageLayout } from "@/components/shared/PageLayout";

const EveryFixHome = () => {
  const [activeVideos, setActiveVideos] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveVideos(prev => (prev + 1) % 4);
    }, 3000);
    
    return () => clearInterval(interval);
  }, []);

  const products = [
    // Home services
    {
      name: "Home Fix Wizard",
      description: "Your AI home repair expert. Fix leaks, clogs, and more without calling a contractor.",
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
      name: "Handyman Hero",
      description: "Fix furniture, patch walls, hang shelves — no handyman required.",
      iconType: "hammer" as const,
      emoji: "🔨",
      path: "/handyman",
      color: "bg-gradient-to-r from-orange-400 to-orange-600",
      avatar: "/lovable-uploads/c8ef72aa-6bbc-4cde-a827-e42f3bc112a0.png",
      avatarFallback: "🔨",
      bgClass: "bg-orange-50",
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
      featured: false
    },
    
    // New premium services
    {
      name: "Tax Law Attorney",
      description: "Expert AI tax advice and legal guidance for complex financial situations.",
      iconType: "scale" as const,
      emoji: "⚖️",
      path: "/tax-attorney",
      color: "bg-gradient-to-r from-indigo-400 to-indigo-600",
      avatar: "/lovable-uploads/c8ef72aa-6bbc-4cde-a827-e42f3bc112a0.png",
      avatarFallback: "⚖️",
      bgClass: "bg-indigo-50",
      featured: true
    },
    {
      name: "Confidential Psychiatrist",
      description: "Private AI mental health consultation and guidance for emotional well-being.",
      iconType: "user" as const,
      emoji: "🧠",
      path: "/psychiatrist",
      color: "bg-gradient-to-r from-teal-400 to-teal-600",
      avatar: "/lovable-uploads/8b852c7f-6b8c-40ef-9d7a-b38e45699b56.png",
      avatarFallback: "🧠",
      bgClass: "bg-teal-50",
      featured: true
    },
    {
      name: "Financial Advisor",
      description: "Professional AI investment planning and financial guidance tailored to your goals.",
      iconType: "briefcase" as const,
      emoji: "💼",
      path: "/financial-advisor",
      color: "bg-gradient-to-r from-emerald-400 to-emerald-600",
      avatar: "/lovable-uploads/1d4662ea-cc69-4e4f-9c18-078726ebe91e.png",
      avatarFallback: "💼",
      bgClass: "bg-emerald-50",
      featured: true
    },
    {
      name: "Wellness Coach",
      description: "Personalized AI health and wellness guidance for a balanced lifestyle.",
      iconType: "heartPulse" as const,
      emoji: "❤️",
      path: "/wellness-coach",
      color: "bg-gradient-to-r from-rose-400 to-rose-600",
      avatar: "/lovable-uploads/8b852c7f-6b8c-40ef-9d7a-b38e45699b56.png",
      avatarFallback: "❤️",
      bgClass: "bg-rose-50",
      featured: false
    },
    {
      name: "Legal Consultant",
      description: "General AI legal advice for everyday matters and common legal questions.",
      iconType: "fileText" as const,
      emoji: "📄",
      path: "/legal-consultant",
      color: "bg-gradient-to-r from-stone-400 to-stone-600",
      avatar: "/lovable-uploads/c8ef72aa-6bbc-4cde-a827-e42f3bc112a0.png",
      avatarFallback: "📄",
      bgClass: "bg-stone-50",
      featured: false
    },
    
    // Keep other existing services
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

  const featuredProducts = products.filter(product => product.featured);

  return (
    <PageLayout>
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
        <header className="bg-white shadow-sm">
          <div className="container mx-auto px-4 py-6">
            <div className="flex flex-col items-center justify-center text-center">
              <h1 className="text-3xl md:text-5xl font-bold font-space-grotesk text-primary mb-2">
                Connect.Software
              </h1>
              <p className="text-gray-600 max-w-2xl mx-auto mb-4">
                Connecting you with Software agents of any types of knowledge and expertise, available 24/7, also by voice!
              </p>
              <div className="flex flex-wrap justify-center gap-2 mt-2">
                <Badge variant="outline" className="bg-blue-50">No appointments</Badge>
                <Badge variant="outline" className="bg-green-50">24/7 availability</Badge>
                <Badge variant="outline" className="bg-amber-50">Professional guidance</Badge>
                <Badge variant="outline" className="bg-purple-50">Voice-enabled</Badge>
              </div>
            </div>
          </div>
        </header>

        <main className="container mx-auto px-4 py-8">
          <section className="mb-12">
            <div className="text-center mb-6">
              <h2 className="text-2xl md:text-3xl font-bold font-space-grotesk mb-2">Featured Services</h2>
              <p className="text-gray-600 max-w-2xl mx-auto text-sm">
                Our most popular AI agents ready to help with both everyday tasks and specialized guidance
              </p>
            </div>
            
            <div className="relative mx-auto max-w-5xl px-8">
              <Carousel opts={{ align: "start", loop: true }}>
                <CarouselContent>
                  {featuredProducts.map((product, index) => (
                    <CarouselItem key={product.name} className="md:basis-1/2 lg:basis-1/3">
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className="h-full p-1"
                      >
                        <Link to={product.path} className="block h-full no-underline group">
                          <Card className={`h-full shadow-sm hover:shadow-md transition-all ${product.bgClass} cursor-pointer border border-gray-200 group-hover:border-gray-300 relative overflow-hidden`}>
                            <div className="absolute top-2 right-2 z-10">
                              <div className="bg-yellow-300 text-yellow-900 p-1 rounded-full flex items-center">
                                <Star className="h-3 w-3 fill-yellow-900 mr-1" />
                                <span className="text-xs font-medium">Featured</span>
                              </div>
                            </div>
                            <CardHeader className={`${product.color} text-white rounded-t-xl p-4`}>
                              <div className="flex justify-between items-center">
                                <div>
                                  <CardTitle className="text-lg font-bold">
                                    {product.emoji} {product.name}
                                  </CardTitle>
                                  <CardDescription className="text-white/90 text-xs mt-1">
                                    Your AI Assistant
                                  </CardDescription>
                                </div>
                                <Avatar className="h-10 w-10 border-2 border-white">
                                  <AvatarImage src={product.avatar} alt={product.name} />
                                  <AvatarFallback className="text-sm">{product.avatarFallback}</AvatarFallback>
                                </Avatar>
                              </div>
                            </CardHeader>
                            <CardContent className="pt-3 p-4">
                              <p className="text-gray-700 text-sm">{product.description}</p>
                            </CardContent>
                            <CardFooter className="pt-0 p-4">
                              <Button className="w-full group-hover:bg-primary/90 transition-colors text-sm py-1" variant="outline">
                                Explore
                                <ArrowRight className="ml-2 h-3 w-3 transition-transform group-hover:translate-x-1" />
                              </Button>
                            </CardFooter>
                          </Card>
                        </Link>
                      </motion.div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="left-0" />
                <CarouselNext className="right-0" />
              </Carousel>
            </div>
          </section>

          <section className="mb-16">
            <LiveFixFeed specialty="gadget" />
          </section>

          <section className="mb-16">
            <div className="text-center mb-8">
              <h2 className="text-2xl md:text-3xl font-bold font-space-grotesk mb-2">Choose Your AI Assistant</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                From practical home services to premium professional guidance
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

          <section className="mb-16">
            <div className="bg-white rounded-xl shadow-sm p-8 border border-gray-100">
              <div className="text-center mb-8">
                <h2 className="text-2xl md:text-3xl font-bold font-space-grotesk mb-2">How Connect.Software Works</h2>
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
            <p>© {new Date().getFullYear()} Connect.Software. All virtual AI assistants are available 24/7 to assist with your needs.</p>
            <p className="mt-2">For emergencies or complex issues requiring immediate human intervention, please consult a professional.</p>
          </div>
        </footer>
      </div>
    </PageLayout>
  );
};

export default EveryFixHome;
