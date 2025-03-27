
import React from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { MessageSquare, Camera, Smartphone } from "lucide-react";
import EveryFixHeader from "@/components/shared/EveryFixHeader";

const GadgetFixGenie = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <EveryFixHeader 
        title="Gadget Fix Genie" 
        icon={<Smartphone className="h-6 w-6 text-white" />} 
        colorClass="w-10 h-10 rounded-full bg-gradient-to-r from-purple-400 to-purple-600 flex items-center justify-center" 
      />

      <main className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h1 className="text-3xl md:text-4xl font-bold mb-6">
            <span className="text-4xl">📱</span> Your Electronics Troubleshooting Expert
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Expert help for phones, tablets, routers, and other electronic devices that aren't working correctly.
          </p>
          
          <div className="p-6 bg-purple-50 rounded-xl text-left mb-8 border border-purple-100">
            <h2 className="text-xl font-semibold mb-2">Common Issue: "My iPad won't charge"</h2>
            <p className="text-gray-700">
              We can help identify if it's a port issue, cable problem, or power adapter fault - then guide you through the fix.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
            <Button 
              size="lg" 
              className="h-auto py-6 px-4 bg-purple-600 hover:bg-purple-700"
              onClick={() => navigate("/chat?specialty=gadget")}
            >
              <div className="flex flex-col items-center">
                <MessageSquare className="h-8 w-8 mb-2" />
                <span className="text-lg font-medium">Start Chat</span>
                <span className="text-sm font-normal mt-1">
                  Describe your device issue in detail
                </span>
              </div>
            </Button>
            
            <Button 
              variant="secondary" 
              size="lg" 
              className="h-auto py-6 px-4 bg-purple-200 text-purple-900 hover:bg-purple-300"
              onClick={() => navigate("/diagnosis?specialty=gadget")}
            >
              <div className="flex flex-col items-center">
                <Camera className="h-8 w-8 mb-2" />
                <span className="text-lg font-medium">Visual Analysis</span>
                <span className="text-sm font-normal mt-1">
                  Upload photos of your device or error message
                </span>
              </div>
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4">
              <span className="text-2xl">📱</span>
            </div>
            <h3 className="font-medium text-lg mb-2">Phone & Tablet Issues</h3>
            <p className="text-gray-600">
              Charging problems, screen issues, app crashes, connectivity troubleshooting and more.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4">
              <span className="text-2xl">🔌</span>
            </div>
            <h3 className="font-medium text-lg mb-2">Router & Internet</h3>
            <p className="text-gray-600">
              Wi-Fi connectivity issues, router setup, network optimization, and troubleshooting.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4">
              <span className="text-2xl">🖥️</span>
            </div>
            <h3 className="font-medium text-lg mb-2">Other Electronics</h3>
            <p className="text-gray-600">
              Smart home devices, remotes, peripherals, and other everyday electronic gadgets.
            </p>
          </div>
        </div>
      </main>

      <footer className="bg-white border-t py-8">
        <div className="container mx-auto px-4 text-center text-sm text-gray-500">
          <p>© 2023 EveryFixAI. All rights reserved.</p>
          <p className="mt-2">For serious hardware damage or internal component issues, please consult a professional repair service.</p>
        </div>
      </footer>
    </div>
  );
};

export default GadgetFixGenie;
