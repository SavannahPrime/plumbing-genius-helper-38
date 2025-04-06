
import React from "react";
import { Bot, Workflow, Code, MessageSquare, Shield, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

const FeaturesSection = () => {
  const features = [
    {
      icon: <Bot className="h-8 w-8 text-blue-500" />,
      title: "AI Agent Integration",
      description: "Seamlessly connect your software with intelligent AI agents that can understand context, make decisions, and take actions."
    },
    {
      icon: <Workflow className="h-8 w-8 text-green-500" />,
      title: "Automated Workflows",
      description: "Create sophisticated workflows between your applications and AI agents to automate complex business processes."
    },
    {
      icon: <Code className="h-8 w-8 text-purple-500" />,
      title: "Developer-Friendly APIs",
      description: "Our robust APIs and SDKs make it easy to integrate AI capabilities into your existing applications."
    },
    {
      icon: <MessageSquare className="h-8 w-8 text-yellow-500" />,
      title: "Natural Language Processing",
      description: "Enable your applications to understand and respond to natural language queries with advanced NLP capabilities."
    },
    {
      icon: <Shield className="h-8 w-8 text-red-500" />,
      title: "Secure Connections",
      description: "Enterprise-grade security ensures that all connections between your software and AI agents are protected."
    },
    {
      icon: <Sparkles className="h-8 w-8 text-pink-500" />,
      title: "Smart Automation",
      description: "Leverage machine learning to create intelligent automations that improve over time."
    }
  ];

  return (
    <section id="features" className="container mx-auto px-4 py-24">
      <div className="text-center mb-16">
        <div className="inline-block px-4 py-1 bg-indigo-500/20 rounded-full text-indigo-300 text-sm font-medium mb-4">
          Features
        </div>
        <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
          Connect. Integrate. Automate.
        </h2>
        <p className="text-xl text-gray-300 max-w-2xl mx-auto">
          Our platform makes it easy to connect your software with AI agents, unlocking powerful new capabilities.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map((feature, index) => (
          <motion.div 
            key={index} 
            className="bg-slate-800/50 p-8 rounded-xl border border-slate-700/50 hover:border-blue-500/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-blue-900/20"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
          >
            <div className="bg-slate-700/50 p-4 rounded-lg w-fit mb-5">
              {feature.icon}
            </div>
            <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
            <p className="text-gray-300">{feature.description}</p>
          </motion.div>
        ))}
      </div>

      <div className="mt-16 max-w-4xl mx-auto">
        <div className="p-6 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-xl border border-blue-500/20">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="bg-blue-500/20 p-4 rounded-full">
              <Shield className="h-8 w-8 text-blue-400" />
            </div>
            <div className="text-center md:text-left">
              <h4 className="text-xl font-semibold mb-2">Enterprise-ready, Secure Integration</h4>
              <p className="text-gray-300">
                All our agents are trained with security best practices and deploy with end-to-end encryption.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
