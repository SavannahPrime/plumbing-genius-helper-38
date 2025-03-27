
import { ArrowLeft, Home } from "lucide-react";
import { Link } from "react-router-dom";
import { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface ChatHeaderProps {
  children?: ReactNode;
}

const ChatHeader = ({ children }: ChatHeaderProps) => {
  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-3 flex items-center">
        <Link to="/" className="mr-3 text-gray-700 hover:text-gray-900">
          <Home className="w-5 h-5" />
        </Link>
        <div className="flex-1">
          <h1 className="font-inter font-semibold text-xl text-[#0A2540]">
            AI Chat Assistant
          </h1>
          <p className="text-sm text-gray-500 flex items-center">
            Expert home solutions advice
            <Badge variant="outline" className="ml-2 text-xs">by EveryFixAI</Badge>
          </p>
        </div>
        {children}
      </div>
    </header>
  );
};

export default ChatHeader;
