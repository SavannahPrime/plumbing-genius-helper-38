
import React from "react";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";
import { Wrench, ArrowRight, Link as LinkIcon } from "lucide-react";
import { motion } from "framer-motion";
import { specializedAgents, AgentSpecialty } from "@/services/specializedAgentService";

const QuickFixSection = () => {
  const location = useLocation();
  
  // Determine which specialized agent to use based on the current route
  const getCurrentAgentSpecialty = (): AgentSpecialty => {
    const path = location.pathname;
    
    if (path.includes("electrician")) return "electrician";
    if (path.includes("handyman")) return "handyman";
    if (path.includes("mechanic")) return "mechanic";
    if (path.includes("landscaper")) return "landscaper";
    if (path.includes("chef")) return "chef";
    if (path.includes("stylist")) return "stylist";
    if (path.includes("cleaning")) return "cleaning";
    if (path.includes("gadget")) return "gadget";
    
    // Default to plumber
    return "plumber";
  };
  
  // Get context-specific glossary path
  const getGlossaryPath = () => {
    const currentSpecialty = getCurrentAgentSpecialty();
    return `/${currentSpecialty}/glossary`;
  };
  
  const currentSpecialty = getCurrentAgentSpecialty();
  const agent = specializedAgents[currentSpecialty];
  
  return (
    <motion.section
      className="mt-20 p-6 bg-white rounded-2xl shadow-card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.6 }}
    >
      <h3 className="text-xl font-semibold mb-4 flex items-center font-space-grotesk">
        <LinkIcon className="w-5 h-5 mr-2 text-accent" />
        MCP Business Solutions
      </h3>
      
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        <Link to={getGlossaryPath()} className="w-full max-w-xs">
          <div className="flex flex-col items-center text-center p-4 hover:bg-secondary/10 rounded-lg transition-colors cursor-pointer">
            <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center mb-2">
              <span className="text-xl">💼</span>
            </div>
            <h4 className="font-medium mb-1 font-space-grotesk">Business Integration</h4>
            <p className="text-sm text-neutrals">Connect your systems to our MCP platform</p>
          </div>
        </Link>
        
        <ArrowRight className="w-5 h-5 text-neutrals-steel hidden md:block" />
        
        <Link to="/diagnosis" className="w-full max-w-xs">
          <div className="flex flex-col items-center text-center p-4 hover:bg-secondary/10 rounded-lg transition-colors cursor-pointer">
            <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center mb-2">
              <span className="text-xl">📊</span>
            </div>
            <h4 className="font-medium mb-1 font-space-grotesk">Custom AI Training</h4>
            <p className="text-sm text-neutrals">Fine-tune assistants for your business needs</p>
          </div>
        </Link>
        
        <ArrowRight className="w-5 h-5 text-neutrals-steel hidden md:block" />
        
        <Link to="/step-by-step" className="w-full max-w-xs">
          <div className="flex flex-col items-center text-center p-4 hover:bg-secondary/10 rounded-lg transition-colors cursor-pointer">
            <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center mb-2">
              <span className="text-xl">🚀</span>
            </div>
            <h4 className="font-medium mb-1 font-space-grotesk">Multi-Channel Deployment</h4>
            <p className="text-sm text-neutrals">Deploy AI across all your business channels</p>
          </div>
        </Link>
      </div>
      
      <div className="mt-6 flex justify-center">
        <Link to="/step-by-step">
          <Button className="bg-primary hover:bg-primary/90 rounded-xl">
            Get Started
            <ArrowRight className="w-4 h-4 ml-1" />
          </Button>
        </Link>
      </div>
    </motion.section>
  );
};

export default QuickFixSection;
