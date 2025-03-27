
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Home, MessageSquare, Image as ImageIcon, ChefHat, Utensils, Cookie, Cake, Apple, Coffee, Pizza, Timer, Soup, Wheat } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import QuickActionCategories from "@/components/shared/QuickActionCategories";
import { QuickActionCategory } from "@/components/shared/QuickActionCategories";

const Chef = () => {
  const navigate = useNavigate();

  const chefCategories: QuickActionCategory[] = [
    { 
      icon: <Utensils className="w-5 h-5" />, 
      name: "Cooking Techniques", 
      hoverText: "Learn essential cooking methods and skills",
      emoji: "🍳",
      path: "/glossary"
    },
    { 
      icon: <Cake className="w-5 h-5" />, 
      name: "Baking", 
      hoverText: "Recipes and tips for cakes, breads, and pastries",
      emoji: "🍰",
      path: "/glossary"
    },
    { 
      icon: <Pizza className="w-5 h-5" />, 
      name: "Meal Ideas", 
      hoverText: "Quick and creative meal suggestions",
      emoji: "🍕",
      path: "/glossary"
    },
    { 
      icon: <Apple className="w-5 h-5" />, 
      name: "Ingredient Subs", 
      hoverText: "Find alternatives for missing ingredients",
      emoji: "🥑",
      path: "/glossary"
    },
    { 
      icon: <Soup className="w-5 h-5" />, 
      name: "Troubleshooting", 
      hoverText: "Fix cooking mistakes and recipe problems",
      emoji: "🥘",
      path: "/glossary"
    },
    { 
      icon: <Coffee className="w-5 h-5" />, 
      name: "Beverages", 
      hoverText: "Cocktails, mocktails, coffee, and tea recipes",
      emoji: "🍹",
      path: "/glossary"
    },
    { 
      icon: <Timer className="w-5 h-5" />, 
      name: "Meal Prep", 
      hoverText: "Time-saving tips and batch cooking ideas",
      emoji: "⏱️",
      path: "/glossary"
    },
    { 
      icon: <Wheat className="w-5 h-5" />, 
      name: "Dietary Needs", 
      hoverText: "Vegan, gluten-free, keto, and other special diets",
      emoji: "🌱",
      path: "/glossary"
    },
  ];

  return (
    <div className="min-h-screen bg-amber-50 font-dm-sans text-primary">
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Button variant="ghost" onClick={() => navigate("/")} className="mr-2">
              <Home className="w-5 h-5" />
            </Button>
            <ChefHat className="w-7 h-7 text-amber-500" />
            <span className="font-space-grotesk font-bold text-xl text-primary">
              Chef's Assistant
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
              <div className="w-48 h-48 md:w-72 md:h-72 rounded-full bg-amber-200 flex items-center justify-center">
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
                  <div className="text-8xl">👨‍🍳</div>
                </motion.div>
              </div>
              
              <div className="absolute -top-12 -right-16 md:-right-24 bg-white rounded-2xl p-3 shadow-card after:content-[''] after:absolute after:bottom-0 after:left-6 after:w-4 after:h-4 after:bg-white after:rotate-45 after:-mb-2">
                <p className="text-sm md:text-base font-medium">Let's create something delicious!</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="md:col-span-8 order-1 md:order-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 font-space-grotesk">Your AI Cooking Companion</h2>
            
            <p className="mb-6 text-lg text-primary/80">
              Your cooking companion — recipes, techniques, and kitchen problem-solving.
              <Badge className="ml-2 bg-amber-100 text-primary">💡 From basic to gourmet</Badge>
            </p>
            
            <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
              <div className="flex items-center space-x-2 mb-3">
                <div className="rounded-full bg-amber-100 p-2">
                  <Cookie className="w-4 h-4 text-amber-600" />
                </div>
                <p className="font-medium">What's in Your Pantry?</p>
              </div>
              <p className="text-sm text-gray-600 mb-3">Tell me what ingredients you have, and I'll suggest recipes you can make</p>
              <Button 
                variant="outline" 
                className="w-full border-amber-200 hover:bg-amber-50"
                onClick={() => navigate("/chat?specialty=chef")}
              >
                Find Recipes with Your Ingredients
              </Button>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <Button 
                className="w-full sm:w-auto text-lg py-6 px-8 bg-amber-600 hover:bg-amber-700 shadow-md active:scale-[0.98] transition-all rounded-xl"
                onClick={() => navigate("/chat?specialty=chef")}
              >
                <MessageSquare className="w-5 h-5 mr-2" />
                Ask Chef
              </Button>
              <Button 
                className="w-full sm:w-auto text-lg py-6 px-8 bg-amber-800 hover:bg-amber-900 text-white shadow-md active:scale-[0.98] transition-all rounded-xl"
                onClick={() => navigate("/diagnosis?specialty=chef")}
              >
                <ImageIcon className="w-5 h-5 mr-2" />
                Analyze Food Photo
              </Button>
            </div>
            
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <p className="text-sm font-medium mb-2">Try asking:</p>
              <div className="space-y-2">
                <div className="bg-amber-50 p-2 rounded">
                  "How do I make pasta sauce from scratch?"
                </div>
                <div className="bg-amber-50 p-2 rounded">
                  "Why did my cake sink in the middle?"
                </div>
                <div className="bg-amber-50 p-2 rounded">
                  "What can I make with chicken and spinach?"
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        <QuickActionCategories 
          title="🍽️ Culinary Solutions" 
          categories={chefCategories} 
        />
      </main>
    </div>
  );
};

export default Chef;
