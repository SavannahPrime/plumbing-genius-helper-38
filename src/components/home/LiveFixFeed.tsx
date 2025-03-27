
import React, { useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import { AgentSpecialty } from "@/services/specializedAgentService";

interface Fix {
  emoji: string;
  name: string;
  problem: string;
  location: string;
  timeAgo: string;
}

interface LiveFixFeedProps {
  specialty?: AgentSpecialty;
}

const LiveFixFeed: React.FC<LiveFixFeedProps> = ({ specialty = "plumber" }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const controls = useAnimation();

  // Sample fix data - could be customized per specialty in a real app
  const fixes: Fix[] = [
    { emoji: "🚽", name: "Jess", problem: "unclogged a toilet", location: "Venice Beach", timeAgo: "2 mins ago" },
    { emoji: "⚡", name: "Alan", problem: "fixed a tripped breaker", location: "Santa Monica", timeAgo: "5 mins ago" },
    { emoji: "🚿", name: "Sarah", problem: "repaired a shower head", location: "Marina del Rey", timeAgo: "10 mins ago" },
    { emoji: "🪠", name: "Marcus", problem: "cleared a sink drain", location: "Culver City", timeAgo: "15 mins ago" },
    { emoji: "🔥", name: "Emily", problem: "relit a water heater", location: "Westwood", timeAgo: "20 mins ago" },
    { emoji: "💧", name: "Carlos", problem: "fixed a leaky faucet", location: "Downtown LA", timeAgo: "30 mins ago" },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      controls.start({
        opacity: 0,
        y: -20,
        transition: { duration: 0.3 }
      }).then(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % fixes.length);
        controls.start({
          opacity: 1,
          y: 0,
          transition: { duration: 0.3 }
        });
      });
    }, 5000);

    return () => clearInterval(interval);
  }, [controls, fixes.length]);

  const currentFix = fixes[currentIndex];

  return (
    <section className="my-16">
      <div className="bg-gray-50 rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-xl font-bold mb-5 font-space-grotesk text-center">
          Live Fix Feed 
          <span className="inline-block ml-2 w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
        </h3>
        
        <div className="flex items-center justify-between mb-4">
          <div className="text-sm text-primary/60">🪠 4,238 people solved issues this week</div>
          <div className="text-sm text-primary/60">⚡ 142 active users right now</div>
        </div>
        
        <div className="h-20 flex items-center justify-center bg-white rounded-lg shadow-sm border border-gray-100">
          <motion.div 
            animate={controls}
            initial={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <p className="text-lg">
              <span className="text-xl mr-2">{currentFix.emoji}</span>
              <strong>{currentFix.name}</strong> {currentFix.problem} in <span className="font-medium">{currentFix.location}</span>
              <span className="text-primary/50 text-sm ml-2">• {currentFix.timeAgo}</span>
            </p>
          </motion.div>
        </div>
        
        <div className="mt-6">
          <div className="w-full bg-gray-200 rounded-full h-1.5">
            <motion.div 
              className="bg-primary h-1.5 rounded-full" 
              animate={{ width: `${((currentIndex + 1) / fixes.length) * 100}%` }}
              transition={{ duration: 0.5 }}
            ></motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LiveFixFeed;
