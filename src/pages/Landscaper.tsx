
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import EveryFixHeader from "@/components/shared/EveryFixHeader";
import HowItWorks from "@/components/home/HowItWorks";
import LiveFixFeed from "@/components/home/LiveFixFeed";
import Footer from "@/components/home/Footer";
import QuickActionCategories from "@/components/shared/QuickActionCategories";

const Landscaper = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50">
      <EveryFixHeader specialty="landscaper" />
      
      <main className="container mx-auto px-4 py-8">
        <section className="mb-12">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-4">Landscaper Buddy</h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Get expert guidance on lawn care, gardening, outdoor maintenance, and plant health.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="bg-white shadow-sm hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle>Chat with Landscaper Buddy</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Ask questions about plants, lawn care, and outdoor maintenance for personalized advice.</p>
              </CardContent>
              <CardFooter>
                <Button onClick={() => navigate("/chat?specialty=landscaper")} className="w-full">
                  Start Chat
                </Button>
              </CardFooter>
            </Card>
            
            <Card className="bg-white shadow-sm hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle>Plant Diagnosis</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Upload photos of plants, grass, or outdoor issues for instant identification and care tips.</p>
              </CardContent>
              <CardFooter>
                <Button onClick={() => navigate("/diagnosis?specialty=landscaper")} variant="outline" className="w-full">
                  Upload Photo
                </Button>
              </CardFooter>
            </Card>
            
            <Card className="bg-white shadow-sm hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle>Landscaping Guides</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Browse our library of step-by-step guides for lawn care, gardening, and outdoor projects.</p>
              </CardContent>
              <CardFooter>
                <Button onClick={() => navigate("/landscaper/glossary")} variant="outline" className="w-full">
                  View Guides
                </Button>
              </CardFooter>
            </Card>
          </div>
        </section>
        
        <section className="mb-12">
          <HowItWorks specialty="landscaper" />
        </section>
        
        <LiveFixFeed specialty="landscaper" />
        
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Quick Landscaping Solutions</h2>
          <QuickActionCategories specialty="landscaper" />
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Landscaper;
