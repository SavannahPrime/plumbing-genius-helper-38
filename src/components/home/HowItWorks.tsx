
import React from "react";
import { Camera, Zap, Wrench } from "lucide-react";
import { motion } from "framer-motion";

const HowItWorks = () => {
  const steps = [
    {
      icon: <Camera className="h-8 w-8 text-white" />,
      title: "Snap a photo",
      description: "Take a picture of your problem, or describe it in detail",
      number: "1",
      color: "bg-primary"
    },
    {
      icon: <Zap className="h-8 w-8 text-white" />,
      title: "AI figures it out",
      description: "Our AI identifies the issue and creates a custom solution",
      number: "2",
      color: "bg-secondary"
    },
    {
      icon: <Wrench className="h-8 w-8 text-white" />,
      title: "You solve it",
      description: "Follow the step-by-step guide or get connected to local help",
      number: "3",
      color: "bg-accent"
    }
  ];

  return (
    <section className="my-16 py-10">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold mb-3 font-space-grotesk">How It Works</h2>
        <p className="text-lg text-primary/70 max-w-2xl mx-auto">
          From problem to solution in minutes, not days
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {steps.map((step, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="relative bg-white rounded-xl shadow-card p-6 text-center"
          >
            <div className={`w-16 h-16 ${step.color} rounded-full mx-auto mb-4 flex items-center justify-center`}>
              {step.icon}
            </div>
            
            <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white font-bold">
              {step.number}
            </div>
            
            <h3 className="text-xl font-bold mb-2">{step.title}</h3>
            <p className="text-primary/70">{step.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default HowItWorks;
