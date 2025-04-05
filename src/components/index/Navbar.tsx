
import React from "react";
import { Button } from "@/components/ui/button";
import { Link as LucideLink } from "lucide-react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="container mx-auto py-6 px-4 flex justify-between items-center">
      <div className="flex items-center gap-2">
        <LucideLink className="h-6 w-6 text-blue-500" />
        <span className="text-xl font-bold">connect.software</span>
      </div>
      <div className="hidden md:flex gap-8 items-center">
        <a href="#features" className="hover:text-blue-400 transition-colors">Features</a>
        <a href="#how-it-works" className="hover:text-blue-400 transition-colors">How it works</a>
        <a href="#pricing" className="hover:text-blue-400 transition-colors">Pricing</a>
        <Link to="/chat?specialty=tax">
          <Button variant="outline" className="border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white">
            Tax Attorney
          </Button>
        </Link>
        <Link to="/chat?specialty=plumber">
          <Button className="bg-blue-600 hover:bg-blue-700">Home Fix Wizard</Button>
        </Link>
      </div>
      <Button variant="ghost" className="md:hidden">
        <span className="sr-only">Open menu</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </Button>
    </nav>
  );
};

export default Navbar;
