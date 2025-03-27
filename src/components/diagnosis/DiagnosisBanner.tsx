
import React from "react";
import { motion } from "framer-motion";

const DiagnosisBanner = () => {
  return (
    <motion.div 
      className="w-full md:w-1/3"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.2, duration: 0.5 }}
    >
      <img 
        src="/lovable-uploads/8b852c7f-6b8c-40ef-9d7a-b38e45699b56.png" 
        alt="Friendly Plumber" 
        className="w-full max-w-[250px] mx-auto md:mx-0"
      />
      <div className="bg-white p-4 rounded-xl shadow-card mt-4">
        <p className="font-dm-sans font-medium text-center md:text-left">
          "Hi there! Share a photo of your plumbing issue, and I'll help diagnose the problem. You can also click the voice chat icon to talk to me!"
        </p>
      </div>
    </motion.div>
  );
};

export default DiagnosisBanner;
