
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import EveryFixHeader from "@/components/shared/EveryFixHeader";
import HowItWorks from "@/components/home/HowItWorks";
import LiveFixFeed from "@/components/home/LiveFixFeed";
import Footer from "@/components/home/Footer";
import QuickActionCategories from "@/components/shared/QuickActionCategories";

const Electrician = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50">
      <EveryFixHeader specialty="electrician" />
      
      <main className="container mx-auto px-4 py-8">
        <section className="mb-12">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-4">Electrician Genius</h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Safely solve electrical issues with expert guidance on switches, outlets, lighting, and more.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="bg-white shadow-sm hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle>Chat with Electrician Genius</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Describe your electrical problem and get safe, step-by-step guidance from our AI expert.</p>
              </CardContent>
              <CardFooter>
                <Button onClick={() => navigate("/chat?specialty=electrician")} className="w-full">
                  Start Chat
                </Button>
              </CardFooter>
            </Card>
            
            <Card className="bg-white shadow-sm hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle>Visual Diagnosis</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Upload photos of electrical issues and get instant, safe troubleshooting advice.</p>
              </CardContent>
              <CardFooter>
                <Button onClick={() => navigate("/diagnosis?specialty=electrician")} variant="outline" className="w-full">
                  Upload Photo
                </Button>
              </CardFooter>
            </Card>
            
            <Card className="bg-white shadow-sm hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle>Electrical Guides</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Browse our library of step-by-step electrical guides for common household problems.</p>
              </CardContent>
              <CardFooter>
                <Button onClick={() => navigate("/electrician/glossary")} variant="outline" className="w-full">
                  View Guides
                </Button>
              </CardFooter>
            </Card>
          </div>
        </section>
        
        <section className="mb-12">
          <HowItWorks specialty="electrician" />
        </section>
        
        <LiveFixFeed specialty="electrician" />
        
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Quick Electrical Solutions</h2>
          <QuickActionCategories specialty="electrician" />
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Electrician;
