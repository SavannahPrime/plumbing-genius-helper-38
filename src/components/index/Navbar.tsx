
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { Link as LucideLink, Menu, X, ChevronDown } from "lucide-react";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <nav className="relative z-50">
      <div className="container mx-auto py-5 px-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="bg-blue-500/20 p-2 rounded-full">
              <LucideLink className="h-6 w-6 text-blue-500" />
            </div>
            <span className="text-xl font-bold">connect.software</span>
          </div>
          
          <div className="hidden md:flex items-center gap-8">
            <div className="flex gap-6">
              <a href="#features" className="text-gray-300 hover:text-white transition-colors">Features</a>
              <a href="#how-it-works" className="text-gray-300 hover:text-white transition-colors">How it works</a>
              <a href="#pricing" className="text-gray-300 hover:text-white transition-colors">Pricing</a>
              <div className="relative group">
                <button className="text-gray-300 hover:text-white transition-colors flex items-center gap-1">
                  Agents
                  <ChevronDown className="h-4 w-4 opacity-70" />
                </button>
                <div className="absolute top-full left-0 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  <div className="bg-gray-800 border border-gray-700 rounded-xl shadow-xl p-2 w-48">
                    <Link to="/chat?specialty=tax" className="block px-3 py-2 rounded-lg hover:bg-gray-700 text-sm">
                      Tax Attorney
                    </Link>
                    <Link to="/chat?specialty=financial" className="block px-3 py-2 rounded-lg hover:bg-gray-700 text-sm">
                      Financial Advisor
                    </Link>
                    <Link to="/chat?specialty=plumber" className="block px-3 py-2 rounded-lg hover:bg-gray-700 text-sm">
                      Home Fix Wizard
                    </Link>
                    <Link to="/agents" className="block px-3 py-2 mt-1 text-xs text-center text-blue-400 border-t border-gray-700 pt-2">
                      View all agents →
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <Link to="/chat?specialty=tax">
                <Button variant="outline" className="border-blue-500/30 hover:border-blue-500 text-blue-400 hover:text-blue-300 bg-blue-500/5 hover:bg-blue-500/10">
                  Tax Attorney
                </Button>
              </Link>
              <Link to="/chat?specialty=financial">
                <Button className="bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-900/20">
                  Financial Advisor
                </Button>
              </Link>
            </div>
          </div>
          
          <Button 
            variant="ghost" 
            size="icon"
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </Button>
        </div>
      </div>
      
      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 bg-black/95 pt-20 px-4 md:hidden z-40">
          <div className="flex flex-col gap-4">
            <a 
              href="#features" 
              className="text-lg py-3 px-4 border-b border-gray-800"
              onClick={() => setMobileMenuOpen(false)}
            >
              Features
            </a>
            <a 
              href="#how-it-works" 
              className="text-lg py-3 px-4 border-b border-gray-800"
              onClick={() => setMobileMenuOpen(false)}
            >
              How it works
            </a>
            <a 
              href="#pricing" 
              className="text-lg py-3 px-4 border-b border-gray-800"
              onClick={() => setMobileMenuOpen(false)}
            >
              Pricing
            </a>
            
            <div className="py-3 px-4">
              <div className="font-medium mb-2 text-gray-400">Popular Agents</div>
              <Link 
                to="/chat?specialty=tax" 
                className="block py-2 hover:text-blue-400"
                onClick={() => setMobileMenuOpen(false)}
              >
                Tax Attorney
              </Link>
              <Link 
                to="/chat?specialty=financial" 
                className="block py-2 hover:text-blue-400"
                onClick={() => setMobileMenuOpen(false)}
              >
                Financial Advisor
              </Link>
              <Link 
                to="/chat?specialty=plumber" 
                className="block py-2 hover:text-blue-400"
                onClick={() => setMobileMenuOpen(false)}
              >
                Home Fix Wizard
              </Link>
              <Link 
                to="/agents" 
                className="block py-2 text-blue-400"
                onClick={() => setMobileMenuOpen(false)}
              >
                View all agents →
              </Link>
            </div>
            
            <div className="mt-4 grid grid-cols-2 gap-4">
              <Button 
                variant="outline" 
                className="border-blue-500/30 hover:border-blue-500 text-blue-400 hover:text-blue-300 bg-blue-500/5 hover:bg-blue-500/10"
                onClick={() => {
                  navigate("/chat?specialty=tax");
                  setMobileMenuOpen(false);
                }}
              >
                Tax Attorney
              </Button>
              <Button 
                className="bg-blue-600 hover:bg-blue-700 text-white"
                onClick={() => {
                  navigate("/chat?specialty=financial");
                  setMobileMenuOpen(false);
                }}
              >
                Financial Advisor
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
