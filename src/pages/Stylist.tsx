
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import EveryFixHeader from "@/components/shared/EveryFixHeader";
import HowItWorks from "@/components/home/HowItWorks";
import LiveFixFeed from "@/components/home/LiveFixFeed";
import Footer from "@/components/home/Footer";
import QuickActionCategories from "@/components/shared/QuickActionCategories";

const Stylist = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50">
      <EveryFixHeader specialty="stylist" />
      
      <main className="container mx-auto px-4 py-8">
        <section className="mb-12">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-4">Stylist's Helper</h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Get expert advice on fashion, hair care, makeup, and personal style to look your best.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="bg-white shadow-sm hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle>Chat with Stylist's Helper</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Ask about style, hair, makeup, or fashion and get personalized advice from our AI stylist.</p>
              </CardContent>
              <CardFooter>
                <Button onClick={() => navigate("/chat?specialty=stylist")} className="w-full">
                  Start Chat
                </Button>
              </CardFooter>
            </Card>
            
            <Card className="bg-white shadow-sm hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle>Style Diagnosis</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Upload photos of outfits, hairstyles, or beauty concerns for personalized recommendations.</p>
              </CardContent>
              <CardFooter>
                <Button onClick={() => navigate("/diagnosis?specialty=stylist")} variant="outline" className="w-full">
                  Upload Photo
                </Button>
              </CardFooter>
            </Card>
            
            <Card className="bg-white shadow-sm hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle>Style Guides</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Browse our library of fashion tips, hair tutorials, and beauty guides for every occasion.</p>
              </CardContent>
              <CardFooter>
                <Button onClick={() => navigate("/stylist/glossary")} variant="outline" className="w-full">
                  View Guides
                </Button>
              </CardFooter>
            </Card>
          </div>
        </section>
        
        <section className="mb-12">
          <HowItWorks specialty="stylist" />
        </section>
        
        <LiveFixFeed specialty="stylist" />
        
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Quick Style Solutions</h2>
          <QuickActionCategories specialty="stylist" />
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Stylist;
