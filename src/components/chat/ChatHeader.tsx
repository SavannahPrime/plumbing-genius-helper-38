
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { ReactNode } from "react";

interface ChatHeaderProps {
  children?: ReactNode;
}

const ChatHeader = ({ children }: ChatHeaderProps) => {
  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-3 flex items-center">
        <Link to="/" className="mr-3 text-gray-700 hover:text-gray-900">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="font-inter font-semibold text-xl text-[#0A2540]">
            AI Chat Assistant
          </h1>
          <p className="text-sm text-gray-500">
            Expert plumbing advice
          </p>
        </div>
        {children}
      </div>
    </header>
  );
};

export default ChatHeader;
