
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { 
  MessageSquare, 
  User, 
  Settings, 
  List, 
  Search,
  LifeBuoy
} from "lucide-react";

export function MobileBottomNav() {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(path + '/');
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden border-t border-gray-200 bg-white">
      <div className="flex justify-around items-center h-16">
        <Link 
          to="/agents" 
          className={cn(
            "flex flex-col items-center justify-center text-xs w-full h-full",
            isActive("/agents") ? "text-primary" : "text-gray-500"
          )}
        >
          <LifeBuoy className="h-5 w-5 mb-1" />
          <span>Agents</span>
        </Link>
        
        <Link 
          to="/chat" 
          className={cn(
            "flex flex-col items-center justify-center text-xs w-full h-full",
            isActive("/chat") ? "text-primary" : "text-gray-500"
          )}
        >
          <MessageSquare className="h-5 w-5 mb-1" />
          <span>Chats</span>
        </Link>
        
        <Link 
          to="/answers" 
          className={cn(
            "flex flex-col items-center justify-center text-xs w-full h-full",
            isActive("/answers") ? "text-primary" : "text-gray-500"
          )}
        >
          <Search className="h-5 w-5 mb-1" />
          <span>Directory</span>
        </Link>
        
        <Link 
          to="/account" 
          className={cn(
            "flex flex-col items-center justify-center text-xs w-full h-full",
            isActive("/account") ? "text-primary" : "text-gray-500"
          )}
        >
          <User className="h-5 w-5 mb-1" />
          <span>Account</span>
        </Link>
      </div>
    </div>
  );
}
