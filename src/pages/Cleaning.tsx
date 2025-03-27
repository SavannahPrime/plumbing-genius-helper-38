
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import EveryFixHeader from "@/components/shared/EveryFixHeader";
import HowItWorks from "@/components/home/HowItWorks";
import LiveFixFeed from "@/components/home/LiveFixFeed";
import Footer from "@/components/home/Footer";
import QuickActionCategories from "@/components/shared/QuickActionCategories";

const Cleaning = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-cyan-50 to-cyan-100">
      <EveryFixHeader specialty="cleaning" />
      
      <main className="container mx-auto px-4 py-8">
        <section className="mb-12">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-4">Cleaning Genius</h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Get expert advice on removing stains, deep cleaning, organizing, and maintaining every surface in your home.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="bg-cyan-50/80 backdrop-blur-md border border-cyan-100 shadow-sm hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle>Chat with Cleaning Genius</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Ask questions, share photos, and get personalized cleaning advice from our AI expert.</p>
              </CardContent>
              <CardFooter>
                <Button onClick={() => navigate("/chat?specialty=cleaning")} className="w-full bg-cyan-500 hover:bg-cyan-600">
                  Start Chat
                </Button>
              </CardFooter>
            </Card>
            
            <Card className="bg-cyan-50/80 backdrop-blur-md border border-cyan-100 shadow-sm hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle>Visual Diagnosis</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Upload photos of stains, mold, or dirty surfaces and get instant cleaning solutions.</p>
              </CardContent>
              <CardFooter>
                <Button onClick={() => navigate("/diagnosis?specialty=cleaning")} variant="outline" className="w-full border-cyan-200 text-cyan-700 hover:bg-cyan-100">
                  Upload Photo
                </Button>
              </CardFooter>
            </Card>
            
            <Card className="bg-cyan-50/80 backdrop-blur-md border border-cyan-100 shadow-sm hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle>Cleaning Guides</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Browse our library of step-by-step cleaning guides for every room and surface.</p>
              </CardContent>
              <CardFooter>
                <Button onClick={() => navigate("/cleaning/glossary")} variant="outline" className="w-full border-cyan-200 text-cyan-700 hover:bg-cyan-100">
                  View Guides
                </Button>
              </CardFooter>
            </Card>
          </div>
        </section>
        
        <section className="mb-12 p-6 bg-cyan-100/60 backdrop-blur-md rounded-xl border border-cyan-200/50">
          <HowItWorks specialty="cleaning" />
        </section>
        
        <section className="mb-12 p-6 bg-cyan-50/70 backdrop-blur-md rounded-xl border border-cyan-100/50">
          <LiveFixFeed specialty="cleaning" />
        </section>
        
        <section className="mb-12 p-6 bg-cyan-100/60 backdrop-blur-md rounded-xl border border-cyan-200/50">
          <h2 className="text-2xl font-bold mb-6">Quick Cleaning Solutions</h2>
          <QuickActionCategories specialty="cleaning" />
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Cleaning;
