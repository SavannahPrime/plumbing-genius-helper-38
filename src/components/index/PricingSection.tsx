
import React from "react";
import PricingCard, { PricingPlan } from "@/components/shared/PricingCard";

const PricingSection = () => {
  const plans: PricingPlan[] = [
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
          <PricingCard key={index} plan={plan} />
        ))}
      </div>
    </section>
  );
};

export default PricingSection;
