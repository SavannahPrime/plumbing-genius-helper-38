
import React from "react";
import { ArrowRight, ArrowUpRight, Code, Sparkles, Workflow } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const HowItWorksSection = () => {
  const steps = [
    {
      step: "01",
      title: "Select Your Agents",
      description: "Choose from our marketplace of pre-built AI agents or connect your custom agents through our open platform.",
      icon: <Sparkles className="h-6 w-6 text-blue-400" />
    },
    {
      step: "02",
      title: "Connect Your Software",
      description: "Use our simple integration tools to connect your applications to the AI agents of your choice.",
      icon: <Code className="h-6 w-6 text-blue-400" />
    },
    {
      step: "03",
      title: "Deploy & Scale",
      description: "Deploy your connected systems to production and scale seamlessly as your needs grow.",
      icon: <Workflow className="h-6 w-6 text-blue-400" />
    },
  ];

  return (
    <section id="how-it-works" className="container mx-auto px-4 py-24">
      <div className="bg-gradient-to-b from-slate-900 to-slate-950 rounded-3xl p-12 border border-slate-800/50 shadow-xl">
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-1 bg-blue-500/20 rounded-full text-blue-300 text-sm font-medium mb-4">
            How It Works
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
            SavannahPrime Agent Tailored Process
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Get up and running with AI agent integration in just a few simple steps.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <motion.div 
              key={index} 
              className="relative"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="text-5xl font-bold text-blue-500/20 absolute -top-6 left-0">{step.step}</div>
              <div className="bg-slate-800/50 p-8 rounded-xl border border-slate-700/50 relative z-10 h-full">
                <div className="bg-blue-500/10 p-3 rounded-lg w-fit mb-4">
                  {step.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                <p className="text-gray-300">{step.description}</p>
              </div>
              {index < 2 && (
                <div className="hidden md:block absolute top-1/2 -right-4 z-20">
                  <ArrowRight className="h-6 w-6 text-blue-500" />
                </div>
              )}
            </motion.div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <Link to="/chat?specialty=financial">
            <Button className="bg-blue-600 hover:bg-blue-700 text-lg px-8 py-6 rounded-xl group shadow-lg shadow-blue-500/20">
              Chat with Financial Advisor
              <ArrowUpRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
            </Button>
          </Link>
          <p className="text-gray-400 mt-4">
            Experience our professional services with enterprise-grade security
          </p>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
