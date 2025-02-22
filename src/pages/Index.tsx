
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Wrench, MessageSquare, Image as ImageIcon, AlertTriangle, Settings } from "lucide-react";
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
    title: "Common Fixes",
    description: "Step-by-step repair guides with images",
    link: "/guides"
  },
  {
    icon: <AlertTriangle className="w-6 h-6 text-accent" />,
    title: "Emergency Support",
    description: "Quick access to emergency procedures",
    link: "/emergency"
  },
];

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/5">
      <header className="container mx-auto px-4 py-6 bg-white/80 backdrop-blur-sm border-b">
        <nav className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Wrench className="w-8 h-8 text-primary" />
            <span className="text-xl font-bold text-primary">Plumber's Helper</span>
          </div>
          <div className="hidden md:flex items-center space-x-6">
            {features.map((feature) => (
              <Link 
                key={feature.title}
                to={feature.link} 
                className="nav-item text-gray-600 hover:text-primary transition-colors"
              >
                {feature.title}
              </Link>
            ))}
          </div>
        </nav>
      </header>

      <main className="container mx-auto px-4 py-16">
        <div className="text-center max-w-3xl mx-auto">
          <motion.h1 
            className="text-4xl md:text-6xl font-bold text-primary mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Your AI-Powered Plumbing Assistant
          </motion.h1>
          <motion.p 
            className="text-lg md:text-xl text-gray-600 mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Get instant solutions for your plumbing problems with our intelligent assistant. 
            Upload photos, follow guides, and solve issues quickly.
          </motion.p>
          <motion.div 
            className="flex flex-col sm:flex-row justify-center gap-4 mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Link to="/chat">
              <Button size="lg" variant="default" className="w-full sm:w-auto">
                <MessageSquare className="mr-2" />
                Start Chat
              </Button>
            </Link>
            <Link to="/diagnosis">
              <Button size="lg" variant="secondary" className="w-full sm:w-auto">
                <ImageIcon className="mr-2" />
                Visual Diagnosis
              </Button>
            </Link>
          </motion.div>
        </div>

        <motion.div 
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          {features.map((feature, index) => (
            <Link to={feature.link} key={index}>
              <Card className="h-full p-6 glass-panel hover:scale-105 transition-transform duration-200 cursor-pointer">
                <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2 text-primary">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </Card>
            </Link>
          ))}
        </motion.div>
      </main>
    </div>
  );
};

export default Index;
