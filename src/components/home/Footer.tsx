
import React from "react";
import { motion } from "framer-motion";

const Footer = () => {
  return (
    <motion.footer 
      className="mt-20 border-t pt-6 text-sm text-neutrals flex justify-between items-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.6 }}
    >
      <div>
        <p className="mb-1">&copy; {new Date().getFullYear()} Plumber's Helper. All rights reserved.</p>
        <p className="text-xs">No pipe too weird, no drip too small.</p>
      </div>
      
      <div className="flex items-center">
        <img 
          src="/lovable-uploads/c8ef72aa-6bbc-4cde-a827-e42f3bc112a0.png" 
          alt="Mini Plumber" 
          className="w-12 h-12"
        />
      </div>
    </motion.footer>
  );
};

export default Footer;
