
import React from "react";

interface LogoProps {
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ size = "md", className = "" }) => {
  const sizeClass = {
    sm: "w-8 h-8",
    md: "w-12 h-12",
    lg: "w-16 h-16",
    xl: "w-24 h-24",
  }[size];

  return (
    <div className={`${sizeClass} ${className}`}>
      <img src="/logo.svg" alt="Connect.Software Logo" className="w-full h-full" />
    </div>
  );
};

export default Logo;
