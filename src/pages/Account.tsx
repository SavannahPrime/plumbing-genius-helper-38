
import React, { useState } from "react";
import { PageLayout } from "@/components/shared/PageLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import EveryFixHeader from "@/components/shared/EveryFixHeader";
import { Badge } from "@/components/ui/badge";
import { 
  Coins, 
  CreditCard, 
  Settings, 
  History,
  MessageSquare,
  Bell,
  CircleDollarSign,
  User,
  Lock,
  Star,
  CheckCircle
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Define subscription status type for proper type checking
type SubscriptionStatus = "Free Trial" | "Standard" | "Premium";

const Account = () => {
  // Placeholder data - in a real app, this would come from a state or API
  const [tokenBalance, setTokenBalance] = useState(500);
  const [subscriptionStatus, setSubscriptionStatus] = useState<SubscriptionStatus>("Free Trial");
  
  // Handler for buying tokens with TXT
  const handleBuyTokens = (amount: number) => {
    setTokenBalance(prev => prev + amount);
    // In a real app, this would call a payment API
  };
  
  // Handler for subscribing with TXT tokens
  const handleSubscribeWithTokens = (plan: "Standard" | "Premium") => {
    // In a real app, this would check if user has enough tokens and call API
    if (plan === "Standard" && tokenBalance >= 175) {
      setTokenBalance(prev => prev - 175);
      setSubscriptionStatus("Standard");
    } else if (plan === "Premium" && tokenBalance >= 350) {
      setTokenBalance(prev => prev - 350);
      setSubscriptionStatus("Premium");
    }
  };
  
  return (
    <PageLayout>
      <EveryFixHeader 
        title="My Account"
        subtitle="Manage your profile, subscriptions and settings"
      />
      
      <div className="container mx-auto px-4 py-8 space-y-6">
        <Tabs defaultValue="account" className="w-full">
          <TabsList className="grid grid-cols-3 mb-6">
            <TabsTrigger value="account" className="text-sm">Account</TabsTrigger>
            <TabsTrigger value="subscription" className="text-sm">Subscription</TabsTrigger>
            <TabsTrigger value="settings" className="text-sm">Settings</TabsTrigger>
          </TabsList>
          
          <TabsContent value="account">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle className="flex items-center">
                    <User className="mr-2 h-5 w-5" />
                    Profile
                  </CardTitle>
                  <div className="flex items-center bg-amber-100 text-amber-800 px-3 py-1 rounded-full">
                    <Coins className="h-4 w-4 mr-2" />
                    <span className="font-semibold">{tokenBalance} TXT</span>
                  </div>
                </div>
                <CardDescription>
                  Manage your personal information and TXT token balance
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="border rounded-lg p-4 bg-muted/20">
                  <p className="text-sm text-muted-foreground mb-2">You are not logged in</p>
                  <Button variant="outline" size="sm">
                    Sign in with Google
                  </Button>
                  <Button variant="outline" size="sm" className="ml-2">
                    Sign in with Apple
                  </Button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <div>
                    <label className="text-sm font-medium">Email</label>
                    <input 
                      type="email" 
                      placeholder="Your email" 
                      className="mt-1 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Name</label>
                    <input 
                      type="text" 
                      placeholder="Your name" 
                      className="mt-1 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm"
                    />
                  </div>
                </div>
                
                <div className="mt-6">
                  <h3 className="text-lg font-semibold mb-3 flex items-center">
                    <Coins className="mr-2 h-5 w-5 text-amber-500" />
                    TXT Token Balance
                  </h3>
                  <div className="bg-gradient-to-r from-amber-50 to-amber-100 rounded-lg p-4 border border-amber-200">
                    <div className="flex justify-between items-center mb-3">
                      <div>
                        <p className="font-medium">Current Balance</p>
                        <p className="text-2xl font-bold text-amber-800">{tokenBalance} TXT</p>
                      </div>
                      <div className="bg-white p-3 rounded-full shadow-sm">
                        <Coins className="h-8 w-8 text-amber-500" />
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 mb-4">
                      TXT tokens can be used to subscribe to premium AI agents or pay for one-time services.
                    </p>
                    <div className="grid grid-cols-3 gap-2">
                      <Button onClick={() => handleBuyTokens(100)} variant="outline" size="sm" className="bg-white">
                        +100 TXT
                      </Button>
                      <Button onClick={() => handleBuyTokens(250)} variant="outline" size="sm" className="bg-white">
                        +250 TXT
                      </Button>
                      <Button onClick={() => handleBuyTokens(500)} variant="outline" size="sm" className="bg-white">
                        +500 TXT
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button disabled>Save Changes</Button>
              </CardFooter>
            </Card>
            
            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Lock className="mr-2 h-5 w-5" />
                  Security
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Manage your account security settings and connected devices
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="outline" size="sm" disabled>Manage Security</Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="subscription">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle className="flex items-center">
                    <CircleDollarSign className="mr-2 h-5 w-5" />
                    Current Plan
                  </CardTitle>
                  <Badge variant="outline" className={subscriptionStatus === "Free Trial" ? "bg-blue-100 text-blue-800" : "bg-green-100 text-green-800"}>
                    {subscriptionStatus}
                  </Badge>
                </div>
                <CardDescription>
                  Manage your subscription plan
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {/* Free Plan */}
                  <div className="border rounded-xl p-4 relative overflow-hidden">
                    {subscriptionStatus === "Free Trial" && (
                      <div className="absolute top-0 right-0 bg-blue-500 text-white text-xs px-3 py-1">
                        CURRENT
                      </div>
                    )}
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-bold text-lg">Free Trial</h3>
                        <p className="text-sm text-muted-foreground mt-1">Limited access to basic features</p>
                      </div>
                      <div className="text-2xl font-bold">$0<span className="text-sm font-normal text-muted-foreground">/mo</span></div>
                    </div>
                    <ul className="mt-4 space-y-2">
                      <li className="flex items-center text-sm">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                        <span>Home Fix Wizard access</span>
                      </li>
                      <li className="flex items-center text-sm">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                        <span>Basic chat capabilities</span>
                      </li>
                    </ul>
                    <div className="mt-4">
                      {subscriptionStatus === "Free Trial" ? (
                        <Button disabled className="w-full">Current Plan</Button>
                      ) : (
                        <Button variant="outline" className="w-full">Downgrade</Button>
                      )}
                    </div>
                  </div>
                  
                  {/* Standard Plan */}
                  <div className="border rounded-xl p-4 relative overflow-hidden border-blue-200 bg-blue-50/10">
                    {subscriptionStatus === "Standard" && (
                      <div className="absolute top-0 right-0 bg-blue-500 text-white text-xs px-3 py-1">
                        CURRENT
                      </div>
                    )}
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-bold text-lg">Standard Plan</h3>
                        <p className="text-sm text-muted-foreground mt-1">Access popular AI assistants</p>
                      </div>
                      <div className="flex flex-col items-end">
                        <div className="text-2xl font-bold">$1.99<span className="text-sm font-normal text-muted-foreground">/mo</span></div>
                        <div className="text-sm text-amber-600 flex items-center mt-1">
                          <Coins className="h-3 w-3 mr-1" />
                          <span>or 175 TXT/mo</span>
                        </div>
                      </div>
                    </div>
                    <ul className="mt-4 space-y-2">
                      <li className="flex items-center text-sm">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                        <span>All Free features</span>
                      </li>
                      <li className="flex items-center text-sm">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                        <span>Tax Law Attorney access</span>
                      </li>
                      <li className="flex items-center text-sm">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                        <span>Unlimited messaging</span>
                      </li>
                    </ul>
                    <div className="mt-4 flex flex-col sm:flex-row gap-2">
                      {subscriptionStatus === "Standard" ? (
                        <Button disabled className="w-full">Current Plan</Button>
                      ) : (
                        <>
                          <Button 
                            className="w-full bg-blue-600 hover:bg-blue-700"
                            onClick={() => handleSubscribeWithTokens("Standard")}
                            disabled={tokenBalance < 175}
                          >
                            <Coins className="mr-2 h-4 w-4" />
                            Subscribe with 175 TXT
                          </Button>
                          <Button className="w-full">
                            <CreditCard className="mr-2 h-4 w-4" />
                            Subscribe - $1.99/mo
                          </Button>
                        </>
                      )}
                    </div>
                    {tokenBalance < 175 && subscriptionStatus !== "Standard" && (
                      <p className="text-xs text-red-500 mt-2">
                        You need {175 - tokenBalance} more TXT tokens for this plan
                      </p>
                    )}
                  </div>
                  
                  {/* Premium Plan */}
                  <div className="border rounded-xl p-4 relative overflow-hidden border-amber-200 bg-amber-50/10">
                    {subscriptionStatus === "Premium" && (
                      <div className="absolute top-0 right-0 bg-amber-500 text-white text-xs px-3 py-1">
                        CURRENT
                      </div>
                    )}
                    <div className="absolute -top-6 -left-6">
                      <Star className="h-12 w-12 text-amber-400/20" />
                    </div>
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-bold text-lg">Premium Plan</h3>
                        <p className="text-sm text-muted-foreground mt-1">Access all specialized agents</p>
                      </div>
                      <div className="flex flex-col items-end">
                        <div className="text-2xl font-bold">$3.99<span className="text-sm font-normal text-muted-foreground">/mo</span></div>
                        <div className="text-sm text-amber-600 flex items-center mt-1">
                          <Coins className="h-3 w-3 mr-1" />
                          <span>or 350 TXT/mo</span>
                        </div>
                      </div>
                    </div>
                    <ul className="mt-4 space-y-2">
                      <li className="flex items-center text-sm">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                        <span>All Standard features</span>
                      </li>
                      <li className="flex items-center text-sm">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                        <span>Access to all specialized agents</span>
                      </li>
                      <li className="flex items-center text-sm">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                        <span>Priority support</span>
                      </li>
                      <li className="flex items-center text-sm">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                        <span>Advanced AI features</span>
                      </li>
                    </ul>
                    <div className="mt-4 flex flex-col sm:flex-row gap-2">
                      {subscriptionStatus === "Premium" ? (
                        <Button disabled className="w-full">Current Plan</Button>
                      ) : (
                        <>
                          <Button 
                            className="w-full bg-amber-600 hover:bg-amber-700"
                            onClick={() => handleSubscribeWithTokens("Premium")}
                            disabled={tokenBalance < 350}
                          >
                            <Coins className="mr-2 h-4 w-4" />
                            Subscribe with 350 TXT
                          </Button>
                          <Button className="w-full bg-amber-600 hover:bg-amber-700">
                            <CreditCard className="mr-2 h-4 w-4" />
                            Subscribe - $3.99/mo
                          </Button>
                        </>
                      )}
                    </div>
                    {tokenBalance < 350 && subscriptionStatus !== "Premium" && (
                      <p className="text-xs text-red-500 mt-2">
                        You need {350 - tokenBalance} more TXT tokens for this plan
                      </p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <CreditCard className="mr-2 h-5 w-5" />
                  Payment Methods
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Add a payment method to subscribe to premium features or buy TXT tokens
                </p>
                <div className="border rounded-lg p-4 bg-muted/20 text-center">
                  <p className="text-sm text-muted-foreground mb-3">No payment methods found</p>
                  <Button variant="outline" size="sm" disabled>
                    <CreditCard className="mr-2 h-4 w-4" />
                    Add Payment Method
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="settings">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Settings className="mr-2 h-5 w-5" />
                  Application Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Dark Mode</h3>
                    <p className="text-sm text-muted-foreground">Toggle between light and dark theme</p>
                  </div>
                  <div>
                    <Button variant="outline" size="sm" disabled>Toggle Theme</Button>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Notifications</h3>
                    <p className="text-sm text-muted-foreground">Manage notification preferences</p>
                  </div>
                  <div>
                    <Button variant="outline" size="sm" disabled>Configure</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </PageLayout>
  );
};

export default Account;
