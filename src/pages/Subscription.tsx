
import React, { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import EveryFixHeader from "@/components/shared/EveryFixHeader";
import Footer from "@/components/home/Footer";
import { CheckCircle, Coins, Crown, CreditCard, XCircle } from "lucide-react";
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PaymentMethodType } from "@/types/global";
import TokenBalanceDisplay from "@/components/shared/TokenBalanceDisplay";

const Subscription = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const defaultTab = searchParams.get('action') === 'addTokens' ? 'tokens' : 'subscription';
  const [activeTab, setActiveTab] = useState<string>(defaultTab);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<PaymentMethodType>('card');
  
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

  const tokenPackages = [
    { id: 'basic', name: 'Basic', tokens: 1000, price: 9.99 },
    { id: 'standard', name: 'Standard', tokens: 5000, price: 39.99, popular: true },
    { id: 'premium', name: 'Premium', tokens: 10000, price: 69.99 },
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

  const handleBuyTokens = (packageId: string) => {
    toast("Coming Soon", {
      description: "Token purchases will be available soon!",
      action: {
        label: "OK",
        onClick: () => console.log("Acknowledged")
      }
    });
  };

  const PaymentMethodSelector = () => (
    <div className="mt-6 mb-4">
      <h3 className="text-lg font-semibold mb-4">Select Payment Method</h3>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {[
          { id: 'card', name: 'Credit Card', icon: <CreditCard className="h-5 w-5" /> },
          { id: 'link', name: 'LINK Token', icon: <span className="text-blue-500 font-bold">LINK</span> },
          { id: 'applepay', name: 'Apple Pay', icon: <span className="font-semibold">Apple Pay</span> },
          { id: 'googlepay', name: 'Google Pay', icon: <span className="font-semibold">Google Pay</span> },
        ].map((method) => (
          <Button
            key={method.id}
            variant={selectedPaymentMethod === method.id ? "default" : "outline"}
            className={`flex-col h-20 p-2 justify-center ${selectedPaymentMethod === method.id ? '' : 'border-gray-200'}`}
            onClick={() => setSelectedPaymentMethod(method.id as PaymentMethodType)}
          >
            <div className="mb-1">{method.icon}</div>
            <div className="text-xs">{method.name}</div>
          </Button>
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
      <EveryFixHeader />
      
      <main className="container mx-auto px-4 py-12">
        <div className="text-center max-w-3xl mx-auto mb-8">
          <div className="flex justify-center">
            <TokenBalanceDisplay className="max-w-md w-full" />
          </div>
        </div>
        
        <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="max-w-5xl mx-auto">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="subscription" className="text-lg py-3">
              <Crown className="mr-2 h-5 w-5" />
              Subscriptions
            </TabsTrigger>
            <TabsTrigger value="tokens" className="text-lg py-3">
              <Coins className="mr-2 h-5 w-5" />
              Buy Tokens
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="subscription">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
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
          </TabsContent>
          
          <TabsContent value="tokens">
            <div className="mb-6">
              <h2 className="text-2xl font-bold mb-2">Purchase Token Packages</h2>
              <p className="text-gray-600">
                Tokens are used for AI interactions. The more complex your requests, the more tokens used.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {tokenPackages.map((pkg) => (
                <Card key={pkg.id} className={`relative ${pkg.popular ? 'border-blue-400 shadow-lg' : ''}`}>
                  {pkg.popular && (
                    <div className="absolute -top-3 right-4 bg-blue-500 text-white px-3 py-1 rounded-full text-xs font-medium">
                      Best Value
                    </div>
                  )}
                  <CardHeader>
                    <CardTitle>{pkg.name} Package</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="text-3xl font-bold">${pkg.price}</div>
                    <div className="flex items-center text-lg">
                      <Coins className="h-5 w-5 text-amber-500 mr-2" />
                      {pkg.tokens.toLocaleString()} tokens
                    </div>
                    <div className="text-sm text-gray-500">
                      ${(pkg.price / pkg.tokens * 1000).toFixed(2)} per 1,000 tokens
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button 
                      className={`w-full ${pkg.popular ? 'bg-blue-500 hover:bg-blue-600' : ''}`}
                      onClick={() => handleBuyTokens(pkg.id)}
                    >
                      Buy Now
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
            
            <PaymentMethodSelector />
          </TabsContent>
        </Tabs>
        
        <div className="mt-16 text-center">
          <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
          <div className="max-w-3xl mx-auto grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">What are tokens and how do they work?</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Tokens are units of processing used by our AI assistants. Each message you send or receive consumes tokens based on its length and complexity. Premium subscribers get a monthly allocation, while additional tokens can be purchased as needed.</p>
              </CardContent>
            </Card>
            
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
                <CardTitle className="text-lg">Can I pay with cryptocurrency?</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Yes, we accept LINK tokens as payment for both subscriptions and token packages. Connect your Web3 wallet to make payments using LINK.</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Are there API options for businesses?</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Yes, we offer API plans for businesses that want to integrate our assistants into their own applications. Please contact our sales team for custom enterprise solutions and pricing.</p>
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
