
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import EveryFixHeader from "@/components/shared/EveryFixHeader";
import HowItWorks from "@/components/home/HowItWorks";
import LiveFixFeed from "@/components/home/LiveFixFeed";
import Footer from "@/components/home/Footer";
import QuickActionCategories from "@/components/shared/QuickActionCategories";

const Chef = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50">
      <EveryFixHeader specialty="chef" />
      
      <main className="container mx-auto px-4 py-8">
        <section className="mb-12">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-4">Chef's Assistant</h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Get expert culinary guidance on recipes, techniques, ingredient substitutions, and kitchen troubleshooting.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="bg-white shadow-sm hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle>Chat with Chef's Assistant</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Ask cooking questions and get personalized culinary advice from our AI chef.</p>
              </CardContent>
              <CardFooter>
                <Button onClick={() => navigate("/chat?specialty=chef")} className="w-full">
                  Start Chat
                </Button>
              </CardFooter>
            </Card>
            
            <Card className="bg-white shadow-sm hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle>Food Diagnosis</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Upload photos of dishes, ingredients, or kitchen issues for expert analysis and suggestions.</p>
              </CardContent>
              <CardFooter>
                <Button onClick={() => navigate("/diagnosis?specialty=chef")} variant="outline" className="w-full">
                  Upload Photo
                </Button>
              </CardFooter>
            </Card>
            
            <Card className="bg-white shadow-sm hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle>Cooking Guides</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Browse our library of recipes, cooking techniques, and kitchen troubleshooting guides.</p>
              </CardContent>
              <CardFooter>
                <Button onClick={() => navigate("/chef/glossary")} variant="outline" className="w-full">
                  View Guides
                </Button>
              </CardFooter>
            </Card>
          </div>
        </section>
        
        <section className="mb-12">
          <HowItWorks specialty="chef" />
        </section>
        
        <LiveFixFeed specialty="chef" />
        
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Quick Cooking Solutions</h2>
          <QuickActionCategories specialty="chef" />
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Chef;
