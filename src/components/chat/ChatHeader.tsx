
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { ReactNode } from "react";

interface ChatHeaderProps {
  children?: ReactNode;
}

const ChatHeader = ({ children }: ChatHeaderProps) => {
  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4 flex items-center">
        <Link to="/" className="p-2 hover:bg-gray-100 rounded-full transition-colors">
          <ArrowLeft className="w-6 h-6 text-[#0A2540]" />
        </Link>
        <div className="ml-4">
          <h1 className="font-inter font-bold text-[22px] text-[#0A2540]">
            AI Chat Assistant
          </h1>
          <p className="font-roboto text-[16px] text-gray-600">
            Expert plumbing advice at your fingertips
          </p>
        </div>
        {children}
      </div>
    </header>
  );
};

export default ChatHeader;
