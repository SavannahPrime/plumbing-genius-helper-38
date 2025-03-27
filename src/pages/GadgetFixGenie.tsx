
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import EveryFixHeader from "@/components/shared/EveryFixHeader";
import HowItWorks from "@/components/home/HowItWorks";
import LiveFixFeed from "@/components/home/LiveFixFeed";
import Footer from "@/components/home/Footer";
import QuickActionCategories from "@/components/shared/QuickActionCategories";

const GadgetFixGenie = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50">
      <EveryFixHeader specialty="gadget" />
      
      <main className="container mx-auto px-4 py-8">
        <section className="mb-12">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-4">Gadget Fix Genie</h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Troubleshoot and fix smartphones, tablets, computers, smart home devices, and other electronics.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="bg-white shadow-sm hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle>Chat with Gadget Fix Genie</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Describe tech issues and get personalized troubleshooting steps from our AI expert.</p>
              </CardContent>
              <CardFooter>
                <Button onClick={() => navigate("/chat?specialty=gadget")} className="w-full">
                  Start Chat
                </Button>
              </CardFooter>
            </Card>
            
            <Card className="bg-white shadow-sm hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle>Visual Diagnosis</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Upload photos of device issues, error messages, or damaged components for instant help.</p>
              </CardContent>
              <CardFooter>
                <Button onClick={() => navigate("/diagnosis?specialty=gadget")} variant="outline" className="w-full">
                  Upload Photo
                </Button>
              </CardFooter>
            </Card>
            
            <Card className="bg-white shadow-sm hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle>Tech Repair Guides</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Browse our library of step-by-step guides for fixing common tech problems.</p>
              </CardContent>
              <CardFooter>
                <Button onClick={() => navigate("/gadget/glossary")} variant="outline" className="w-full">
                  View Guides
                </Button>
              </CardFooter>
            </Card>
          </div>
        </section>
        
        <section className="mb-12">
          <HowItWorks specialty="gadget" />
        </section>
        
        <LiveFixFeed specialty="gadget" />
        
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Quick Tech Solutions</h2>
          <QuickActionCategories specialty="gadget" />
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default GadgetFixGenie;
