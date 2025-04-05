
import React from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const HowItWorksSection = () => {
  const steps = [
    {
      step: "01",
      title: "Select Your Agents",
      description: "Choose from our marketplace of pre-built AI agents or connect your custom agents through our open platform."
    },
    {
      step: "02",
      title: "Connect Your Software",
      description: "Use our simple integration tools to connect your applications to the AI agents of your choice."
    },
    {
      step: "03",
      title: "Deploy & Scale",
      description: "Deploy your connected systems to production and scale seamlessly as your needs grow."
    },
  ];

  return (
    <section id="how-it-works" className="container mx-auto px-4 py-20 bg-gradient-to-b from-slate-900 to-slate-950 rounded-3xl">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">How connect.software Works</h2>
        <p className="text-xl text-gray-300 max-w-2xl mx-auto">
          Get up and running with AI agent integration in just a few simple steps.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {steps.map((step, index) => (
          <div key={index} className="relative">
            <div className="text-5xl font-bold text-blue-500/20 absolute -top-6 left-0">{step.step}</div>
            <div className="bg-slate-800/50 p-8 rounded-xl border border-slate-700/50 relative z-10">
              <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
              <p className="text-gray-300">{step.description}</p>
            </div>
            {index < 2 && (
              <div className="hidden md:block absolute top-1/2 -right-4 z-20">
                <ArrowRight className="h-8 w-8 text-blue-500" />
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-16 text-center">
        <Link to="/chat?specialty=financial">
          <Button className="bg-blue-600 hover:bg-blue-700 text-lg px-8 py-6">
            Chat with Financial Advisor
          </Button>
        </Link>
      </div>
    </section>
  );
};

export default HowItWorksSection;
