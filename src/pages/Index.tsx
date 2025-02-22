
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Wrench, MessageSquare, Image as ImageIcon, MoreVertical } from "lucide-react";
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
  }
];

const Index = () => {
  return (
    <div className="min-h-screen bg-[#F5F5F5]">
      {/* Header Section */}
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
            className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Link to="/chat">
              <Button 
                className="w-full sm:w-auto text-lg py-6 px-8 bg-[#0A2540] hover:bg-[#0A2540]/90 shadow-md active:scale-[0.98] transition-all"
              >
                <MessageSquare className="w-5 h-5 mr-2" />
                Start Chat
              </Button>
            </Link>
            <Link to="/diagnosis">
              <Button 
                variant="secondary"
                className="w-full sm:w-auto text-lg py-6 px-8 shadow-md active:scale-[0.98] transition-all"
              >
                <ImageIcon className="w-5 h-5 mr-2" />
                Visual Diagnosis
              </Button>
            </Link>
          </motion.div>
        </div>

        {/* Feature Cards */}
        <motion.div 
          className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
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
      </main>
    </div>
  );
};

export default Index;
