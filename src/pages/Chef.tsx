
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import EveryFixHeader from "@/components/shared/EveryFixHeader";
import HowItWorks from "@/components/home/HowItWorks";
import LiveFixFeed from "@/components/home/LiveFixFeed";
import Footer from "@/components/home/Footer";
import QuickActionCategories from "@/components/shared/QuickActionCategories";
import { ChefHat, Camera, BookOpen } from "lucide-react";
import { motion } from "framer-motion";

const Chef = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-100 to-amber-200 overflow-x-hidden">
      <EveryFixHeader specialty="chef" />
      
      <main className="container mx-auto px-4 py-8">
        <section className="mb-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-8 p-8 rounded-2xl bg-gradient-to-br from-amber-50/60 to-amber-100/60 backdrop-blur-lg border border-amber-200/50 shadow-lg">
            <div className="text-left max-w-xl">
              <motion.h1 
                className="text-4xl font-bold mb-4 text-amber-900"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                Chef's Assistant
              </motion.h1>
              <motion.p 
                className="text-lg text-amber-800 mb-6"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                Get expert culinary guidance on recipes, techniques, ingredient substitutions, and kitchen troubleshooting. Let Chef Charlie help you become a kitchen master!
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <Button 
                  onClick={() => navigate("/chat?specialty=chef")} 
                  className="bg-amber-600 hover:bg-amber-700 text-white px-6 py-6 rounded-xl shadow-md transition-all hover:shadow-lg"
                >
                  Chat with Chef Charlie
                </Button>
              </motion.div>
            </div>
            
            <motion.div 
              className="relative w-64 h-64 md:w-80 md:h-80"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-amber-300/30 to-amber-500/30 rounded-full blur-2xl"></div>
              <img 
                src="/lovable-uploads/dbe43f04-5614-4eef-afdc-5014e05988f0.png" 
                alt="Chef Charlie" 
                className="w-full h-full object-contain z-10 relative"
              />
            </motion.div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              <Card className="bg-gradient-to-br from-amber-50/60 to-amber-100/60 backdrop-blur-lg border border-amber-200/50 shadow-lg hover:shadow-xl transition-all overflow-hidden group">
                <CardHeader className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-amber-500/20 to-amber-600/20 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                  <div className="relative z-10">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center mb-2 shadow-md">
                      <ChefHat className="h-6 w-6 text-white" />
                    </div>
                    <CardTitle className="text-amber-900">Chat with Chef's Assistant</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="relative z-10">
                  <p className="text-amber-800">Ask cooking questions and get personalized culinary advice from our AI chef, including recipe adjustments, cooking methods, and more.</p>
                </CardContent>
                <CardFooter className="relative z-10">
                  <Button onClick={() => navigate("/chat?specialty=chef")} className="w-full bg-amber-500 hover:bg-amber-600 text-white shadow-md">
                    Start Chat
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
            >
              <Card className="bg-gradient-to-br from-amber-50/60 to-amber-100/60 backdrop-blur-lg border border-amber-200/50 shadow-lg hover:shadow-xl transition-all overflow-hidden group">
                <CardHeader className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-amber-500/20 to-amber-600/20 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                  <div className="relative z-10">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center mb-2 shadow-md">
                      <Camera className="h-6 w-6 text-white" />
                    </div>
                    <CardTitle className="text-amber-900">Food Diagnosis</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="relative z-10">
                  <p className="text-amber-800">Upload photos of dishes, ingredients, or kitchen issues for expert analysis and suggestions. Our AI will help troubleshoot cooking problems.</p>
                </CardContent>
                <CardFooter className="relative z-10">
                  <Button onClick={() => navigate("/diagnosis?specialty=chef")} variant="outline" className="w-full border-amber-300 bg-amber-100/50 text-amber-800 hover:bg-amber-200/60 shadow-md">
                    Upload Photo
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3 }}
            >
              <Card className="bg-gradient-to-br from-amber-50/60 to-amber-100/60 backdrop-blur-lg border border-amber-200/50 shadow-lg hover:shadow-xl transition-all overflow-hidden group">
                <CardHeader className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-amber-500/20 to-amber-600/20 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                  <div className="relative z-10">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center mb-2 shadow-md">
                      <BookOpen className="h-6 w-6 text-white" />
                    </div>
                    <CardTitle className="text-amber-900">Cooking Guides</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="relative z-10">
                  <p className="text-amber-800">Browse our library of recipes, cooking techniques, and kitchen troubleshooting guides. Perfect for learning new skills and methods.</p>
                </CardContent>
                <CardFooter className="relative z-10">
                  <Button onClick={() => navigate("/chef/glossary")} variant="outline" className="w-full border-amber-300 bg-amber-100/50 text-amber-800 hover:bg-amber-200/60 shadow-md">
                    View Guides
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          </div>
        </section>
        
        <section className="mb-12 p-8 rounded-2xl bg-gradient-to-br from-amber-50/70 to-amber-100/70 backdrop-blur-lg border border-amber-200/50 shadow-lg">
          <HowItWorks specialty="chef" />
        </section>
        
        <section className="mb-12 p-8 rounded-2xl bg-gradient-to-br from-amber-100/70 to-amber-200/70 backdrop-blur-lg border border-amber-200/50 shadow-lg">
          <LiveFixFeed specialty="chef" />
        </section>
        
        <section className="mb-12 p-8 rounded-2xl bg-gradient-to-br from-amber-50/70 to-amber-100/70 backdrop-blur-lg border border-amber-200/50 shadow-lg">
          <h2 className="text-2xl font-bold mb-6 text-amber-900">Quick Cooking Solutions</h2>
          <QuickActionCategories specialty="chef" />
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Chef;
