
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

const GadgetFixGenie = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-indigo-100">
      <EveryFixHeader specialty="gadget" />
      
      <main>
        <ModernHero 
          title="Gadget Fix Genie"
          specialty="gadget"
          emoji="📱"
          description="Troubleshoot your tech without calling IT support."
          placeholderText="What device is giving you trouble?"
        />
        
        <section className="py-10 bg-indigo-50/70 backdrop-blur-lg border-y border-indigo-100">
          <div className="container mx-auto px-4">
            <EveryFixHowItWorks specialty="gadget" />
          </div>
        </section>
        
        <section className="py-10">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold mb-6">Quick Tech Solutions</h2>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="bg-indigo-50/80 backdrop-blur-md border border-indigo-100 shadow-sm hover:shadow-md transition-shadow">
                <CardHeader>
                  <CardTitle>Chat with Gadget Fix Genie</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Describe tech issues and get personalized troubleshooting steps from our AI expert.</p>
                </CardContent>
                <CardFooter>
                  <Button onClick={() => navigate("/chat?specialty=gadget")} className="w-full bg-indigo-500 hover:bg-indigo-600">
                    Start Chat
                  </Button>
                </CardFooter>
              </Card>
              
              <Card className="bg-indigo-50/80 backdrop-blur-md border border-indigo-100 shadow-sm hover:shadow-md transition-shadow">
                <CardHeader>
                  <CardTitle>Visual Diagnosis</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Upload photos of device issues, error messages, or damaged components for instant help.</p>
                </CardContent>
                <CardFooter>
                  <Button onClick={() => navigate("/diagnosis?specialty=gadget")} variant="outline" className="w-full border-indigo-200 text-indigo-700 hover:bg-indigo-100">
                    Upload Photo
                  </Button>
                </CardFooter>
              </Card>
              
              <Card className="bg-indigo-50/80 backdrop-blur-md border border-indigo-100 shadow-sm hover:shadow-md transition-shadow">
                <CardHeader>
                  <CardTitle>Tech Repair Guides</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Browse our library of step-by-step guides for fixing common tech problems.</p>
                </CardContent>
                <CardFooter>
                  <Button onClick={() => navigate("/gadget/glossary")} variant="outline" className="w-full border-indigo-200 text-indigo-700 hover:bg-indigo-100">
                    View Guides
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </section>
        
        <section className="py-10 bg-indigo-100/70 backdrop-blur-lg border-y border-indigo-200/50">
          <div className="container mx-auto px-4">
            <LiveFixFeed specialty="gadget" />
          </div>
        </section>
        
        <section className="py-10">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold mb-6">Quick Tech Solutions</h2>
            <QuickActionCategories specialty="gadget" />
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default GadgetFixGenie;
