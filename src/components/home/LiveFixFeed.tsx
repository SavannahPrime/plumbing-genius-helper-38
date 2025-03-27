
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

  // Specialty-specific fix data
  const specialtyFixes: Record<AgentSpecialty, Fix[]> = {
    plumber: [
      { emoji: "🚽", name: "Jess", problem: "unclogged a toilet", location: "Venice Beach", timeAgo: "2 mins ago" },
      { emoji: "⚡", name: "Alan", problem: "fixed a tripped breaker", location: "Santa Monica", timeAgo: "5 mins ago" },
      { emoji: "🚿", name: "Sarah", problem: "repaired a shower head", location: "Marina del Rey", timeAgo: "10 mins ago" },
      { emoji: "🪠", name: "Marcus", problem: "cleared a sink drain", location: "Culver City", timeAgo: "15 mins ago" },
      { emoji: "🔥", name: "Emily", problem: "relit a water heater", location: "Westwood", timeAgo: "20 mins ago" },
      { emoji: "💧", name: "Carlos", problem: "fixed a leaky faucet", location: "Downtown LA", timeAgo: "30 mins ago" },
    ],
    electrician: [
      { emoji: "💡", name: "Taylor", problem: "rewired a ceiling fan", location: "Burbank", timeAgo: "3 mins ago" },
      { emoji: "🔌", name: "Miguel", problem: "replaced an outlet", location: "Glendale", timeAgo: "7 mins ago" },
      { emoji: "🔦", name: "Riley", problem: "installed LED lighting", location: "Pasadena", timeAgo: "12 mins ago" },
      { emoji: "⚡", name: "Jordan", problem: "fixed a circuit breaker", location: "Eagle Rock", timeAgo: "18 mins ago" },
      { emoji: "🧰", name: "Alex", problem: "upgraded an electrical panel", location: "Silver Lake", timeAgo: "25 mins ago" },
      { emoji: "🔋", name: "Devon", problem: "installed a backup battery", location: "Echo Park", timeAgo: "35 mins ago" },
    ],
    handyman: [
      { emoji: "🔨", name: "Jamie", problem: "hung a picture frame", location: "West Hollywood", timeAgo: "4 mins ago" },
      { emoji: "🪑", name: "Casey", problem: "fixed a wobbly chair", location: "Beverly Hills", timeAgo: "9 mins ago" },
      { emoji: "🚪", name: "Avery", problem: "repaired a squeaky door", location: "Century City", timeAgo: "14 mins ago" },
      { emoji: "🧰", name: "Morgan", problem: "assembled furniture", location: "Brentwood", timeAgo: "19 mins ago" },
      { emoji: "🔧", name: "Quinn", problem: "tightened loose fixtures", location: "Pacific Palisades", timeAgo: "26 mins ago" },
      { emoji: "🧹", name: "Reese", problem: "fixed a broken drawer", location: "Malibu", timeAgo: "32 mins ago" },
    ],
    mechanic: [
      { emoji: "🚗", name: "Finley", problem: "changed engine oil", location: "Long Beach", timeAgo: "5 mins ago" },
      { emoji: "🔧", name: "Parker", problem: "replaced brake pads", location: "Torrance", timeAgo: "10 mins ago" },
      { emoji: "🔋", name: "Dakota", problem: "installed a new battery", location: "Redondo Beach", timeAgo: "15 mins ago" },
      { emoji: "🛞", name: "Hayden", problem: "fixed a flat tire", location: "Hermosa Beach", timeAgo: "20 mins ago" },
      { emoji: "⚙️", name: "Blake", problem: "tuned a transmission", location: "Manhattan Beach", timeAgo: "28 mins ago" },
      { emoji: "🧯", name: "Rowan", problem: "checked engine light", location: "El Segundo", timeAgo: "36 mins ago" },
    ],
    landscaper: [
      { emoji: "🌱", name: "Skyler", problem: "trimmed hedges", location: "Topanga", timeAgo: "3 mins ago" },
      { emoji: "🌿", name: "Sage", problem: "planted new flowers", location: "Calabasas", timeAgo: "8 mins ago" },
      { emoji: "🍃", name: "River", problem: "mulched garden beds", location: "Agoura Hills", timeAgo: "13 mins ago" },
      { emoji: "🌳", name: "Aspen", problem: "pruned fruit trees", location: "Thousand Oaks", timeAgo: "19 mins ago" },
      { emoji: "💦", name: "Rain", problem: "fixed sprinkler system", location: "Westlake Village", timeAgo: "24 mins ago" },
      { emoji: "🌸", name: "Willow", problem: "designed a rock garden", location: "Newbury Park", timeAgo: "33 mins ago" },
    ],
    chef: [
      { emoji: "🍳", name: "Charlie", problem: "perfected a risotto recipe", location: "Hollywood", timeAgo: "2 mins ago" },
      { emoji: "🔪", name: "Jessie", problem: "sharpened chef's knives", location: "Studio City", timeAgo: "7 mins ago" },
      { emoji: "🍞", name: "Erin", problem: "baked sourdough bread", location: "Sherman Oaks", timeAgo: "12 mins ago" },
      { emoji: "🥘", name: "Ari", problem: "fixed a broken sauce", location: "Encino", timeAgo: "17 mins ago" },
      { emoji: "🍲", name: "Corey", problem: "improvised a substitution", location: "Tarzana", timeAgo: "23 mins ago" },
      { emoji: "🧁", name: "Kendall", problem: "rescued a fallen soufflé", location: "Woodland Hills", timeAgo: "31 mins ago" },
    ],
    stylist: [
      { emoji: "💇‍♀️", name: "Drew", problem: "fixed a bad haircut", location: "Koreatown", timeAgo: "4 mins ago" },
      { emoji: "💄", name: "Nic", problem: "created a perfect makeup look", location: "Downtown", timeAgo: "9 mins ago" },
      { emoji: "👔", name: "Frankie", problem: "styled an outfit for an interview", location: "Arts District", timeAgo: "14 mins ago" },
      { emoji: "💅", name: "Remy", problem: "repaired a chipped manicure", location: "Little Tokyo", timeAgo: "20 mins ago" },
      { emoji: "👗", name: "Sawyer", problem: "hemmed a dress last-minute", location: "Fashion District", timeAgo: "27 mins ago" },
      { emoji: "👠", name: "Cameron", problem: "matched accessories perfectly", location: "Historic Core", timeAgo: "34 mins ago" },
    ],
    cleaning: [
      { emoji: "🧼", name: "Emory", problem: "removed tough carpet stains", location: "Mar Vista", timeAgo: "3 mins ago" },
      { emoji: "🧹", name: "Bailey", problem: "deep cleaned a bathroom", location: "Palms", timeAgo: "8 mins ago" },
      { emoji: "🧽", name: "Kai", problem: "restored grout to white", location: "Rancho Park", timeAgo: "13 mins ago" },
      { emoji: "🧴", name: "Finley", problem: "polished hardwood floors", location: "Cheviot Hills", timeAgo: "18 mins ago" },
      { emoji: "✨", name: "Peyton", problem: "removed hard water deposits", location: "Pico-Robertson", timeAgo: "25 mins ago" },
      { emoji: "🗑️", name: "Harley", problem: "organized a messy garage", location: "West LA", timeAgo: "32 mins ago" },
    ],
    gadget: [
      { emoji: "📱", name: "Morgan", problem: "recovered deleted photos", location: "Los Feliz", timeAgo: "4 mins ago" },
      { emoji: "💻", name: "Elliot", problem: "sped up a slow laptop", location: "Atwater Village", timeAgo: "9 mins ago" },
      { emoji: "🎧", name: "Jordan", problem: "fixed bluetooth connectivity", location: "Highland Park", timeAgo: "15 mins ago" },
      { emoji: "🖨️", name: "Taylor", problem: "troubleshooted printer issues", location: "Glassell Park", timeAgo: "21 mins ago" },
      { emoji: "📷", name: "Alex", problem: "restored camera settings", location: "Mount Washington", timeAgo: "26 mins ago" },
      { emoji: "🎮", name: "Cameron", problem: "upgraded gaming system", location: "Cypress Park", timeAgo: "33 mins ago" },
    ],
  };

  // Get the appropriate fixes for the current specialty
  const fixes = specialtyFixes[specialty] || specialtyFixes.plumber;

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
          <div className="text-sm text-primary/60">
            {specialty === "plumber" ? "🪠" : 
             specialty === "electrician" ? "⚡" : 
             specialty === "handyman" ? "🔨" : 
             specialty === "mechanic" ? "🔧" : 
             specialty === "landscaper" ? "🌱" : 
             specialty === "chef" ? "🍳" : 
             specialty === "stylist" ? "💇‍♀️" : 
             specialty === "cleaning" ? "🧹" : 
             specialty === "gadget" ? "📱" : "🪠"} 
             4,238 people solved issues this week
          </div>
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
