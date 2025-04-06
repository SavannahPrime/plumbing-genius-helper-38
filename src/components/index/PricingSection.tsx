
import React from "react";
import PricingCard, { PricingPlan } from "@/components/shared/PricingCard";
import { motion } from "framer-motion";

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
    <section id="pricing" className="container mx-auto px-4 py-24 text-white">
      <div className="text-center mb-16">
        <div className="inline-block px-4 py-1 bg-purple-500/20 rounded-full text-purple-300 text-sm font-medium mb-4">
          Pricing Plans
        </div>
        <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
          Simple, Transparent Pricing
        </h2>
        <p className="text-xl text-gray-300 max-w-2xl mx-auto">
          Choose the plan that fits your needs, from startups to enterprise organizations.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        {plans.map((plan, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
          >
            <PricingCard plan={plan} />
          </motion.div>
        ))}
      </div>
      
      <div className="mt-16 text-center max-w-3xl mx-auto">
        <p className="text-gray-400 bg-slate-800/30 p-4 rounded-lg border border-slate-700/50">
          All plans include access to our core platform features. Need a custom solution? 
          <a href="/contact" className="text-purple-400 hover:text-purple-300 ml-1">
            Contact our sales team
          </a> for a tailored package.
        </p>
      </div>
    </section>
  );
};

export default PricingSection;
