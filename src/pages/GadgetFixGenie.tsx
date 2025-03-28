
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import EveryFixHeader from "@/components/shared/EveryFixHeader";
import EveryFixHowItWorks from "@/components/home/EveryFixHowItWorks";
import LiveFixFeed from "@/components/home/LiveFixFeed";
import Footer from "@/components/home/Footer";
import QuickActionCategories from "@/components/shared/QuickActionCategories";
import ModernHero from "@/components/home/ModernHero";
import { Cpu, Wifi, Smartphone, Laptop, Monitor, Headphones, Speaker, Bluetooth, HardDrive, Sparkles } from "lucide-react";

const GadgetFixGenie = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 via-violet-50 to-purple-50">
      <EveryFixHeader specialty="gadget" />
      
      <main>
        {/* Hero Section with improved styling */}
        <div className="relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-indigo-500/5 z-0"></div>
          <div className="absolute top-10 right-10 w-64 h-64 bg-indigo-300/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 left-10 w-72 h-72 bg-purple-300/20 rounded-full blur-3xl"></div>
          
          <ModernHero 
            title="Gadget Fix Genie"
            specialty="gadget"
            emoji="✨"
            description="Troubleshoot your tech without calling IT support."
            placeholderText="What device is giving you trouble?"
          />
        </div>
        
        {/* How It Works Section */}
        <section className="py-12 bg-gradient-to-r from-indigo-100/50 to-purple-100/50 backdrop-blur-lg border-y border-indigo-200/30">
          <div className="container mx-auto px-4">
            <EveryFixHowItWorks specialty="gadget" />
          </div>
        </section>
        
        {/* Tech Category Icons Section */}
        <section className="py-16 container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-8 text-center text-indigo-800">What can we help you fix?</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            {[
              { icon: <Smartphone className="h-8 w-8" />, name: "Phones & Tablets" },
              { icon: <Laptop className="h-8 w-8" />, name: "Computers" },
              { icon: <Wifi className="h-8 w-8" />, name: "WiFi & Network" },
              { icon: <Monitor className="h-8 w-8" />, name: "Displays" },
              { icon: <Headphones className="h-8 w-8" />, name: "Audio Devices" },
              { icon: <Speaker className="h-8 w-8" />, name: "Smart Speakers" },
              { icon: <Bluetooth className="h-8 w-8" />, name: "Bluetooth" },
              { icon: <HardDrive className="h-8 w-8" />, name: "Storage" },
              { icon: <Cpu className="h-8 w-8" />, name: "Hardware" },
              { icon: <Sparkles className="h-8 w-8" />, name: "Other Gadgets" },
            ].map((item, index) => (
              <div 
                key={index}
                onClick={() => navigate("/chat?specialty=gadget&category=" + item.name.toLowerCase())}
                className="flex flex-col items-center justify-center p-6 rounded-xl bg-white border border-indigo-100 shadow-md hover:shadow-xl hover:border-indigo-200 transform hover:-translate-y-1 transition-all duration-300 cursor-pointer"
              >
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center text-white mb-4">
                  {item.icon}
                </div>
                <h3 className="text-sm md:text-base font-medium text-indigo-900 text-center">{item.name}</h3>
              </div>
            ))}
          </div>
        </section>
        
        {/* Quick Tech Solutions Cards */}
        <section className="py-16 bg-gradient-to-br from-indigo-500/5 to-purple-500/10 backdrop-blur-lg">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold mb-10 text-center text-indigo-900">Quick Tech Solutions</h2>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <Card className="bg-gradient-to-br from-indigo-50 to-indigo-100/70 backdrop-blur-md border border-indigo-200/50 shadow-lg hover:shadow-xl transition-all overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-400/0 to-indigo-600/0 group-hover:from-indigo-400/5 group-hover:to-indigo-600/10 transition-all duration-300"></div>
                <CardHeader>
                  <CardTitle className="text-indigo-800">Chat with Gadget Fix Genie</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-indigo-700/90">Describe tech issues and get personalized troubleshooting steps from our AI expert.</p>
                </CardContent>
                <CardFooter>
                  <Button onClick={() => navigate("/chat?specialty=gadget")} className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-md hover:shadow-lg">
                    Start Chat
                  </Button>
                </CardFooter>
              </Card>
              
              <Card className="bg-gradient-to-br from-indigo-50 to-indigo-100/70 backdrop-blur-md border border-indigo-200/50 shadow-lg hover:shadow-xl transition-all overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-400/0 to-indigo-600/0 group-hover:from-indigo-400/5 group-hover:to-indigo-600/10 transition-all duration-300"></div>
                <CardHeader>
                  <CardTitle className="text-indigo-800">Visual Diagnosis</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-indigo-700/90">Upload photos of device issues, error messages, or damaged components for instant help.</p>
                </CardContent>
                <CardFooter>
                  <Button onClick={() => navigate("/diagnosis?specialty=gadget")} variant="outline" className="w-full border-indigo-300 text-indigo-700 hover:bg-indigo-100/50 hover:border-indigo-400">
                    Upload Photo
                  </Button>
                </CardFooter>
              </Card>
              
              <Card className="bg-gradient-to-br from-indigo-50 to-indigo-100/70 backdrop-blur-md border border-indigo-200/50 shadow-lg hover:shadow-xl transition-all overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-400/0 to-indigo-600/0 group-hover:from-indigo-400/5 group-hover:to-indigo-600/10 transition-all duration-300"></div>
                <CardHeader>
                  <CardTitle className="text-indigo-800">Tech Repair Guides</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-indigo-700/90">Browse our library of step-by-step guides for fixing common tech problems.</p>
                </CardContent>
                <CardFooter>
                  <Button onClick={() => navigate("/gadget/glossary")} variant="outline" className="w-full border-indigo-300 text-indigo-700 hover:bg-indigo-100/50 hover:border-indigo-400">
                    View Guides
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </section>
        
        {/* Live Fix Feed */}
        <section className="py-16 bg-gradient-to-r from-indigo-200/30 to-purple-200/30 backdrop-blur-lg border-y border-indigo-200/50">
          <div className="container mx-auto px-4">
            <LiveFixFeed specialty="gadget" />
          </div>
        </section>
        
        {/* Quick Action Categories */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold mb-8 text-center text-indigo-900">Common Tech Problems</h2>
            <QuickActionCategories specialty="gadget" />
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default GadgetFixGenie;
