
import React from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Shield, Zap } from "lucide-react";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <section className="container mx-auto px-4 py-24 md:py-32">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="space-y-8"
        >
          <div className="inline-flex items-center px-3 py-1 border border-blue-500/30 bg-blue-500/5 rounded-full text-sm text-blue-400">
            <Sparkles className="w-4 h-4 mr-2" />
            The AI Agent Marketplace
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold leading-tight">
            <span className="bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
              Connect with Specialized
            </span>
            <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent block mt-2">
              AI Agents & Advisors
            </span>
          </h1>
          
          <p className="text-xl text-gray-300 leading-relaxed">
            Access premium AI assistants for both business services and professional consultations. 
            Pay with traditional methods or TXT tokens for enhanced flexibility.
          </p>
          
          <div className="flex flex-wrap gap-4 pt-4">
            <Link to="/chat?specialty=financial">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl px-6 py-6 shadow-lg shadow-blue-600/20">
                Financial Advisor
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link to="/chat?specialty=plumber">
              <Button size="lg" variant="outline" className="border-gray-600 rounded-xl px-6 py-6 hover:bg-white/5">
                Home Fix Wizard
              </Button>
            </Link>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-6 pt-4">
            <div className="flex items-center">
              <div className="bg-blue-500/10 p-2 rounded-full">
                <Shield className="h-5 w-5 text-blue-400" />
              </div>
              <p className="ml-3 text-sm text-gray-300">Enterprise-grade security</p>
            </div>
            <div className="flex items-center">
              <div className="bg-purple-500/10 p-2 rounded-full">
                <Zap className="h-5 w-5 text-purple-400" />
              </div>
              <p className="ml-3 text-sm text-gray-300">24/7 availability</p>
            </div>
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="hidden lg:block"
        >
          <HeroGraphic />
        </motion.div>
      </div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.8 }}
        className="mt-20"
      >
        <p className="text-center text-gray-400 mb-6">Trusted by innovative companies</p>
        <div className="flex flex-wrap justify-center gap-x-12 gap-y-6">
          {['Microsoft', 'Google', 'Amazon', 'Slack', 'Salesforce', 'Adobe'].map((company, index) => (
            <motion.div 
              key={company}
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.7 }}
              transition={{ duration: 0.5, delay: 0.2 * index }}
              className="text-xl font-semibold bg-gradient-to-r from-gray-200 to-gray-400 bg-clip-text text-transparent"
            >
              {company}
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

const HeroGraphic = () => {
  return (
    <div className="relative">
      <div className="absolute -top-10 -left-10 w-32 h-32 bg-blue-500/20 rounded-full blur-xl"></div>
      <div className="absolute -bottom-5 -right-5 w-24 h-24 bg-purple-500/20 rounded-full blur-xl"></div>
      
      <div className="relative z-10 bg-gradient-to-br from-gray-900 to-gray-950 rounded-2xl border border-gray-800 p-6 shadow-xl">
        <div className="grid grid-cols-1 gap-6">
          <div className="bg-gray-800/60 rounded-xl p-5">
            <div className="flex items-center mb-4">
              <div className="h-12 w-12 rounded-full bg-blue-500/20 flex items-center justify-center">
                <img 
                  src="/lovable-uploads/c8ef72aa-6bbc-4cde-a827-e42f3bc112a0.png" 
                  alt="AI Assistant" 
                  className="h-8 w-8 rounded-full"
                />
              </div>
              <div className="ml-3">
                <div className="text-sm font-medium">Financial Advisor</div>
                <div className="text-xs text-gray-400">Online now</div>
              </div>
              <div className="ml-auto flex items-center">
                <div className="text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded-full">
                  4.9 ★
                </div>
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="bg-gray-700/30 rounded-lg p-3">
                <p className="text-sm text-gray-300">How should I allocate my 401K investments?</p>
              </div>
              
              <div className="bg-blue-600/10 border border-blue-600/20 rounded-lg p-3">
                <p className="text-sm">Based on your age and risk tolerance, I'd recommend:</p>
                <ul className="mt-2 text-sm space-y-1 text-gray-300">
                  <li>• 60% in broad market index funds</li>
                  <li>• 25% in international equities</li>
                  <li>• 10% in bonds for stability</li>
                  <li>• 5% in alternative investments</li>
                </ul>
                <p className="text-sm mt-2 text-gray-300">Would you like me to explain the reasoning behind this allocation?</p>
              </div>
            </div>
          </div>
          
          <div className="flex gap-3">
            <div className="flex-1 bg-gray-800/60 rounded-xl p-4">
              <div className="flex justify-between items-center mb-3">
                <div className="font-medium">Portfolio Review</div>
                <div className="text-blue-400 text-xs">Premium</div>
              </div>
              <p className="text-sm text-gray-400 mb-3">Get expert analysis of your current investments</p>
              <Button size="sm" className="w-full bg-blue-600/20 hover:bg-blue-600/30 text-blue-400 border border-blue-600/30">Details</Button>
            </div>
            
            <div className="flex-1 bg-gray-800/60 rounded-xl p-4">
              <div className="flex justify-between items-center mb-3">
                <div className="font-medium">Tax Planning</div>
                <div className="text-purple-400 text-xs">Popular</div>
              </div>
              <p className="text-sm text-gray-400 mb-3">Optimize your tax strategy with AI assistance</p>
              <Button size="sm" className="w-full bg-purple-600/20 hover:bg-purple-600/30 text-purple-400 border border-purple-600/30">Details</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
