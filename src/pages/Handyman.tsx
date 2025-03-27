
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

const Handyman = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50">
      <EveryFixHeader specialty="handyman" />
      
      <main>
        <ModernHero 
          title="Handyman Hero"
          specialty="handyman"
          emoji="🔨"
          description="Fix furniture, walls, shelves, and tackle repairs with AI guidance."
          placeholderText="What needs fixing around your home?"
        />
        
        <section className="py-10 bg-white">
          <div className="container mx-auto px-4">
            <EveryFixHowItWorks specialty="handyman" />
          </div>
        </section>
        
        <section className="py-10">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold mb-6">Quick Repair Solutions</h2>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="bg-white shadow-sm hover:shadow-md transition-shadow">
                <CardHeader>
                  <CardTitle>Chat with Handyman Hero</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Describe your repair needs and get personalized DIY guidance from our AI expert.</p>
                </CardContent>
                <CardFooter>
                  <Button onClick={() => navigate("/chat?specialty=handyman")} className="w-full">
                    Start Chat
                  </Button>
                </CardFooter>
              </Card>
              
              <Card className="bg-white shadow-sm hover:shadow-md transition-shadow">
                <CardHeader>
                  <CardTitle>Visual Diagnosis</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Upload photos of broken furniture, wall damage, or other issues for instant solutions.</p>
                </CardContent>
                <CardFooter>
                  <Button onClick={() => navigate("/diagnosis?specialty=handyman")} variant="outline" className="w-full">
                    Upload Photo
                  </Button>
                </CardFooter>
              </Card>
              
              <Card className="bg-white shadow-sm hover:shadow-md transition-shadow">
                <CardHeader>
                  <CardTitle>Repair Guides</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Browse our library of step-by-step repair guides for common household problems.</p>
                </CardContent>
                <CardFooter>
                  <Button onClick={() => navigate("/handyman/glossary")} variant="outline" className="w-full">
                    View Guides
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </section>
        
        <section className="py-10 bg-gray-100">
          <div className="container mx-auto px-4">
            <LiveFixFeed specialty="handyman" />
          </div>
        </section>
        
        <section className="py-10">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold mb-6">Quick Repair Solutions</h2>
            <QuickActionCategories specialty="handyman" />
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Handyman;
