
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import EveryFixHeader from "@/components/shared/EveryFixHeader";
import HowItWorks from "@/components/home/HowItWorks";
import LiveFixFeed from "@/components/home/LiveFixFeed";
import Footer from "@/components/home/Footer";
import QuickActionCategories from "@/components/shared/QuickActionCategories";
import { Leaf, Trees, SproutIcon, Cloud, Shovel } from "lucide-react";
import { motion } from "framer-motion";

const Landscaper = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-emerald-100/50">
      <EveryFixHeader specialty="landscaper" />
      
      <main className="container mx-auto px-4 py-8">
        <section className="mb-12">
          <div className="text-center mb-8">
            <motion.span 
              className="inline-block text-5xl mb-4"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              🌿
            </motion.span>
            <motion.h1 
              className="text-3xl md:text-4xl font-bold mb-4 text-emerald-800 bg-gradient-to-r from-emerald-700 to-emerald-900 bg-clip-text text-transparent"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Landscaper Buddy
            </motion.h1>
            <motion.p 
              className="text-lg text-emerald-700 max-w-2xl mx-auto"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Get expert guidance on lawn care, gardening, outdoor maintenance, and plant health.
            </motion.p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Card className="backdrop-blur-md bg-white/80 shadow-lg hover:shadow-xl transition-all border-emerald-100/50 overflow-hidden group">
                <CardHeader className="bg-gradient-to-r from-emerald-500/90 to-emerald-600/90 rounded-t-lg border-b border-emerald-200/50">
                  <CardTitle className="text-white flex items-center gap-2">
                    <Trees className="h-5 w-5 text-white" />
                    Chat with Landscaper Buddy
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <p className="text-emerald-700">Ask questions about plants, lawn care, and outdoor maintenance for personalized advice.</p>
                </CardContent>
                <CardFooter>
                  <Button onClick={() => navigate("/chat?specialty=landscaper")} className="w-full bg-emerald-600 hover:bg-emerald-700 group-hover:shadow-md transition-all">
                    Start Chat
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Card className="backdrop-blur-md bg-white/80 shadow-lg hover:shadow-xl transition-all border-emerald-100/50 overflow-hidden group">
                <CardHeader className="bg-gradient-to-r from-emerald-400/90 to-emerald-500/90 rounded-t-lg border-b border-emerald-200/50">
                  <CardTitle className="text-white flex items-center gap-2">
                    <Leaf className="h-5 w-5 text-white" />
                    Plant Diagnosis
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <p className="text-emerald-700">Upload photos of plants, grass, or outdoor issues for instant identification and care tips.</p>
                </CardContent>
                <CardFooter>
                  <Button onClick={() => navigate("/diagnosis?specialty=landscaper")} variant="outline" className="w-full text-emerald-700 border-emerald-200 hover:bg-emerald-50 group-hover:shadow-md transition-all">
                    Upload Photo
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <Card className="backdrop-blur-md bg-white/80 shadow-lg hover:shadow-xl transition-all border-emerald-100/50 overflow-hidden group">
                <CardHeader className="bg-gradient-to-r from-emerald-300/90 to-emerald-400/90 rounded-t-lg border-b border-emerald-200/50">
                  <CardTitle className="text-white flex items-center gap-2">
                    <SproutIcon className="h-5 w-5 text-white" />
                    Landscaping Guides
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <p className="text-emerald-700">Browse our library of step-by-step guides for lawn care, gardening, and outdoor projects.</p>
                </CardContent>
                <CardFooter>
                  <Button onClick={() => navigate("/landscaper/glossary")} variant="outline" className="w-full text-emerald-700 border-emerald-200 hover:bg-emerald-50 group-hover:shadow-md transition-all">
                    View Guides
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          </div>
        </section>
        
        <section className="mb-12 backdrop-blur-lg bg-white/80 p-8 rounded-xl shadow-lg border border-emerald-100/30">
          <HowItWorks specialty="landscaper" />
        </section>
        
        <section className="mb-12 backdrop-blur-lg bg-emerald-100/70 p-8 rounded-xl shadow-lg border border-emerald-200/30">
          <LiveFixFeed specialty="landscaper" />
        </section>
        
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-emerald-800 bg-gradient-to-r from-emerald-700 to-emerald-900 bg-clip-text text-transparent">Quick Landscaping Solutions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="backdrop-blur-md bg-white/80 shadow-lg hover:shadow-xl transition-all hover:-translate-y-2 border-emerald-100/50 group">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg text-emerald-700 flex items-center gap-2">
                  <Leaf className="h-5 w-5 text-emerald-600" />
                  Lawn Care
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-emerald-600">Mowing, fertilizing, seeding, and troubleshooting common lawn issues.</p>
              </CardContent>
              <CardFooter>
                <Button size="sm" variant="ghost" onClick={() => navigate("/chat?specialty=landscaper&topic=lawn")} className="w-full text-emerald-700 hover:bg-emerald-50 group-hover:shadow-sm">
                  Learn More
                </Button>
              </CardFooter>
            </Card>
            
            <Card className="backdrop-blur-md bg-white/80 shadow-lg hover:shadow-xl transition-all hover:-translate-y-2 border-emerald-100/50 group">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg text-emerald-700 flex items-center gap-2">
                  <SproutIcon className="h-5 w-5 text-emerald-600" />
                  Plant Health
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-emerald-600">Diagnosing plant diseases, nutrient deficiencies, and pest problems.</p>
              </CardContent>
              <CardFooter>
                <Button size="sm" variant="ghost" onClick={() => navigate("/chat?specialty=landscaper&topic=plants")} className="w-full text-emerald-700 hover:bg-emerald-50 group-hover:shadow-sm">
                  Learn More
                </Button>
              </CardFooter>
            </Card>
            
            <Card className="backdrop-blur-md bg-white/80 shadow-lg hover:shadow-xl transition-all hover:-translate-y-2 border-emerald-100/50 group">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg text-emerald-700 flex items-center gap-2">
                  <Cloud className="h-5 w-5 text-emerald-600" />
                  Irrigation
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-emerald-600">Setting up and maintaining sprinkler systems, drip irrigation, and watering schedules.</p>
              </CardContent>
              <CardFooter>
                <Button size="sm" variant="ghost" onClick={() => navigate("/chat?specialty=landscaper&topic=irrigation")} className="w-full text-emerald-700 hover:bg-emerald-50 group-hover:shadow-sm">
                  Learn More
                </Button>
              </CardFooter>
            </Card>
            
            <Card className="backdrop-blur-md bg-white/80 shadow-lg hover:shadow-xl transition-all hover:-translate-y-2 border-emerald-100/50 group">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg text-emerald-700 flex items-center gap-2">
                  <Shovel className="h-5 w-5 text-emerald-600" />
                  Landscaping Projects
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-emerald-600">Building garden beds, pathways, retaining walls, and other outdoor structures.</p>
              </CardContent>
              <CardFooter>
                <Button size="sm" variant="ghost" onClick={() => navigate("/chat?specialty=landscaper&topic=projects")} className="w-full text-emerald-700 hover:bg-emerald-50 group-hover:shadow-sm">
                  Learn More
                </Button>
              </CardFooter>
            </Card>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Landscaper;
