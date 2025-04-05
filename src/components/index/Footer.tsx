
import React from "react";
import { Link as LucideLink } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-slate-950 py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          <div>
            <h3 className="font-semibold text-lg mb-4">Product</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-blue-400">Features</a></li>
              <li><a href="#" className="text-gray-400 hover:text-blue-400">Pricing</a></li>
              <li><a href="#" className="text-gray-400 hover:text-blue-400">AI Agents</a></li>
              <li><a href="#" className="text-gray-400 hover:text-blue-400">Integrations</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-lg mb-4">Resources</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-blue-400">Documentation</a></li>
              <li><a href="#" className="text-gray-400 hover:text-blue-400">API Reference</a></li>
              <li><a href="#" className="text-gray-400 hover:text-blue-400">Guides</a></li>
              <li><a href="#" className="text-gray-400 hover:text-blue-400">Examples</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-lg mb-4">Company</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-blue-400">About</a></li>
              <li><a href="#" className="text-gray-400 hover:text-blue-400">Blog</a></li>
              <li><a href="#" className="text-gray-400 hover:text-blue-400">Careers</a></li>
              <li><a href="#" className="text-gray-400 hover:text-blue-400">Contact</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-lg mb-4">Legal</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-blue-400">Privacy</a></li>
              <li><a href="#" className="text-gray-400 hover:text-blue-400">Terms</a></li>
              <li><a href="#" className="text-gray-400 hover:text-blue-400">Security</a></li>
            </ul>
          </div>
        </div>
        <div className="pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center gap-2 mb-4 md:mb-0">
            <LucideLink className="h-6 w-6 text-blue-500" />
            <span className="text-xl font-bold">connect.software</span>
          </div>
          <div className="text-gray-400">
            © {currentYear} connect.software. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
