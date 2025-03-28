
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import EveryFixHeader from "@/components/shared/EveryFixHeader";
import Footer from "@/components/home/Footer";
import { CheckCircle, Crown, XCircle } from "lucide-react";
import { toast } from "sonner";

const Subscription = () => {
  const navigate = useNavigate();
  const premiumFeatures = [
    "Access to all premium AI assistants",
    "Voice chat with all assistants",
    "Unlimited image uploads for diagnosis",
    "Priority support",
    "Advanced troubleshooting options",
    "No ads or waiting times"
  ];

  const freeFeatures = [
    "Access to basic AI assistants",
    "Limited voice chat interactions",
    "5 image uploads per day",
    "Standard support",
    "Basic troubleshooting options",
    "Ad-supported experience"
  ];

  const handleSubscribe = (plan: string) => {
    if (plan === "free") {
      toast.success("You're already on the Free plan!");
      navigate("/");
      return;
    }
    
    toast("Coming Soon", {
      description: "Payment processing will be available soon!",
      action: {
        label: "OK",
        onClick: () => console.log("Acknowledged")
      }
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
      <EveryFixHeader />
      
      <main className="container mx-auto px-4 py-12">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <Crown className="h-12 w-12 text-amber-500 mx-auto mb-4" />
          <h1 className="text-4xl font-bold mb-4">Choose Your Plan</h1>
          <p className="text-xl text-gray-600">
            Unlock the full potential of Connect.AI with a premium subscription
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Free Plan */}
          <Card className="border-gray-200 relative">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Free Plan</span>
                <span className="text-lg text-gray-500">$0/month</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="space-y-2">
                {freeFeatures.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-gray-500 mr-2 shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button 
                className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800"
                onClick={() => handleSubscribe("free")}
              >
                Current Plan
              </Button>
            </CardFooter>
          </Card>
          
          {/* Premium Plan */}
          <Card className="border-amber-300 bg-gradient-to-b from-amber-50 to-white relative shadow-xl">
            <div className="absolute -top-4 left-0 right-0 mx-auto w-fit px-3 py-1 bg-amber-500 text-white rounded-full text-sm font-medium">
              Recommended
            </div>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Premium Plan</span>
                <span className="text-lg text-amber-600">$9.99/month</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="space-y-2">
                {premiumFeatures.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-amber-500 mr-2 shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button 
                className="w-full bg-amber-500 hover:bg-amber-600"
                onClick={() => handleSubscribe("premium")}
              >
                Upgrade Now
              </Button>
            </CardFooter>
          </Card>
        </div>
        
        <div className="mt-16 text-center">
          <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
          <div className="max-w-3xl mx-auto grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">What's included in the Premium plan?</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Premium subscribers get access to all AI assistants including electrician, chef, stylist, and other specialized experts that are not available in the free plan.</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Can I cancel anytime?</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Yes, you can cancel your subscription at any time. Your premium access will continue until the end of your billing cycle.</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Is there a free trial?</CardTitle>
              </CardHeader>
              <CardContent>
                <p>We offer a 7-day free trial of our Premium plan so you can experience all the benefits before committing.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Subscription;
