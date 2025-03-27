
import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ChefHat, Search, Camera, Upload, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import EveryFixHeader from "@/components/shared/EveryFixHeader";

const Chef = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-amber-100">
      <EveryFixHeader 
        title="Chef's Assistant" 
        icon={<ChefHat className="w-7 h-7 text-white" />} 
        colorClass="w-8 h-8 rounded-full bg-gradient-to-r from-amber-400 to-amber-600 flex items-center justify-center"
      />

      <main className="container mx-auto px-4 py-12">
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto text-center"
        >
          <h1 className="text-3xl md:text-4xl font-bold font-space-grotesk text-primary mb-4">
            Your AI Chef Assistant 👨‍🍳
          </h1>
          <p className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto">
            Get cooking advice, recipe help, ingredient substitutions, and kitchen troubleshooting from your personal AI chef.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            <Card className="bg-white shadow-lg hover:shadow-xl transition-all duration-300">
              <CardHeader className="bg-gradient-to-r from-amber-400 to-amber-600 text-white">
                <CardTitle className="text-xl flex items-center gap-2">
                  <Search className="h-5 w-5" /> Ask the Chef
                </CardTitle>
                <CardDescription className="text-amber-100">
                  Chat with our AI chef about any cooking question
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <p className="mb-4 text-gray-700">
                  Get help with recipes, techniques, ingredient substitutions, cooking times, meal planning, and more.
                </p>
                <div className="space-y-3 mb-6">
                  <div className="bg-amber-50 p-3 rounded-md text-sm text-gray-700">
                    "How do I make a roux?"
                  </div>
                  <div className="bg-amber-50 p-3 rounded-md text-sm text-gray-700">
                    "What can I substitute for buttermilk?"
                  </div>
                  <div className="bg-amber-50 p-3 rounded-md text-sm text-gray-700">
                    "How do I sharpen my chef's knife?"
                  </div>
                </div>
                <Button 
                  className="w-full bg-gradient-to-r from-amber-400 to-amber-600 hover:from-amber-500 hover:to-amber-700"
                  onClick={() => navigate("/chat")}
                >
                  Chat with Chef Assistant
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-white shadow-lg hover:shadow-xl transition-all duration-300">
              <CardHeader className="bg-gradient-to-r from-amber-400 to-amber-600 text-white">
                <CardTitle className="text-xl flex items-center gap-2">
                  <Camera className="h-5 w-5" /> Show & Fix
                </CardTitle>
                <CardDescription className="text-amber-100">
                  Upload a photo of your cooking issue
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <p className="mb-4 text-gray-700">
                  Take a photo of your dish, ingredients, or kitchen tool to get real-time troubleshooting and advice.
                </p>
                <div className="bg-amber-50 rounded-md p-4 mb-6 flex flex-col items-center justify-center">
                  <Upload className="h-10 w-10 text-amber-400 mb-2" />
                  <p className="text-sm text-gray-600 text-center">
                    Upload a photo of your cooking problem to get expert AI diagnosis
                  </p>
                </div>
                <Button 
                  className="w-full bg-gradient-to-r from-amber-400 to-amber-600 hover:from-amber-500 hover:to-amber-700"
                  onClick={() => navigate("/diagnosis")}
                >
                  Upload Photo
                </Button>
              </CardContent>
            </Card>
          </div>

          <section className="bg-white rounded-xl shadow-md p-6 mb-8">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-amber-500" /> What Chef's Assistant Can Help With
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {[
                "Recipe troubleshooting", 
                "Cooking techniques", 
                "Ingredient substitutions",
                "Kitchen tool help",
                "Food safety",
                "Meal planning",
                "Flavor combinations",
                "Dietary adjustments",
                "Cooking times"
              ].map((item, i) => (
                <div key={i} className="bg-amber-50 p-3 rounded-md text-sm">
                  {item}
                </div>
              ))}
            </div>
          </section>
        </motion.section>
      </main>
    </div>
  );
};

export default Chef;
