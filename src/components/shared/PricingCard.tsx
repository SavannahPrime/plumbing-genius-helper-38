
import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { CheckCircle, Coins, MessageSquare, ArrowRight, Sparkles, Star, Shield } from "lucide-react";
import { cn } from "@/lib/utils";

export interface PricingPlan {
  title: string;
  price: string;
  monthlyPrice?: number | null;
  txtTokens?: number | null;
  description: string;
  features: string[];
  cta: string;
  highlighted?: boolean;
  colorClass: string;
  specialty: string;
}

interface PricingCardProps {
  plan: PricingPlan;
}

const PricingCard: React.FC<PricingCardProps> = ({ plan }) => {
  const cardBorderClass = plan.highlighted 
    ? "border-purple-500/30 shadow-lg shadow-purple-500/10" 
    : "border-slate-700/30 hover:border-slate-600/50";
  
  return (
    <div 
      className={cn(
        "rounded-xl overflow-hidden transition-all duration-300 hover:-translate-y-2 border",
        cardBorderClass
      )}
    >
      <div className={`p-6 ${plan.colorClass} text-white relative`}>
        {plan.highlighted && (
          <div className="absolute top-3 right-3">
            <div className="bg-yellow-300 text-yellow-900 px-2 py-1 rounded-full flex items-center shadow-lg">
              <Sparkles className="h-3 w-3 fill-yellow-900 mr-1" />
              <span className="text-xs font-semibold">Most Popular</span>
            </div>
          </div>
        )}
        
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-xl font-bold mb-1">{plan.title}</h3>
            <div className="flex items-end">
              <span className="text-3xl font-bold">{plan.price}</span>
              {plan.price !== "Custom" && <span className="text-white/70 ml-1">/month</span>}
            </div>
            
            {/* Enhanced star rating */}
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
          
          {plan.txtTokens && (
            <div className="flex items-center bg-white/20 px-3 py-1.5 rounded-full">
              <Coins className="h-4 w-4 mr-2 text-amber-300" />
              <span className="text-amber-100 font-medium">{plan.txtTokens.toLocaleString()} TXT</span>
            </div>
          )}
        </div>
      </div>
      
      <div className="p-6 bg-slate-800/50 h-full flex flex-col">
        <p className="text-gray-300 mb-6">{plan.description}</p>
        
        <div className="mb-6 flex-grow">
          <h4 className="text-sm font-semibold text-gray-200 mb-3 flex items-center">
            <Shield className="w-4 h-4 mr-2 text-blue-400" />
            Key Features:
          </h4>
          <ul className="space-y-3">
            {plan.features.map((feature, i) => (
              <li key={i} className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-400 mr-2 mt-0.5 flex-shrink-0" />
                <span className="text-gray-300 text-sm">{feature}</span>
              </li>
            ))}
          </ul>
        </div>
        
        <Link to={plan.price === "Custom" ? "/contact" : `/chat?specialty=${plan.specialty}`} className="w-full mt-auto">
          <Button 
            className={cn(
              "w-full group hover:shadow-lg", 
              plan.highlighted 
                ? "bg-purple-500 hover:bg-purple-600" 
                : `${plan.colorClass} hover:opacity-90`
            )}
          >
            <MessageSquare className="mr-2 h-4 w-4" />
            {plan.cta}
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default PricingCard;
