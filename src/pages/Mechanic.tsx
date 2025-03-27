
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
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200">
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
            <Card className="bg-gray-100/80 backdrop-blur-md border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle>Chat with Mechanic Assistant</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Describe car issues, noises, or warning lights for personalized diagnostic advice.</p>
              </CardContent>
              <CardFooter>
                <Button onClick={() => navigate("/chat?specialty=mechanic")} className="w-full bg-gray-700 hover:bg-gray-800">
                  Start Chat
                </Button>
              </CardFooter>
            </Card>
            
            <Card className="bg-gray-100/80 backdrop-blur-md border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle>Visual Diagnosis</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Upload photos of car parts, dashboard warnings, or fluid leaks for instant troubleshooting.</p>
              </CardContent>
              <CardFooter>
                <Button onClick={() => navigate("/diagnosis?specialty=mechanic")} variant="outline" className="w-full border-gray-300 text-gray-700 hover:bg-gray-200">
                  Upload Photo
                </Button>
              </CardFooter>
            </Card>
            
            <Card className="bg-gray-100/80 backdrop-blur-md border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle>Automotive Guides</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Browse our library of step-by-step guides for common car maintenance and repair tasks.</p>
              </CardContent>
              <CardFooter>
                <Button onClick={() => navigate("/mechanic/glossary")} variant="outline" className="w-full border-gray-300 text-gray-700 hover:bg-gray-200">
                  View Guides
                </Button>
              </CardFooter>
            </Card>
          </div>
        </section>
        
        <section className="mb-12 p-6 bg-gray-200/60 backdrop-blur-md rounded-xl border border-gray-300/50">
          <HowItWorks specialty="mechanic" />
        </section>
        
        <section className="mb-12 p-6 bg-gray-100/70 backdrop-blur-md rounded-xl border border-gray-200/50">
          <LiveFixFeed specialty="mechanic" />
        </section>
        
        <section className="mb-12 p-6 bg-gray-200/60 backdrop-blur-md rounded-xl border border-gray-300/50">
          <h2 className="text-2xl font-bold mb-6">Quick Auto Solutions</h2>
          <QuickActionCategories specialty="mechanic" />
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Mechanic;
