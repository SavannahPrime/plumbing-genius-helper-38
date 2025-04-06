
import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Star, CheckCircle } from "lucide-react";

const CTASection = () => {
  return (
    <section className="container mx-auto px-4 py-20">
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Choose Your Perfect AI Assistant</h2>
        <p className="text-xl text-white/80 max-w-2xl mx-auto">
          Access specialized AI agents for all your needs, starting at just $1.99/month
        </p>
      </div>
      
      <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {/* Free Tier */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl overflow-hidden border border-white/20 shadow-xl">
          <div className="p-6">
            <h3 className="text-2xl font-bold">Free Trial</h3>
            <div className="mt-2 text-3xl font-bold">
              $0<span className="text-sm font-normal text-white/70">/month</span>
            </div>
            <p className="mt-4 text-white/70">Try our basic AI assistants with limited features</p>
            
            <ul className="mt-6 space-y-3">
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-400 mr-2 mt-0.5 flex-shrink-0" />
                <span>Access to Home Fix Wizard</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-400 mr-2 mt-0.5 flex-shrink-0" />
                <span>Basic chat capabilities</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-400 mr-2 mt-0.5 flex-shrink-0" />
                <span>Image upload feature</span>
              </li>
            </ul>
          </div>
          
          <div className="p-6 bg-white/5">
            <Link to="/chat?specialty=plumber">
              <Button className="w-full bg-white/20 hover:bg-white/30 border border-white/40 text-white">
                Start Free
              </Button>
            </Link>
          </div>
        </div>
        
        {/* Standard Tier */}
        <div className="bg-gradient-to-br from-blue-600/90 to-purple-600/90 backdrop-blur-md rounded-2xl overflow-hidden border border-blue-400/30 shadow-xl relative">
          <div className="absolute top-0 right-0 bg-amber-400 text-amber-900 text-xs font-bold px-3 py-1 rounded-bl-lg">
            POPULAR
          </div>
          
          <div className="p-6">
            <h3 className="text-2xl font-bold">Standard</h3>
            <div className="mt-2 text-3xl font-bold">
              $1.99<span className="text-sm font-normal text-white/70">/month</span>
            </div>
            <p className="mt-4 text-white/70">Access to our most popular AI assistants</p>
            
            <ul className="mt-6 space-y-3">
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-400 mr-2 mt-0.5 flex-shrink-0" />
                <span>All Free features</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-400 mr-2 mt-0.5 flex-shrink-0" />
                <span>Access to Tax Law Attorney</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-400 mr-2 mt-0.5 flex-shrink-0" />
                <span>Enhanced response quality</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-400 mr-2 mt-0.5 flex-shrink-0" />
                <span>Unlimited messaging</span>
              </li>
            </ul>
          </div>
          
          <div className="p-6 bg-white/10">
            <Link to="/account">
              <Button className="w-full bg-white hover:bg-white/90 text-blue-600 font-bold">
                Subscribe Now <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
        
        {/* Premium Tier */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl overflow-hidden border border-white/20 shadow-xl">
          <div className="p-6">
            <h3 className="text-2xl font-bold">Premium</h3>
            <div className="mt-2 text-3xl font-bold">
              $3.99<span className="text-sm font-normal text-white/70">/month</span>
            </div>
            <p className="mt-4 text-white/70">Unlock all our specialized AI agents</p>
            
            <ul className="mt-6 space-y-3">
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-400 mr-2 mt-0.5 flex-shrink-0" />
                <span>All Standard features</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-400 mr-2 mt-0.5 flex-shrink-0" />
                <span>Access to all specialized agents</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-400 mr-2 mt-0.5 flex-shrink-0" />
                <span>Priority support</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-400 mr-2 mt-0.5 flex-shrink-0" />
                <span>Advanced AI features</span>
              </li>
            </ul>
          </div>
          
          <div className="p-6 bg-white/5">
            <Link to="/account">
              <Button className="w-full bg-white/20 hover:bg-white/30 border border-white/40 text-white">
                Get Premium
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
