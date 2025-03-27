import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Wrench, MessageSquare, Image as ImageIcon, MoreVertical, Settings, Toilet, Droplet, Bath, Flame, Trash2, Info, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const features = [
  {
    icon: <MessageSquare className="w-6 h-6 text-secondary" />,
    title: "AI Chat Assistant",
    description: "Get instant help from our AI plumbing expert",
    link: "/chat"
  },
  {
    icon: <ImageIcon className="w-6 h-6 text-secondary" />,
    title: "Visual Diagnosis",
    description: "Upload photos for AI-powered problem identification",
    link: "/diagnosis"
  },
  {
    icon: <Settings className="w-6 h-6 text-secondary" />,
    title: "Common Problems",
    description: "Browse guides for frequent plumbing issues",
    link: "/fixes"
  }
];

const problemCategories = [
  { icon: <Toilet className="w-5 h-5" />, name: "Toilet", query: "I have a problem with my toilet." },
  { icon: <Droplet className="w-5 h-5" />, name: "Shower", query: "I have an issue with my shower." },
  { icon: <Droplet className="w-5 h-5" />, name: "Sink", query: "My sink is having problems." },
  { icon: <Bath className="w-5 h-5" />, name: "Bathtub", query: "I'm having issues with my bathtub." },
  { icon: <Flame className="w-5 h-5" />, name: "Water Heater", query: "My water heater isn't working properly." },
  { icon: <Trash2 className="w-5 h-5" />, name: "Garbage Disposal", query: "My garbage disposal is malfunctioning." },
  { icon: <Droplet className="w-5 h-5" />, name: "Leaking Pipe", query: "I have a leaking pipe." },
  { icon: <Droplet className="w-5 h-5" />, name: "Low Water Pressure", query: "I'm experiencing low water pressure." },
  { icon: <Info className="w-5 h-5" />, name: "Smells / Sewer", query: "There's a bad smell coming from my plumbing." },
];

const Index = () => {
  return (
    <div className="min-h-screen bg-[#F5F5F5]">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Wrench className="w-7 h-7 text-[#0A2540]" />
            <span className="font-inter font-bold text-xl text-[#0A2540]">
              Plumber's Helper
            </span>
          </div>
          <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <MoreVertical className="w-6 h-6 text-gray-600" />
          </button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="max-w-2xl mx-auto text-center mb-12">
          <motion.h1 
            className="font-inter font-bold text-[28px] md:text-[32px] text-[#0A2540] mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Your AI-Powered Plumbing Assistant
          </motion.h1>
          <motion.h2 
            className="font-roboto text-base md:text-lg text-gray-700 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Get instant solutions for your plumbing problems with our intelligent assistant. 
            Upload photos, follow guides, and solve issues quickly.
          </motion.h2>

          {/* CTA Buttons */}
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Link to="/chat">
              <Button 
                className="w-full sm:w-auto text-lg py-6 px-8 bg-[#0A2540] hover:bg-[#0A2540]/90 shadow-md active:scale-[0.98] transition-all"
              >
                <MessageSquare className="w-5 h-5 mr-2" />
                Talk to the AI Plumber
              </Button>
            </Link>
            <Link to="/diagnosis">
              <Button 
                variant="secondary"
                className="w-full sm:w-auto text-lg py-6 px-8 shadow-md active:scale-[0.98] transition-all"
              >
                <ImageIcon className="w-5 h-5 mr-2" />
                Upload a Problem Photo
              </Button>
            </Link>
          </motion.div>
          
          {/* Problem Categories Section */}
          <motion.div
            className="mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <h3 className="font-inter font-semibold text-xl text-gray-800 mb-4">
              Select Your Plumbing Problem
            </h3>
            <div className="overflow-x-auto pb-4">
              <div className="flex gap-2 justify-start min-w-max mx-auto max-w-full">
                {problemCategories.map((category, index) => (
                  <Link 
                    key={index} 
                    to={`/chat?problem=${encodeURIComponent(category.query)}`}
                    className="flex-shrink-0"
                  >
                    <Button 
                      variant="outline" 
                      className="bg-white hover:bg-gray-50 border-gray-200 py-6 px-4 h-auto flex flex-col gap-2 min-w-[90px]"
                    >
                      <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center">
                        {category.icon}
                      </div>
                      <span className="text-sm font-medium text-gray-800">
                        {category.name}
                      </span>
                    </Button>
                  </Link>
                ))}
              </div>
            </div>
            <div className="flex justify-center">
              <Link to="/chat" className="text-blue-600 hover:text-blue-800 text-sm flex items-center gap-1 font-medium">
                See all plumbing problems <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Feature Cards */}
        <motion.div 
          className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          {features.map((feature, index) => (
            <Link to={feature.link} key={index}>
              <Card className="p-6 hover:shadow-lg transition-shadow duration-200">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 rounded-full bg-[#00AEEF]/10 flex items-center justify-center flex-shrink-0">
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="font-inter font-bold text-lg text-gray-900 mb-2">
                      {feature.title}
                    </h3>
                    <p className="font-roboto text-base text-gray-700">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </motion.div>
        
        {/* Emergency Call-To-Action */}
        <motion.div
          className="max-w-4xl mx-auto mt-16 bg-red-50 border border-red-100 rounded-lg p-6 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.0 }}
        >
          <div className="flex flex-col items-center">
            <h3 className="font-inter font-semibold text-lg text-red-800 mb-2 flex items-center">
              <Info className="w-5 h-5 mr-2" /> Emergency Situation?
            </h3>
            <p className="text-red-700 mb-4">
              If water is gushing or pipes are broken, we recommend calling a licensed plumber.
            </p>
            <Button variant="outline" className="border-red-300 text-red-700 hover:bg-red-100">
              Find Local Plumber
            </Button>
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default Index;
