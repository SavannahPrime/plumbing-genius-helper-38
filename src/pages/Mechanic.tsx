
import React from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { MessageSquare, Camera, Settings, Gauge, Oil, Wrench, Sparkles, Battery, Car } from "lucide-react";
import EveryFixHeader from "@/components/shared/EveryFixHeader";
import QuickActionCategories from "@/components/shared/QuickActionCategories";
import { QuickActionCategory } from "@/components/shared/QuickActionCategories";

const Mechanic = () => {
  const navigate = useNavigate();

  const mechanicCategories: QuickActionCategory[] = [
    { 
      icon: <Gauge className="w-5 h-5" />, 
      name: "Engine Issues", 
      hoverText: "Check engine light, strange noises, performance problems",
      emoji: "🚗",
      path: "/chat"
    },
    { 
      icon: <Oil className="w-5 h-5" />, 
      name: "Fluid Leaks", 
      hoverText: "Oil, coolant, transmission, or brake fluid leaks",
      emoji: "💧",
      path: "/chat"
    },
    { 
      icon: <Battery className="w-5 h-5" />, 
      name: "Electrical", 
      hoverText: "Battery issues, lights, electrical components",
      emoji: "⚡",
      path: "/chat"
    },
    { 
      icon: <Wrench className="w-5 h-5" />, 
      name: "Brakes", 
      hoverText: "Squeaking, grinding, soft pedal, stopping issues",
      emoji: "🛑",
      path: "/chat"
    },
    { 
      icon: <Sparkles className="w-5 h-5" />, 
      name: "HVAC", 
      hoverText: "Heating, air conditioning, ventilation problems",
      emoji: "❄️",
      path: "/chat"
    },
    { 
      icon: <Settings className="w-5 h-5" />, 
      name: "Transmission", 
      hoverText: "Grinding, slipping, delayed shifting",
      emoji: "⚙️",
      path: "/chat"
    },
    { 
      icon: <Car className="w-5 h-5" />, 
      name: "Suspension", 
      hoverText: "Bumpy ride, alignment issues, steering problems",
      emoji: "🔧",
      path: "/chat"
    },
    { 
      icon: <Settings className="w-5 h-5" />, 
      name: "Maintenance", 
      hoverText: "Regular service, oil changes, filter replacements",
      emoji: "📆",
      path: "/chat"
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
        <div className="max-w-3xl mx-auto text-center mb-16">
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
              onClick={() => navigate("/chat")}
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

        <QuickActionCategories 
          title="🔧 Common Car Issues" 
          categories={mechanicCategories} 
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto mt-16">
          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-4">
              <span className="text-2xl">🚘</span>
            </div>
            <h3 className="font-medium text-lg mb-2">Diagnostic Help</h3>
            <p className="text-gray-600">
              Identify strange sounds, warning lights, fluid leaks, and performance issues with AI assistance.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-4">
              <span className="text-2xl">📋</span>
            </div>
            <h3 className="font-medium text-lg mb-2">DIY Repairs</h3>
            <p className="text-gray-600">
              Get step-by-step guidance for basic car maintenance and simple repairs you can do yourself.
            </p>
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
