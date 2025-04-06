
import React from "react";
import { Link } from "react-router-dom";
import { Link as LucideLink, Twitter, Facebook, Instagram, Linkedin, Github, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gradient-to-b from-transparent to-slate-950 pt-20 pb-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-6 gap-10 mb-16">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="bg-blue-500/20 p-2 rounded-full">
                <LucideLink className="h-6 w-6 text-blue-500" />
              </div>
              <span className="text-xl font-bold">connect.software</span>
            </div>
            <p className="text-gray-400 mb-6 max-w-xs">
              The premier marketplace for AI agents and professional advisors. Pay with traditional methods or TXT tokens.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Github className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div className="md:col-span-1">
            <h3 className="font-semibold text-lg mb-4">Product</h3>
            <ul className="space-y-2">
              <li><a href="#features" className="text-gray-400 hover:text-blue-400 flex items-center"><ChevronRight className="h-3 w-3 mr-1" /> Features</a></li>
              <li><a href="#pricing" className="text-gray-400 hover:text-blue-400 flex items-center"><ChevronRight className="h-3 w-3 mr-1" /> Pricing</a></li>
              <li><a href="#" className="text-gray-400 hover:text-blue-400 flex items-center"><ChevronRight className="h-3 w-3 mr-1" /> AI Agents</a></li>
              <li><a href="#" className="text-gray-400 hover:text-blue-400 flex items-center"><ChevronRight className="h-3 w-3 mr-1" /> Integrations</a></li>
              <li><a href="#" className="text-gray-400 hover:text-blue-400 flex items-center"><ChevronRight className="h-3 w-3 mr-1" /> API</a></li>
            </ul>
          </div>
          
          <div className="md:col-span-1">
            <h3 className="font-semibold text-lg mb-4">Resources</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-blue-400 flex items-center"><ChevronRight className="h-3 w-3 mr-1" /> Documentation</a></li>
              <li><a href="#" className="text-gray-400 hover:text-blue-400 flex items-center"><ChevronRight className="h-3 w-3 mr-1" /> Guides</a></li>
              <li><a href="#" className="text-gray-400 hover:text-blue-400 flex items-center"><ChevronRight className="h-3 w-3 mr-1" /> Support</a></li>
              <li><a href="#" className="text-gray-400 hover:text-blue-400 flex items-center"><ChevronRight className="h-3 w-3 mr-1" /> API Status</a></li>
              <li><a href="#" className="text-gray-400 hover:text-blue-400 flex items-center"><ChevronRight className="h-3 w-3 mr-1" /> Community</a></li>
            </ul>
          </div>
          
          <div className="md:col-span-1">
            <h3 className="font-semibold text-lg mb-4">Company</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-blue-400 flex items-center"><ChevronRight className="h-3 w-3 mr-1" /> About</a></li>
              <li><a href="#" className="text-gray-400 hover:text-blue-400 flex items-center"><ChevronRight className="h-3 w-3 mr-1" /> Blog</a></li>
              <li><a href="#" className="text-gray-400 hover:text-blue-400 flex items-center"><ChevronRight className="h-3 w-3 mr-1" /> Careers</a></li>
              <li><a href="#" className="text-gray-400 hover:text-blue-400 flex items-center"><ChevronRight className="h-3 w-3 mr-1" /> Press</a></li>
              <li><a href="#" className="text-gray-400 hover:text-blue-400 flex items-center"><ChevronRight className="h-3 w-3 mr-1" /> Contact</a></li>
            </ul>
          </div>
          
          <div className="md:col-span-1">
            <h3 className="font-semibold text-lg mb-4">Legal</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-blue-400 flex items-center"><ChevronRight className="h-3 w-3 mr-1" /> Privacy</a></li>
              <li><a href="#" className="text-gray-400 hover:text-blue-400 flex items-center"><ChevronRight className="h-3 w-3 mr-1" /> Terms</a></li>
              <li><a href="#" className="text-gray-400 hover:text-blue-400 flex items-center"><ChevronRight className="h-3 w-3 mr-1" /> Cookie Policy</a></li>
              <li><a href="#" className="text-gray-400 hover:text-blue-400 flex items-center"><ChevronRight className="h-3 w-3 mr-1" /> Data Policy</a></li>
              <li><a href="#" className="text-gray-400 hover:text-blue-400 flex items-center"><ChevronRight className="h-3 w-3 mr-1" /> Security</a></li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center">
          <div className="text-gray-500 mb-4 md:mb-0">
            © {currentYear} connect.software. All rights reserved.
          </div>
          
          <div className="flex flex-wrap gap-4 text-sm text-gray-500">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <span className="text-gray-700">•</span>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <span className="text-gray-700">•</span>
            <a href="#" className="hover:text-white transition-colors">Cookie Settings</a>
            <span className="text-gray-700">•</span>
            <a href="#" className="hover:text-white transition-colors">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
