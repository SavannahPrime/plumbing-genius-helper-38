
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Wrench, MessageSquare, Image as ImageIcon, AlertTriangle, Settings } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const features = [
  {
    icon: <MessageSquare className="w-6 h-6" />,
    title: "AI Chat Assistant",
    description: "Get instant help from our AI plumbing expert",
  },
  {
    icon: <ImageIcon className="w-6 h-6" />,
    title: "Visual Diagnosis",
    description: "Upload photos for AI-powered problem identification",
  },
  {
    icon: <Settings className="w-6 h-6" />,
    title: "Step-by-Step Guides",
    description: "Follow detailed repair instructions with images",
  },
  {
    icon: <AlertTriangle className="w-6 h-6" />,
    title: "Emergency Support",
    description: "Quick access to emergency procedures and contacts",
  },
];

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/5">
      <header className="container mx-auto px-4 py-6">
        <nav className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Wrench className="w-8 h-8 text-primary" />
            <span className="text-xl font-bold text-primary">Plumber's Helper</span>
          </div>
          <div className="hidden md:flex space-x-6">
            <Link to="/chat" className="nav-item">Chat</Link>
            <Link to="/diagnosis" className="nav-item">Diagnosis</Link>
            <Link to="/guides" className="nav-item">Guides</Link>
            <Link to="/emergency" className="nav-item">Emergency</Link>
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
            className="text-lg md:text-xl text-gray-600 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Get instant solutions for your plumbing problems with our intelligent assistant. 
            Upload photos, follow guides, and solve issues quickly.
          </motion.p>
          <motion.div 
            className="flex flex-col sm:flex-row justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Link to="/chat">
              <Button className="button-secondary w-full sm:w-auto">
                Start Chat
              </Button>
            </Link>
            <Link to="/diagnosis">
              <Button className="button-accent w-full sm:w-auto">
                Visual Diagnosis
              </Button>
            </Link>
          </motion.div>
        </div>

        <motion.div 
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          {features.map((feature, index) => (
            <Card key={index} className="p-6 glass-panel hover:scale-105 transition-transform duration-200">
              <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </Card>
          ))}
        </motion.div>
      </main>
    </div>
  );
};

export default Index;
