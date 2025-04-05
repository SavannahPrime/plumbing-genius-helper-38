
import React from "react";
import { Button } from "@/components/ui/button";

const PricingSection = () => {
  const plans = [
    {
      title: "Starter",
      price: "$49",
      description: "Perfect for small teams and startups",
      features: [
        "5 AI Agent Connections",
        "100,000 API Calls/month",
        "Standard Support",
        "Core Integrations",
      ],
      cta: "Get Started",
      highlighted: false,
    },
    {
      title: "Professional",
      price: "$149",
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
    },
    {
      title: "Enterprise",
      price: "Custom",
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
    },
  ];

  return (
    <section id="pricing" className="container mx-auto px-4 py-20">
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
            className={`p-8 rounded-xl border ${
              plan.highlighted 
                ? "border-blue-500 bg-blue-500/10 relative" 
                : "border-slate-700/50 bg-slate-800/50"
            }`}
          >
            {plan.highlighted && (
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-medium">
                Most Popular
              </div>
            )}
            <h3 className="text-2xl font-bold mb-2">{plan.title}</h3>
            <div className="flex items-end mb-4">
              <span className="text-4xl font-bold">{plan.price}</span>
              {plan.price !== "Custom" && <span className="text-gray-400 ml-1">/month</span>}
            </div>
            <p className="text-gray-300 mb-6">{plan.description}</p>
            <ul className="space-y-3 mb-8">
              {plan.features.map((feature, i) => (
                <li key={i} className="flex items-center">
                  <svg className="h-5 w-5 text-blue-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  {feature}
                </li>
              ))}
            </ul>
            <Button 
              className={`w-full ${
                plan.highlighted 
                  ? "bg-blue-600 hover:bg-blue-700" 
                  : "bg-slate-700 hover:bg-slate-600"
              }`}
            >
              {plan.cta}
            </Button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PricingSection;
