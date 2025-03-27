
import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Search } from "lucide-react";
import { Input } from "@/components/ui/input";

interface FixesHeaderProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const FixesHeader = ({ searchQuery, setSearchQuery }: FixesHeaderProps) => {
  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center mb-4">
          <Link to="/" className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <ArrowLeft className="w-6 h-6 text-[#0A2540]" />
          </Link>
          <div className="ml-4">
            <h1 className="font-inter font-bold text-[22px] text-[#0A2540]">
              Common Plumbing Fixes
            </h1>
          </div>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" />
          <Input 
            className="pl-10" 
            placeholder="Search for a plumbing issue..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
    </header>
  );
};

export default FixesHeader;
