
import React from "react";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";
import { Wrench, ArrowRight, Link as LinkIcon, Briefcase, UserRound, Scale, HeartPulse, FileText } from "lucide-react";
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
        Home Genie Premium Services
      </h3>
      
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        <Link to="/tax-attorney" className="w-full max-w-xs">
          <div className="flex flex-col items-center text-center p-4 hover:bg-secondary/10 rounded-lg transition-colors cursor-pointer">
            <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center mb-2">
              <Scale className="h-6 w-6 text-primary" />
            </div>
            <h4 className="font-medium mb-1 font-space-grotesk">Tax Law Attorney</h4>
            <p className="text-sm text-neutrals">Expert tax advice and legal guidance</p>
          </div>
        </Link>
        
        <ArrowRight className="w-5 h-5 text-neutrals-steel hidden md:block" />
        
        <Link to="/psychiatrist" className="w-full max-w-xs">
          <div className="flex flex-col items-center text-center p-4 hover:bg-secondary/10 rounded-lg transition-colors cursor-pointer">
            <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center mb-2">
              <UserRound className="h-6 w-6 text-primary" />
            </div>
            <h4 className="font-medium mb-1 font-space-grotesk">Confidential Psychiatrist</h4>
            <p className="text-sm text-neutrals">Private mental health consultation</p>
          </div>
        </Link>
        
        <ArrowRight className="w-5 h-5 text-neutrals-steel hidden md:block" />
        
        <Link to="/financial-advisor" className="w-full max-w-xs">
          <div className="flex flex-col items-center text-center p-4 hover:bg-secondary/10 rounded-lg transition-colors cursor-pointer">
            <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center mb-2">
              <Briefcase className="h-6 w-6 text-primary" />
            </div>
            <h4 className="font-medium mb-1 font-space-grotesk">Financial Advisor</h4>
            <p className="text-sm text-neutrals">Professional investment and planning guidance</p>
          </div>
        </Link>
      </div>
      
      <div className="flex flex-col md:flex-row items-center justify-center gap-6 mt-6">
        <Link to="/wellness-coach" className="w-full max-w-xs">
          <div className="flex flex-col items-center text-center p-4 hover:bg-secondary/10 rounded-lg transition-colors cursor-pointer">
            <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center mb-2">
              <HeartPulse className="h-6 w-6 text-primary" />
            </div>
            <h4 className="font-medium mb-1 font-space-grotesk">Wellness Coach</h4>
            <p className="text-sm text-neutrals">Personalized health and wellness guidance</p>
          </div>
        </Link>
        
        <ArrowRight className="w-5 h-5 text-neutrals-steel hidden md:block" />
        
        <Link to="/legal-consultant" className="w-full max-w-xs">
          <div className="flex flex-col items-center text-center p-4 hover:bg-secondary/10 rounded-lg transition-colors cursor-pointer">
            <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center mb-2">
              <FileText className="h-6 w-6 text-primary" />
            </div>
            <h4 className="font-medium mb-1 font-space-grotesk">Legal Consultant</h4>
            <p className="text-sm text-neutrals">General legal advice for everyday matters</p>
          </div>
        </Link>
      </div>
      
      <div className="mt-6 flex justify-center">
        <Link to="/premium-services">
          <Button className="bg-primary hover:bg-primary/90 rounded-xl">
            Explore All Premium Services
            <ArrowRight className="w-4 h-4 ml-1" />
          </Button>
        </Link>
      </div>
    </motion.section>
  );
};

export default QuickFixSection;
