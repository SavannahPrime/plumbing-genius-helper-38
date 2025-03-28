
import React from 'react';
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import QuickActionCategories from "@/components/shared/QuickActionCategories";

const ModernHero = () => {
  const navigate = useNavigate();

  return (
    <div className="container mx-auto px-4 py-12 md:py-20">
      <div className="text-center max-w-4xl mx-auto mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
          Your Personal AI Assistants for <span className="text-primary">Every Household Task</span>
        </h1>
        <p className="text-xl md:text-2xl text-muted-foreground mb-8">
          Connect with specialized AI experts for instant help with plumbing, electrical work, 
          home repairs, car maintenance, and more.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
          <Button 
            size="lg" 
            className="text-md px-8"
            onClick={() => navigate('/chat')}
          >
            Start Chatting <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
          <Button 
            variant="outline"
            size="lg"
            className="text-md px-8"
            onClick={() => navigate('/subscription')}
          >
            View Premium Plans
          </Button>
        </div>
        
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          <div className="bg-primary/10 text-primary text-sm px-4 py-1.5 rounded-full">Voice-Enabled</div>
          <div className="bg-primary/10 text-primary text-sm px-4 py-1.5 rounded-full">24/7 Availability</div>
          <div className="bg-primary/10 text-primary text-sm px-4 py-1.5 rounded-full">Step-by-Step Guidance</div>
          <div className="bg-primary/10 text-primary text-sm px-4 py-1.5 rounded-full">Image Recognition</div>
          <div className="bg-primary/10 text-primary text-sm px-4 py-1.5 rounded-full">Specialized Experts</div>
        </div>
      </div>
      
      <div className="mb-16">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Popular AI Assistants</h2>
          <Button variant="ghost" className="text-primary" onClick={() => navigate('/chat')}>
            View All <ArrowRight className="ml-1 h-4 w-4" />
          </Button>
        </div>
        <QuickActionCategories showToggle={true} showPopularOnly={true} />
      </div>
      
      <div className="border-t pt-8">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold mb-3">Manage Your Active Assistants</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Toggle your preferred assistants on or off. Premium assistants require a subscription.
          </p>
        </div>
        <QuickActionCategories 
          showToggle={true} 
          showDescription={false}
          showAction={false}
          size="sm"
        />
      </div>
    </div>
  );
};

export default ModernHero;
