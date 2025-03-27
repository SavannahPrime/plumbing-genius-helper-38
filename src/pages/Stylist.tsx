
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Home, MessageSquare, Image as ImageIcon, Scissors, ShoppingBag, Palette, Shirt, Heart, Shirt as ShirtIcon, Brush, Sparkles, Camera } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import QuickActionCategories from "@/components/shared/QuickActionCategories";
import { QuickActionCategory } from "@/components/shared/QuickActionCategories";

const Stylist = () => {
  const navigate = useNavigate();

  const stylistCategories: QuickActionCategory[] = [
    { 
      icon: <Scissors className="w-5 h-5" />, 
      name: "Hair Advice", 
      hoverText: "Styles, cuts, color ideas, and hair care",
      emoji: "💇",
      path: "/chat"
    },
    { 
      icon: <Shirt className="w-5 h-5" />, 
      name: "Outfit Ideas", 
      hoverText: "Styling tips and outfit combinations",
      emoji: "👚",
      path: "/chat"
    },
    { 
      icon: <ShoppingBag className="w-5 h-5" />, 
      name: "Shopping Help", 
      hoverText: "Finding the right pieces for your wardrobe",
      emoji: "🛍️",
      path: "/chat"
    },
    { 
      icon: <Palette className="w-5 h-5" />, 
      name: "Color Analysis", 
      hoverText: "Find your best colors and seasonal palette",
      emoji: "🎨",
      path: "/chat"
    },
    { 
      icon: <ShirtIcon className="w-5 h-5" />, 
      name: "Body Types", 
      hoverText: "Dress for your shape and proportions",
      emoji: "👗",
      path: "/chat"
    },
    { 
      icon: <Brush className="w-5 h-5" />, 
      name: "Makeup Tips", 
      hoverText: "Techniques, product recommendations, and looks",
      emoji: "💄",
      path: "/chat"
    },
    { 
      icon: <Sparkles className="w-5 h-5" />, 
      name: "Special Events", 
      hoverText: "Styling for weddings, interviews, and occasions",
      emoji: "✨",
      path: "/chat"
    },
    { 
      icon: <Heart className="w-5 h-5" />, 
      name: "Personal Style", 
      hoverText: "Develop your signature look and aesthetic",
      emoji: "💖",
      path: "/chat"
    },
  ];

  return (
    <div className="min-h-screen bg-pink-50 font-dm-sans text-primary">
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Button variant="ghost" onClick={() => navigate("/")} className="mr-2">
              <Home className="w-5 h-5" />
            </Button>
            <Scissors className="w-7 h-7 text-pink-500" />
            <span className="font-space-grotesk font-bold text-xl text-primary">
              Stylist's Helper
            </span>
            <Badge variant="outline" className="ml-2">by EveryFixAI</Badge>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <section className="grid grid-cols-1 md:grid-cols-12 items-center gap-10 mb-12">
          <motion.div 
            className="md:col-span-4 flex justify-center relative order-2 md:order-1"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="relative">
              <div className="w-48 h-48 md:w-72 md:h-72 rounded-full bg-pink-200 flex items-center justify-center">
                <motion.div
                  animate={{ 
                    y: [0, -10, 0],
                  }}
                  transition={{ 
                    repeat: Infinity, 
                    duration: 3,
                    ease: "easeInOut"
                  }}
                >
                  <div className="text-8xl">💇</div>
                </motion.div>
              </div>
              
              <div className="absolute -top-12 -right-16 md:-right-24 bg-white rounded-2xl p-3 shadow-card after:content-[''] after:absolute after:bottom-0 after:left-6 after:w-4 after:h-4 after:bg-white after:rotate-45 after:-mb-2">
                <p className="text-sm md:text-base font-medium">Let's find your perfect style!</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="md:col-span-8 order-1 md:order-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 font-space-grotesk">Your AI Personal Stylist</h2>
            
            <p className="mb-6 text-lg text-primary/80">
              Hair, fashion, and beauty advice from your personal AI stylist.
              <Badge className="ml-2 bg-pink-100 text-primary">💡 Look & feel amazing</Badge>
            </p>
            
            <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
              <div className="flex items-center space-x-2 mb-3">
                <div className="rounded-full bg-pink-100 p-2">
                  <Camera className="w-4 h-4 text-pink-600" />
                </div>
                <p className="font-medium">Style Analyzer</p>
              </div>
              <p className="text-sm text-gray-600 mb-3">Upload a photo of clothing or hairstyle for personalized advice</p>
              <Button 
                variant="outline" 
                className="w-full border-pink-200 hover:bg-pink-50"
                onClick={() => navigate("/diagnosis")}
              >
                Upload Style Photo
              </Button>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <Button 
                className="w-full sm:w-auto text-lg py-6 px-8 bg-pink-500 hover:bg-pink-600 shadow-md active:scale-[0.98] transition-all rounded-xl"
                onClick={() => navigate("/chat")}
              >
                <MessageSquare className="w-5 h-5 mr-2" />
                Ask Stylist
              </Button>
              <Button 
                className="w-full sm:w-auto text-lg py-6 px-8 bg-pink-700 hover:bg-pink-800 text-white shadow-md active:scale-[0.98] transition-all rounded-xl"
                onClick={() => navigate("/diagnosis")}
              >
                <ImageIcon className="w-5 h-5 mr-2" />
                Photo Advice
              </Button>
            </div>
            
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <p className="text-sm font-medium mb-2">Try asking:</p>
              <div className="space-y-2">
                <div className="bg-pink-50 p-2 rounded">
                  "What hairstyle would suit my round face?"
                </div>
                <div className="bg-pink-50 p-2 rounded">
                  "How do I style a capsule wardrobe?"
                </div>
                <div className="bg-pink-50 p-2 rounded">
                  "What color lipstick works with olive skin?"
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        <QuickActionCategories 
          title="✨ Style Solutions" 
          categories={stylistCategories} 
        />
      </main>
    </div>
  );
};

export default Stylist;
