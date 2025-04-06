
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
    painter: [
      { emoji: "🎨", name: "Robin", problem: "matched paint colors perfectly", location: "Glendale", timeAgo: "3 mins ago" },
      { emoji: "🖌️", name: "Avery", problem: "fixed paint drips", location: "Pasadena", timeAgo: "8 mins ago" },
      { emoji: "🧰", name: "Jordan", problem: "prepped walls for painting", location: "Highland Park", timeAgo: "12 mins ago" },
      { emoji: "🪟", name: "Riley", problem: "painted window trim", location: "Eagle Rock", timeAgo: "17 mins ago" },
      { emoji: "🚪", name: "Casey", problem: "refreshed cabinet doors", location: "Los Feliz", timeAgo: "22 mins ago" },
      { emoji: "🧹", name: "Taylor", problem: "cleaned painting tools properly", location: "Silver Lake", timeAgo: "29 mins ago" },
    ],
    pool: [
      { emoji: "🏊", name: "Alex", problem: "balanced pool chemicals", location: "Calabasas", timeAgo: "4 mins ago" },
      { emoji: "⚗️", name: "Morgan", problem: "fixed green pool water", location: "Woodland Hills", timeAgo: "9 mins ago" },
      { emoji: "⚙️", name: "Charlie", problem: "repaired pool pump", location: "Encino", timeAgo: "14 mins ago" },
      { emoji: "🧹", name: "Jamie", problem: "removed pool debris", location: "Tarzana", timeAgo: "19 mins ago" },
      { emoji: "🌡️", name: "Dakota", problem: "adjusted pool heater", location: "Sherman Oaks", timeAgo: "25 mins ago" },
      { emoji: "🕳️", name: "Hayden", problem: "fixed pool leak", location: "Studio City", timeAgo: "31 mins ago" },
    ],
    declutter: [
      { emoji: "📦", name: "Sage", problem: "organized closet space", location: "Santa Monica", timeAgo: "5 mins ago" },
      { emoji: "🧸", name: "River", problem: "sorted children's toys", location: "Pacific Palisades", timeAgo: "10 mins ago" },
      { emoji: "📚", name: "Quinn", problem: "arranged bookshelf by color", location: "Brentwood", timeAgo: "15 mins ago" },
      { emoji: "🧾", name: "Rowan", problem: "created paper filing system", location: "Westwood", timeAgo: "20 mins ago" },
      { emoji: "👕", name: "Finley", problem: "decluttered wardrobe", location: "West LA", timeAgo: "26 mins ago" },
      { emoji: "🍽️", name: "Peyton", problem: "reorganized kitchen cabinets", location: "Culver City", timeAgo: "33 mins ago" },
    ],
    // Add new specialties
    tax: [
      { emoji: "⚖️", name: "Thomas", problem: "resolved a tax dispute", location: "Century City", timeAgo: "3 mins ago" },
      { emoji: "📊", name: "Laura", problem: "optimized tax deductions", location: "Beverly Hills", timeAgo: "7 mins ago" },
      { emoji: "📝", name: "Robert", problem: "clarified tax code application", location: "Downtown LA", timeAgo: "12 mins ago" },
      { emoji: "💼", name: "Jennifer", problem: "reviewed a tax audit strategy", location: "Westwood", timeAgo: "18 mins ago" },
      { emoji: "🗂️", name: "Michael", problem: "structured business taxation", location: "Santa Monica", timeAgo: "25 mins ago" },
      { emoji: "📑", name: "Samantha", problem: "filed an amended return", location: "Culver City", timeAgo: "32 mins ago" },
    ],
    psychiatrist: [
      { emoji: "🧠", name: "Dr. Patricia", problem: "provided anxiety management techniques", location: "Westwood", timeAgo: "4 mins ago" },
      { emoji: "💭", name: "Dr. James", problem: "suggested coping strategies", location: "Brentwood", timeAgo: "9 mins ago" },
      { emoji: "🌱", name: "Dr. Emily", problem: "guided through a mindfulness session", location: "Santa Monica", timeAgo: "15 mins ago" },
      { emoji: "💪", name: "Dr. David", problem: "recommended stress reduction methods", location: "Beverly Hills", timeAgo: "21 mins ago" },
      { emoji: "❤️", name: "Dr. Maria", problem: "discussed emotional resilience", location: "Pacific Palisades", timeAgo: "27 mins ago" },
      { emoji: "🌟", name: "Dr. Richard", problem: "explored personal growth strategies", location: "Malibu", timeAgo: "35 mins ago" },
    ],
    financial: [
      { emoji: "💰", name: "Fiona", problem: "created a debt repayment plan", location: "Manhattan Beach", timeAgo: "3 mins ago" },
      { emoji: "📈", name: "Nathan", problem: "rebalanced an investment portfolio", location: "Redondo Beach", timeAgo: "8 mins ago" },
      { emoji: "🏦", name: "Olivia", problem: "structured retirement savings", location: "Hermosa Beach", timeAgo: "14 mins ago" },
      { emoji: "💳", name: "William", problem: "optimized credit utilization", location: "El Segundo", timeAgo: "19 mins ago" },
      { emoji: "🏡", name: "Isabella", problem: "analyzed mortgage refinancing", location: "Torrance", timeAgo: "26 mins ago" },
      { emoji: "📊", name: "Benjamin", problem: "developed a budget strategy", location: "Long Beach", timeAgo: "34 mins ago" },
    ],
    wellness: [
      { emoji: "🧘", name: "Wendy", problem: "designed a meditation routine", location: "Malibu", timeAgo: "2 mins ago" },
      { emoji: "🌿", name: "Zachary", problem: "balanced work-life integration", location: "Pacific Palisades", timeAgo: "7 mins ago" },
      { emoji: "💆", name: "Hannah", problem: "created a stress management plan", location: "Santa Monica", timeAgo: "12 mins ago" },
      { emoji: "🍵", name: "Tyler", problem: "improved sleep hygiene habits", location: "Venice Beach", timeAgo: "18 mins ago" },
      { emoji: "🌞", name: "Grace", problem: "developed a morning routine", location: "Marina del Rey", timeAgo: "24 mins ago" },
      { emoji: "🌙", name: "Noah", problem: "established healthy boundaries", location: "Playa Vista", timeAgo: "31 mins ago" },
    ],
    legal: [
      { emoji: "📜", name: "Lawrence", problem: "reviewed a rental agreement", location: "Downtown LA", timeAgo: "5 mins ago" },
      { emoji: "⚖️", name: "Victoria", problem: "explained contract obligations", location: "Century City", timeAgo: "10 mins ago" },
      { emoji: "🏛️", name: "Andrew", problem: "clarified employment rights", location: "Beverly Hills", timeAgo: "16 mins ago" },
      { emoji: "📝", name: "Rachel", problem: "reviewed settlement terms", location: "West Hollywood", timeAgo: "22 mins ago" },
      { emoji: "💼", name: "Daniel", problem: "advised on business compliance", location: "Culver City", timeAgo: "28 mins ago" },
      { emoji: "🔏", name: "Sophia", problem: "explained intellectual property protection", location: "Hollywood", timeAgo: "35 mins ago" },
    ],
    career: [
      { emoji: "💼", name: "Catherine", problem: "improved a resume", location: "Burbank", timeAgo: "4 mins ago" },
      { emoji: "🎯", name: "Jason", problem: "prepared for a job interview", location: "Studio City", timeAgo: "9 mins ago" },
      { emoji: "📊", name: "Emma", problem: "outlined a career path strategy", location: "North Hollywood", timeAgo: "15 mins ago" },
      { emoji: "🗣️", name: "Maxwell", problem: "practiced negotiation tactics", location: "Sherman Oaks", timeAgo: "20 mins ago" },
      { emoji: "🏆", name: "Lily", problem: "developed leadership skills", location: "Encino", timeAgo: "27 mins ago" },
      { emoji: "🔍", name: "Christopher", problem: "refined job search approach", location: "Van Nuys", timeAgo: "33 mins ago" },
    ],
    relationship: [
      { emoji: "💕", name: "Rachel", problem: "improved communication skills", location: "Silver Lake", timeAgo: "3 mins ago" },
      { emoji: "🗣️", name: "Ethan", problem: "resolved a conflict peacefully", location: "Echo Park", timeAgo: "8 mins ago" },
      { emoji: "🤝", name: "Amanda", problem: "established healthy boundaries", location: "Los Feliz", timeAgo: "13 mins ago" },
      { emoji: "❤️", name: "Brandon", problem: "rekindled emotional connection", location: "Highland Park", timeAgo: "19 mins ago" },
      { emoji: "🌈", name: "Jessica", problem: "navigated relationship transition", location: "Atwater Village", timeAgo: "25 mins ago" },
      { emoji: "🌱", name: "Matthew", problem: "built trust and understanding", location: "Glassell Park", timeAgo: "32 mins ago" },
    ],
    nutrition: [
      { emoji: "🥗", name: "Nathan", problem: "created a balanced meal plan", location: "Calabasas", timeAgo: "4 mins ago" },
      { emoji: "🍎", name: "Maya", problem: "improved eating habits", location: "Woodland Hills", timeAgo: "9 mins ago" },
      { emoji: "🥦", name: "Colin", problem: "planned nutritious recipes", location: "Tarzana", timeAgo: "15 mins ago" },
      { emoji: "💧", name: "Olivia", problem: "optimized hydration strategy", location: "Encino", timeAgo: "21 mins ago" },
      { emoji: "🍽️", name: "Lucas", problem: "balanced macronutrients", location: "Sherman Oaks", timeAgo: "28 mins ago" },
      { emoji: "🥄", name: "Alice", problem: "managed dietary restrictions", location: "Studio City", timeAgo: "35 mins ago" },
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
             specialty === "gadget" ? "📱" : 
             specialty === "painter" ? "🎨" :
             specialty === "pool" ? "🏊" :
             specialty === "declutter" ? "✨" :
             specialty === "tax" ? "⚖️" :
             specialty === "psychiatrist" ? "🧠" :
             specialty === "financial" ? "💰" :
             specialty === "wellness" ? "🧘" :
             specialty === "legal" ? "📜" :
             specialty === "career" ? "💼" :
             specialty === "relationship" ? "💕" :
             specialty === "nutrition" ? "🥗" : "🪠"} 
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
