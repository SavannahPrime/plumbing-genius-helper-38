
import React from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight, Link, Sparkles } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="container mx-auto px-4 py-20 md:py-32 flex flex-col items-center text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl"
      >
        <div className="mb-6 inline-flex items-center px-3 py-1 border border-blue-500 rounded-full text-sm text-blue-400">
          <Sparkles className="w-4 h-4 mr-2" />
          Introducing connect.software - The AI-Agent Platform
        </div>
        <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">
          Connect Your Software with Intelligent AI Agents
        </h1>
        <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
          Build powerful connections between your applications and AI agents. Automate workflows, enhance user experiences, and unlock new possibilities.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button className="bg-blue-600 hover:bg-blue-700 text-lg px-8 py-6">
            Get Started Free
          </Button>
          <Button variant="outline" className="border-gray-600 text-lg px-8 py-6">
            View Demo
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </motion.div>
      
      {/* Abstract graphic/mockup */}
      <HeroGraphic />
      
      {/* Trusted by */}
      <div className="mt-20">
        <p className="text-gray-400 mb-6">Trusted by innovative companies</p>
        <div className="flex flex-wrap justify-center gap-8 opacity-70">
          {['Microsoft', 'Google', 'Amazon', 'Slack', 'Salesforce'].map((company) => (
            <div key={company} className="text-lg font-semibold text-gray-400">
              {company}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const HeroGraphic = () => {
  return (
    <div className="mt-16 relative w-full max-w-4xl">
      <div className="bg-gradient-to-tr from-blue-500/20 to-purple-500/20 rounded-xl p-1">
        <div className="bg-black/80 rounded-lg p-8 backdrop-blur">
          <div className="grid grid-cols-3 gap-4">
            <div className="col-span-1 space-y-4">
              <div className="h-16 bg-gray-800 rounded flex items-center justify-center">
                <svg className="h-8 w-8 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div className="h-32 bg-gray-800 rounded p-4">
                <div className="h-4 w-3/4 bg-gray-700 rounded mb-2"></div>
                <div className="h-4 w-1/2 bg-gray-700 rounded mb-2"></div>
                <div className="h-4 w-2/3 bg-gray-700 rounded"></div>
              </div>
            </div>
            <div className="col-span-2 h-full bg-gray-800 rounded p-6">
              <div className="flex items-center mb-4">
                <div className="h-10 w-10 bg-blue-500/20 rounded-full flex items-center justify-center">
                  <Link className="h-5 w-5 text-blue-500" />
                </div>
                <div className="ml-3">
                  <div className="h-4 w-32 bg-gray-700 rounded"></div>
                  <div className="h-3 w-20 bg-gray-700/50 rounded mt-1"></div>
                </div>
              </div>
              <div className="h-3 w-full bg-gray-700 rounded mb-3"></div>
              <div className="h-3 w-5/6 bg-gray-700 rounded mb-3"></div>
              <div className="h-3 w-4/6 bg-gray-700 rounded mb-3"></div>
              <div className="h-10 w-1/3 bg-blue-600 rounded mt-6"></div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute -top-8 -left-8 h-16 w-16 bg-blue-500/30 rounded-full blur-xl"></div>
      <div className="absolute -bottom-8 -right-8 h-16 w-16 bg-purple-500/30 rounded-full blur-xl"></div>
    </div>
  );
};

export default HeroSection;
