
import React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Coins, CheckCircle, Star, Sparkles, ArrowRight, MessageSquare } from "lucide-react";
import { Link } from "react-router-dom";

const PricingSection = () => {
  const plans = [
    {
      title: "Starter",
      price: "$49",
      monthlyPrice: 49,
      txtTokens: 5000,
      description: "Perfect for small teams and startups",
      features: [
        "5 AI Agent Connections",
        "100,000 API Calls/month",
        "Standard Support",
        "Core Integrations",
      ],
      cta: "Get Started",
      highlighted: false,
      colorClass: "bg-blue-500",
      specialty: "plumber",
    },
    {
      title: "Professional",
      price: "$149",
      monthlyPrice: 149,
      txtTokens: 20000,
      description: "Ideal for growing businesses",
      features: [
        "25 AI Agent Connections",
        "1,000,000 API Calls/month",
        "Priority Support",
        "Advanced Integrations",
        "Custom Workflows",
      ],
      cta: "Get Started",
      highlighted: true,
      colorClass: "bg-purple-500",
      specialty: "tax",
    },
    {
      title: "Enterprise",
      price: "Custom",
      monthlyPrice: null,
      txtTokens: null,
      description: "For organizations with advanced needs",
      features: [
        "Unlimited AI Agent Connections",
        "Custom API Call Volume",
        "24/7 Dedicated Support",
        "Enterprise Integrations",
        "Advanced Security",
        "Custom Development",
      ],
      cta: "Contact Sales",
      highlighted: false,
      colorClass: "bg-emerald-500",
      specialty: "financial",
    },
  ];

  return (
    <section id="pricing" className="container mx-auto px-4 py-20 text-white">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Simple, Transparent Pricing</h2>
        <p className="text-xl text-gray-300 max-w-2xl mx-auto">
          Choose the plan that fits your needs, from startups to enterprise organizations.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        {plans.map((plan, index) => (
          <div 
            key={index} 
            className={`rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-slate-700/30`}
          >
            <div className={`p-6 ${plan.colorClass} text-white relative`}>
              {plan.highlighted && (
                <div className="absolute top-3 right-3">
                  <div className="bg-yellow-300 text-yellow-900 px-2 py-1 rounded-full flex items-center shadow-lg">
                    <Sparkles className="h-3 w-3 fill-yellow-900 mr-1" />
                    <span className="text-xs font-semibold">Most Popular</span>
                  </div>
                </div>
              )}
              
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-bold mb-1">{plan.title}</h3>
                  <div className="flex items-end">
                    <span className="text-3xl font-bold">{plan.price}</span>
                    {plan.price !== "Custom" && <span className="text-white/70 ml-1">/month</span>}
                  </div>
                </div>
                
                {plan.txtTokens && (
                  <div className="flex items-center bg-white/20 px-3 py-1.5 rounded-full">
                    <Coins className="h-4 w-4 mr-2 text-amber-300" />
                    <span className="text-amber-100 font-medium">{plan.txtTokens} TXT</span>
                  </div>
                )}
              </div>
            </div>
            
            <div className="p-6 bg-slate-800/50">
              <p className="text-gray-300 mb-6">{plan.description}</p>
              
              <div className="mb-6">
                <h4 className="text-sm font-semibold text-gray-200 mb-3">Key Features:</h4>
                <ul className="space-y-3">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-400 mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-300 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <Link to={plan.price === "Custom" ? "/contact" : `/chat?specialty=${plan.specialty}`} className="w-full">
                <Button 
                  className={`w-full group ${
                    plan.highlighted 
                      ? "bg-purple-500 hover:bg-purple-600" 
                      : plan.colorClass + " hover:opacity-90"
                  }`}
                >
                  <MessageSquare className="mr-2 h-4 w-4" />
                  {plan.cta}
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PricingSection;
