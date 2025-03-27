
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Home, MessageSquare, Image as ImageIcon, Car, Gauge, Battery, Thermometer, ActivitySquare, AlertTriangle, Wrench, Settings, Camera } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import QuickActionCategories from "@/components/shared/QuickActionCategories";
import { QuickActionCategory } from "@/components/shared/QuickActionCategories";
import EveryFixHeader from "@/components/shared/EveryFixHeader";
import { specializedAgents } from "@/services/specializedAgentService";

const Mechanic = () => {
  const navigate = useNavigate();
  const mechanicAgent = specializedAgents.mechanic;

  const mechanicCategories: QuickActionCategory[] = [
    { 
      icon: <Car className="w-5 h-5" />, 
      name: "Engine Issues", 
      hoverText: "Engine warning lights, strange noises, or performance problems",
      emoji: "🚗",
      path: "/mechanic/glossary"
    },
    { 
      icon: <Wrench className="w-5 h-5" />, 
      name: "Maintenance", 
      hoverText: "Regular service schedules and DIY maintenance tips",
      emoji: "🔧",
      path: "/mechanic/glossary"
    },
    { 
      icon: <Gauge className="w-5 h-5" />, 
      name: "Dashboard Warnings", 
      hoverText: "Help understanding dashboard warning lights",
      emoji: "⚠️",
      path: "/mechanic/glossary"
    },
    { 
      icon: <Battery className="w-5 h-5" />, 
      name: "Battery & Electrical", 
      hoverText: "Battery problems, electrical system issues, and fuses",
      emoji: "🔋",
      path: "/mechanic/glossary"
    },
    { 
      icon: <ActivitySquare className="w-5 h-5" />, 
      name: "Brakes & Suspension", 
      hoverText: "Brake noises, handling issues, and suspension problems",
      emoji: "🛑",
      path: "/mechanic/glossary"
    },
    { 
      icon: <Thermometer className="w-5 h-5" />, 
      name: "HVAC Issues", 
      hoverText: "Heating, cooling, and air conditioning problems",
      emoji: "❄️",
      path: "/mechanic/glossary"
    },
    { 
      icon: <Settings className="w-5 h-5" />, 
      name: "Transmission", 
      hoverText: "Shifting problems, strange noises, or fluid leaks",
      emoji: "⚙️",
      path: "/mechanic/glossary"
    },
    { 
      icon: <AlertTriangle className="w-5 h-5" />, 
      name: "Diagnostics", 
      hoverText: "Help troubleshooting vehicle problems",
      emoji: "🔍",
      path: "/mechanic/glossary"
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <EveryFixHeader 
        title="Mechanic Assistant" 
        icon={<Settings className="h-6 w-6 text-white" />} 
        colorClass="w-10 h-10 rounded-full bg-gradient-to-r from-red-400 to-red-600 flex items-center justify-center" 
      />

      <main className="container mx-auto px-4 py-12">
        <div className="max-w-5xl mx-auto mb-16">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="md:w-1/2 text-center md:text-left">
              <h1 className="text-3xl md:text-4xl font-bold mb-6">
                <span className="text-4xl">🔩</span> Your Virtual Auto Mechanic
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Diagnose car problems and get step-by-step repair guidance without expensive trips to the auto shop.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
                <Button 
                  size="lg" 
                  className="h-auto py-6 px-4"
                  onClick={() => navigate("/chat?specialty=mechanic")}
                >
                  <div className="flex flex-col items-center">
                    <MessageSquare className="h-8 w-8 mb-2" />
                    <span className="text-lg font-medium">Start Chat</span>
                    <span className="text-sm font-normal mt-1">
                      Explain your car problem and get expert advice
                    </span>
                  </div>
                </Button>
                
                <Button 
                  variant="secondary" 
                  size="lg" 
                  className="h-auto py-6 px-4"
                  onClick={() => navigate("/diagnosis")}
                >
                  <div className="flex flex-col items-center">
                    <Camera className="h-8 w-8 mb-2" />
                    <span className="text-lg font-medium">Photo Diagnosis</span>
                    <span className="text-sm font-normal mt-1">
                      Upload pictures of your car issue for visual analysis
                    </span>
                  </div>
                </Button>
              </div>
            </div>
            
            <div className="md:w-1/2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                className="relative"
              >
                {mechanicAgent.avatarImage && (
                  <img 
                    src={mechanicAgent.avatarImage} 
                    alt="Mechanic Assistant" 
                    className="max-w-full h-auto rounded-lg shadow-lg"
                  />
                )}
              </motion.div>
            </div>
          </div>
        </div>

        <QuickActionCategories 
          title="🔧 Common Car Issues" 
          categories={mechanicCategories} 
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto mt-16">
          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-4">
              <span className="text-2xl">🚘</span>
            </div>
            <h3 className="font-medium text-lg mb-2">Diagnostic Help</h3>
            <p className="text-gray-600">
              Identify strange sounds, warning lights, fluid leaks, and performance issues with AI assistance.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-md relative overflow-hidden">
            <div className="flex">
              <div className="w-1/2">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-4">
                  <span className="text-2xl">📋</span>
                </div>
                <h3 className="font-medium text-lg mb-2">Expert Guidance</h3>
                <p className="text-gray-600">
                  Get step-by-step guidance for car maintenance and simple repairs you can do yourself.
                </p>
              </div>
              
              <div className="w-1/2 flex justify-end">
                {mechanicAgent.actionImage && (
                  <img 
                    src={mechanicAgent.actionImage} 
                    alt="Mechanic with clipboard" 
                    className="h-36 rounded-lg"
                  />
                )}
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-4">
              <span className="text-2xl">💰</span>
            </div>
            <h3 className="font-medium text-lg mb-2">Cost Estimates</h3>
            <p className="text-gray-600">
              Understand the potential cost of repairs before visiting a mechanic shop.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-4">
              <span className="text-2xl">🔍</span>
            </div>
            <h3 className="font-medium text-lg mb-2">Preventive Maintenance</h3>
            <p className="text-gray-600">
              Learn how to maintain your vehicle to prevent costly repairs and extend its life.
            </p>
          </div>
        </div>
      </main>

      <footer className="bg-white border-t py-8">
        <div className="container mx-auto px-4 text-center text-sm text-gray-500">
          <p>© 2023 EveryFixAI. All rights reserved.</p>
          <p className="mt-2">For complex issues or safety-critical components, always consult a professional mechanic.</p>
        </div>
      </footer>
    </div>
  );
};

export default Mechanic;
