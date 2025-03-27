
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import EveryFixHeader from "@/components/shared/EveryFixHeader";
import HowItWorks from "@/components/home/HowItWorks";
import LiveFixFeed from "@/components/home/LiveFixFeed";
import Footer from "@/components/home/Footer";
import QuickActionCategories from "@/components/shared/QuickActionCategories";
import { Leaf, Trees, SproutIcon, Cloud, Shovel } from "lucide-react";

const Landscaper = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-emerald-50">
      <EveryFixHeader specialty="landscaper" />
      
      <main className="container mx-auto px-4 py-8">
        <section className="mb-12">
          <div className="text-center mb-8">
            <span className="inline-block text-4xl mb-3">🌿</span>
            <h1 className="text-3xl font-bold mb-4 text-emerald-800">Landscaper Buddy</h1>
            <p className="text-lg text-emerald-700 max-w-2xl mx-auto">
              Get expert guidance on lawn care, gardening, outdoor maintenance, and plant health.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="bg-white shadow-sm hover:shadow-md transition-shadow border-emerald-100 hover:border-emerald-200">
              <CardHeader className="bg-emerald-50 rounded-t-lg border-b border-emerald-100">
                <CardTitle className="text-emerald-700 flex items-center gap-2">
                  <Trees className="h-5 w-5 text-emerald-600" />
                  Chat with Landscaper Buddy
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <p className="text-emerald-700">Ask questions about plants, lawn care, and outdoor maintenance for personalized advice.</p>
              </CardContent>
              <CardFooter>
                <Button onClick={() => navigate("/chat?specialty=landscaper")} className="w-full bg-emerald-600 hover:bg-emerald-700">
                  Start Chat
                </Button>
              </CardFooter>
            </Card>
            
            <Card className="bg-white shadow-sm hover:shadow-md transition-shadow border-emerald-100 hover:border-emerald-200">
              <CardHeader className="bg-emerald-50 rounded-t-lg border-b border-emerald-100">
                <CardTitle className="text-emerald-700 flex items-center gap-2">
                  <Leaf className="h-5 w-5 text-emerald-600" />
                  Plant Diagnosis
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <p className="text-emerald-700">Upload photos of plants, grass, or outdoor issues for instant identification and care tips.</p>
              </CardContent>
              <CardFooter>
                <Button onClick={() => navigate("/diagnosis?specialty=landscaper")} variant="outline" className="w-full text-emerald-700 border-emerald-200 hover:bg-emerald-50">
                  Upload Photo
                </Button>
              </CardFooter>
            </Card>
            
            <Card className="bg-white shadow-sm hover:shadow-md transition-shadow border-emerald-100 hover:border-emerald-200">
              <CardHeader className="bg-emerald-50 rounded-t-lg border-b border-emerald-100">
                <CardTitle className="text-emerald-700 flex items-center gap-2">
                  <SproutIcon className="h-5 w-5 text-emerald-600" />
                  Landscaping Guides
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <p className="text-emerald-700">Browse our library of step-by-step guides for lawn care, gardening, and outdoor projects.</p>
              </CardContent>
              <CardFooter>
                <Button onClick={() => navigate("/landscaper/glossary")} variant="outline" className="w-full text-emerald-700 border-emerald-200 hover:bg-emerald-50">
                  View Guides
                </Button>
              </CardFooter>
            </Card>
          </div>
        </section>
        
        <section className="mb-12 bg-white p-8 rounded-xl shadow-sm">
          <HowItWorks specialty="landscaper" />
        </section>
        
        <section className="mb-12 bg-emerald-100 p-8 rounded-xl shadow-sm">
          <LiveFixFeed specialty="landscaper" />
        </section>
        
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-emerald-800">Quick Landscaping Solutions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="bg-white shadow-sm hover:shadow-md transition-all hover:-translate-y-1 border-emerald-100">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg text-emerald-700 flex items-center gap-2">
                  <Leaf className="h-5 w-5 text-emerald-600" />
                  Lawn Care
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-emerald-600">Mowing, fertilizing, seeding, and troubleshooting common lawn issues.</p>
              </CardContent>
              <CardFooter>
                <Button size="sm" variant="ghost" onClick={() => navigate("/chat?specialty=landscaper&topic=lawn")} className="w-full text-emerald-700 hover:bg-emerald-50">
                  Learn More
                </Button>
              </CardFooter>
            </Card>
            
            <Card className="bg-white shadow-sm hover:shadow-md transition-all hover:-translate-y-1 border-emerald-100">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg text-emerald-700 flex items-center gap-2">
                  <SproutIcon className="h-5 w-5 text-emerald-600" />
                  Plant Health
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-emerald-600">Diagnosing plant diseases, nutrient deficiencies, and pest problems.</p>
              </CardContent>
              <CardFooter>
                <Button size="sm" variant="ghost" onClick={() => navigate("/chat?specialty=landscaper&topic=plants")} className="w-full text-emerald-700 hover:bg-emerald-50">
                  Learn More
                </Button>
              </CardFooter>
            </Card>
            
            <Card className="bg-white shadow-sm hover:shadow-md transition-all hover:-translate-y-1 border-emerald-100">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg text-emerald-700 flex items-center gap-2">
                  <Cloud className="h-5 w-5 text-emerald-600" />
                  Irrigation
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-emerald-600">Setting up and maintaining sprinkler systems, drip irrigation, and watering schedules.</p>
              </CardContent>
              <CardFooter>
                <Button size="sm" variant="ghost" onClick={() => navigate("/chat?specialty=landscaper&topic=irrigation")} className="w-full text-emerald-700 hover:bg-emerald-50">
                  Learn More
                </Button>
              </CardFooter>
            </Card>
            
            <Card className="bg-white shadow-sm hover:shadow-md transition-all hover:-translate-y-1 border-emerald-100">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg text-emerald-700 flex items-center gap-2">
                  <Shovel className="h-5 w-5 text-emerald-600" />
                  Landscaping Projects
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-emerald-600">Building garden beds, pathways, retaining walls, and other outdoor structures.</p>
              </CardContent>
              <CardFooter>
                <Button size="sm" variant="ghost" onClick={() => navigate("/chat?specialty=landscaper&topic=projects")} className="w-full text-emerald-700 hover:bg-emerald-50">
                  Learn More
                </Button>
              </CardFooter>
            </Card>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Landscaper;
