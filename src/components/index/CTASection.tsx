
import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Star, CheckCircle, Coins, MessageSquare, Sparkles, Badge as BadgeIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";

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
        <div className="bg-white/5 backdrop-blur-md rounded-xl overflow-hidden border border-white/10 shadow-xl transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-6 text-white">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-xl font-bold">Free Trial</h3>
                <div className="mt-1 text-2xl font-bold">
                  $0<span className="text-sm font-normal text-white/70">/month</span>
                </div>
                
                <div className="flex items-center mt-2">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`h-4 w-4 ${i < 4 ? "fill-yellow-300 text-yellow-300" : "text-white/30"}`} 
                      />
                    ))}
                  </div>
                  <span className="ml-2 text-sm font-medium">4.0</span>
                </div>
              </div>
              
              <div className="flex items-center bg-white/20 px-3 py-1.5 rounded-full">
                <Coins className="h-4 w-4 mr-2 text-amber-300" />
                <span className="text-amber-100 font-medium">0 TXT</span>
              </div>
            </div>
          </div>
          
          <div className="p-6">
            <p className="text-white/70 mb-5">Try our basic AI assistants with limited features</p>
            
            <div className="mb-6">
              <h4 className="text-sm font-semibold text-white/90 mb-3">Included Features:</h4>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-400 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-white/70">Access to Home Fix Wizard</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-400 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-white/70">Basic chat capabilities</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-400 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-white/70">Image upload feature</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="p-6 border-t border-white/5">
            <Link to="/chat?specialty=plumber" className="w-full">
              <Button className="w-full bg-white/10 hover:bg-white/20 group">
                <MessageSquare className="mr-2 h-4 w-4" />
                Start Free
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>
        </div>
        
        {/* Standard Tier */}
        <div className="bg-gradient-to-br from-blue-600/5 to-purple-600/5 backdrop-blur-md rounded-xl overflow-hidden border border-blue-400/30 shadow-xl relative transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
          <div className="absolute top-0 right-0 bg-amber-400 text-amber-900 text-xs font-bold px-3 py-1 rounded-bl-lg">
            POPULAR
          </div>
          
          <div className="bg-gradient-to-r from-purple-500 to-purple-600 p-6 text-white">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-xl font-bold">Standard</h3>
                <div className="mt-1 text-2xl font-bold">
                  $1.99<span className="text-sm font-normal text-white/70">/month</span>
                </div>
                
                <div className="flex items-center mt-2">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`h-4 w-4 ${i < 4.5 ? "fill-yellow-300 text-yellow-300" : "text-white/30"}`} 
                      />
                    ))}
                  </div>
                  <span className="ml-2 text-sm font-medium">4.5</span>
                </div>
              </div>
              
              <div className="flex items-center bg-white/20 px-3 py-1.5 rounded-full">
                <Coins className="h-4 w-4 mr-2 text-amber-300" />
                <span className="text-amber-100 font-medium">175 TXT</span>
              </div>
            </div>
          </div>
          
          <div className="p-6">
            <p className="text-white/70 mb-5">Access to our most popular AI assistants</p>
            
            <div className="mb-6">
              <h4 className="text-sm font-semibold text-white/90 mb-3">Key Benefits:</h4>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-400 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-white/70">All Free features</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-400 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-white/70">Access to Tax Law Attorney</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-400 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-white/70">Enhanced response quality</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-400 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-white/70">Unlimited messaging</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="p-6 border-t border-white/5">
            <Link to="/account">
              <Button className="w-full bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 group">
                <MessageSquare className="mr-2 h-4 w-4" />
                Subscribe Now
                <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>
        </div>
        
        {/* Premium Tier */}
        <div className="bg-white/5 backdrop-blur-md rounded-xl overflow-hidden border border-white/10 shadow-xl transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
          <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-6 text-white">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-xl font-bold">Premium</h3>
                <div className="mt-1 text-2xl font-bold">
                  $3.99<span className="text-sm font-normal text-white/70">/month</span>
                </div>
                
                <div className="flex items-center mt-2">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`h-4 w-4 ${i < 5 ? "fill-yellow-300 text-yellow-300" : "text-white/30"}`} 
                      />
                    ))}
                  </div>
                  <span className="ml-2 text-sm font-medium">5.0</span>
                </div>
              </div>
              
              <div className="flex items-center bg-white/20 px-3 py-1.5 rounded-full">
                <Coins className="h-4 w-4 mr-2 text-amber-300" />
                <span className="text-amber-100 font-medium">350 TXT</span>
              </div>
            </div>
          </div>
          
          <div className="p-6">
            <p className="text-white/70 mb-5">Unlock all our specialized AI agents</p>
            
            <div className="mb-6">
              <h4 className="text-sm font-semibold text-white/90 mb-3">Premium Features:</h4>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-400 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-white/70">All Standard features</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-400 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-white/70">Access to all specialized agents</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-400 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-white/70">Priority support</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-400 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-white/70">Advanced AI features</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="p-6 border-t border-white/5">
            <Link to="/account">
              <Button className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 group">
                <MessageSquare className="mr-2 h-4 w-4" />
                Get Premium
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
