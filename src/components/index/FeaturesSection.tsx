
import React from "react";
import { Bot, Workflow, Code, MessageSquare, Shield, Sparkles } from "lucide-react";

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
    <section id="features" className="container mx-auto px-4 py-20">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Connect. Integrate. Automate.</h2>
        <p className="text-xl text-gray-300 max-w-2xl mx-auto">
          Our platform makes it easy to connect your software with AI agents, unlocking powerful new capabilities.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map((feature, index) => (
          <div key={index} className="bg-slate-800/50 p-8 rounded-xl border border-slate-700/50 hover:border-blue-500/50 transition-colors">
            <div className="bg-slate-700/50 p-3 rounded-lg w-fit mb-4">
              {feature.icon}
            </div>
            <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
            <p className="text-gray-300">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturesSection;
