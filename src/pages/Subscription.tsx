
import React from 'react';
import { Button } from "@/components/ui/card";
import { Check } from "lucide-react";
import { EveryFixHeader } from "@/components/shared/EveryFixHeader";
import { toast } from "sonner";

const Subscription = () => {
  const handleSubscribe = (plan: string) => {
    toast.success(`${plan} subscription selected`, {
      description: "This would connect to a payment processor in production"
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <EveryFixHeader title="Premium Subscription Plans" />
      
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold mb-4">
            Unlock Premium AI Assistants
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Get unlimited access to all our specialized AI assistants, including premium experts in electrical work, auto mechanics, fashion styling, and more.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {/* Monthly Plan */}
          <div className="border rounded-lg p-6 flex flex-col">
            <h3 className="text-xl font-semibold mb-2">Monthly</h3>
            <div className="text-3xl font-bold mb-1">$9.99<span className="text-base font-normal text-muted-foreground">/month</span></div>
            <p className="text-muted-foreground mb-6">Billed monthly</p>
            <ul className="space-y-3 mb-6 flex-grow">
              <li className="flex items-start">
                <Check size={20} className="text-green-500 shrink-0 mr-2 mt-0.5" />
                <span>Access to all premium assistants</span>
              </li>
              <li className="flex items-start">
                <Check size={20} className="text-green-500 shrink-0 mr-2 mt-0.5" />
                <span>Unlimited conversations</span>
              </li>
              <li className="flex items-start">
                <Check size={20} className="text-green-500 shrink-0 mr-2 mt-0.5" />
                <span>Voice chat capabilities</span>
              </li>
            </ul>
            <Button className="w-full bg-primary text-white" onClick={() => handleSubscribe("Monthly")}>
              Subscribe Monthly
            </Button>
          </div>
          
          {/* Annual Plan */}
          <div className="border rounded-lg p-6 flex flex-col relative overflow-hidden shadow-lg border-primary">
            <div className="absolute top-0 right-0 bg-primary text-white text-xs px-3 py-1 rounded-bl-lg">
              BEST VALUE
            </div>
            <h3 className="text-xl font-semibold mb-2">Annual</h3>
            <div className="text-3xl font-bold mb-1">$7.99<span className="text-base font-normal text-muted-foreground">/month</span></div>
            <p className="text-muted-foreground mb-2">Billed annually at $95.88</p>
            <p className="text-green-600 font-medium mb-6">Save 20%</p>
            <ul className="space-y-3 mb-6 flex-grow">
              <li className="flex items-start">
                <Check size={20} className="text-green-500 shrink-0 mr-2 mt-0.5" />
                <span>Access to all premium assistants</span>
              </li>
              <li className="flex items-start">
                <Check size={20} className="text-green-500 shrink-0 mr-2 mt-0.5" />
                <span>Unlimited conversations</span>
              </li>
              <li className="flex items-start">
                <Check size={20} className="text-green-500 shrink-0 mr-2 mt-0.5" />
                <span>Voice chat capabilities</span>
              </li>
              <li className="flex items-start">
                <Check size={20} className="text-green-500 shrink-0 mr-2 mt-0.5" />
                <span>Priority support</span>
              </li>
            </ul>
            <Button className="w-full bg-primary text-white" onClick={() => handleSubscribe("Annual")}>
              Subscribe Annually
            </Button>
          </div>
          
          {/* Lifetime Plan */}
          <div className="border rounded-lg p-6 flex flex-col">
            <h3 className="text-xl font-semibold mb-2">Lifetime</h3>
            <div className="text-3xl font-bold mb-1">$199<span className="text-base font-normal text-muted-foreground"> one-time</span></div>
            <p className="text-muted-foreground mb-6">Pay once, use forever</p>
            <ul className="space-y-3 mb-6 flex-grow">
              <li className="flex items-start">
                <Check size={20} className="text-green-500 shrink-0 mr-2 mt-0.5" />
                <span>Access to all premium assistants</span>
              </li>
              <li className="flex items-start">
                <Check size={20} className="text-green-500 shrink-0 mr-2 mt-0.5" />
                <span>Unlimited conversations</span>
              </li>
              <li className="flex items-start">
                <Check size={20} className="text-green-500 shrink-0 mr-2 mt-0.5" />
                <span>Voice chat capabilities</span>
              </li>
              <li className="flex items-start">
                <Check size={20} className="text-green-500 shrink-0 mr-2 mt-0.5" />
                <span>All future updates included</span>
              </li>
              <li className="flex items-start">
                <Check size={20} className="text-green-500 shrink-0 mr-2 mt-0.5" />
                <span>VIP support</span>
              </li>
            </ul>
            <Button className="w-full bg-primary text-white" onClick={() => handleSubscribe("Lifetime")}>
              Buy Lifetime
            </Button>
          </div>
        </div>
        
        <div className="text-center">
          <p className="text-muted-foreground mb-6">
            All plans include a 7-day money-back guarantee. No questions asked.
          </p>
          <p className="text-sm text-muted-foreground">
            By subscribing, you agree to our Terms of Service and Privacy Policy.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Subscription;
