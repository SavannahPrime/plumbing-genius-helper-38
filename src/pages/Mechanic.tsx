
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import EveryFixHeader from "@/components/shared/EveryFixHeader";
import HowItWorks from "@/components/home/HowItWorks";
import LiveFixFeed from "@/components/home/LiveFixFeed";
import Footer from "@/components/home/Footer";
import QuickActionCategories from "@/components/shared/QuickActionCategories";

const Mechanic = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50">
      <EveryFixHeader specialty="mechanic" />
      
      <main className="container mx-auto px-4 py-8">
        <section className="mb-12">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-4">Mechanic Assistant</h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Diagnose and fix common car problems with expert guidance on maintenance, repairs, and troubleshooting.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="bg-white shadow-sm hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle>Chat with Mechanic Assistant</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Describe car issues, noises, or warning lights for personalized diagnostic advice.</p>
              </CardContent>
              <CardFooter>
                <Button onClick={() => navigate("/chat?specialty=mechanic")} className="w-full">
                  Start Chat
                </Button>
              </CardFooter>
            </Card>
            
            <Card className="bg-white shadow-sm hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle>Visual Diagnosis</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Upload photos of car parts, dashboard warnings, or fluid leaks for instant troubleshooting.</p>
              </CardContent>
              <CardFooter>
                <Button onClick={() => navigate("/diagnosis?specialty=mechanic")} variant="outline" className="w-full">
                  Upload Photo
                </Button>
              </CardFooter>
            </Card>
            
            <Card className="bg-white shadow-sm hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle>Automotive Guides</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Browse our library of step-by-step guides for common car maintenance and repair tasks.</p>
              </CardContent>
              <CardFooter>
                <Button onClick={() => navigate("/mechanic/glossary")} variant="outline" className="w-full">
                  View Guides
                </Button>
              </CardFooter>
            </Card>
          </div>
        </section>
        
        <section className="mb-12">
          <HowItWorks specialty="mechanic" />
        </section>
        
        <LiveFixFeed specialty="mechanic" />
        
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Quick Auto Solutions</h2>
          <QuickActionCategories specialty="mechanic" />
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Mechanic;
