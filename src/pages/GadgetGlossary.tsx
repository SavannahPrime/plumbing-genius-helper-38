
import React from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Smartphone } from "lucide-react";
import EveryFixHeader from "@/components/shared/EveryFixHeader";

interface GadgetGlossaryProps {
  contextType?: string;
}

interface GlossaryItem {
  title: string;
  problem: string;
  solution: string;
  category: string;
  icon: string;
}

const GadgetGlossary: React.FC<GadgetGlossaryProps> = ({ contextType = "plumber" }) => {
  const navigate = useNavigate();
  
  const glossaryItems: Record<string, GlossaryItem[]> = {
    plumber: [
      {
        title: "Toilet",
        problem: "I have a problem with my toilet.",
        solution: "Check the flush mechanism, water level, and look for leaks around the base.",
        category: "Plumbing",
        icon: "🚽"
      },
      {
        title: "Shower",
        problem: "I have an issue with my shower.",
        solution: "Inspect the shower head for mineral buildup, check water pressure at other fixtures to determine if it's isolated.",
        category: "Plumbing",
        icon: "🚿"
      },
      {
        title: "Sink",
        problem: "My sink is having problems.",
        solution: "For slow drains, try a plunger or drain snake. For leaks, check connections and p-trap.",
        category: "Plumbing",
        icon: "🚰"
      },
      {
        title: "Bathtub",
        problem: "I'm having issues with my bathtub.",
        solution: "For slow drains, remove hair and debris from the drain. For leaks, check the faucet and drain connections.",
        category: "Plumbing",
        icon: "🛁"
      },
      {
        title: "Water Heater",
        problem: "My water heater isn't working properly.",
        solution: "Check the pilot light, temperature setting, and look for leaks. Sediment buildup may require flushing.",
        category: "Plumbing",
        icon: "🔥"
      },
      {
        title: "Garbage Disposal",
        problem: "My garbage disposal is malfunctioning.",
        solution: "Try resetting it with the button on the bottom. If jammed, use an Allen wrench in the bottom slot to manually rotate.",
        category: "Plumbing",
        icon: "🗑️"
      },
      {
        title: "Leaking Pipe",
        problem: "I have a leaking pipe.",
        solution: "For a quick fix, use plumber's tape or a pipe repair clamp. Turn off water before repairs.",
        category: "Plumbing",
        icon: "💧"
      },
      {
        title: "Low Water Pressure",
        problem: "I'm experiencing low water pressure.",
        solution: "Check if it affects all fixtures or just one. Clean aerators and shower heads of mineral deposits.",
        category: "Plumbing",
        icon: "📉"
      },
      {
        title: "Smells / Sewer",
        problem: "There's a bad smell coming from my plumbing.",
        solution: "Check p-traps for dryness, clean overflow channels, and ensure vent pipes are clear.",
        category: "Plumbing",
        icon: "👃"
      },
    ],
    landscaper: [
      {
        title: "Plants & Flowers",
        problem: "My plants aren't growing well.",
        solution: "Check soil moisture, sunlight exposure, and test soil pH. Consider adding appropriate fertilizer for your plant type.",
        category: "Gardening",
        icon: "🌷"
      },
      {
        title: "Irrigation",
        problem: "My garden irrigation system isn't working properly.",
        solution: "Check for clogged sprinkler heads, inspect for leaks in hoses, and verify water pressure is adequate.",
        category: "Gardening",
        icon: "💧"
      },
      {
        title: "Soil & Mulch",
        problem: "My soil seems poor quality.",
        solution: "Add organic matter like compost, test pH levels, and consider adding appropriate amendments for your plant needs.",
        category: "Gardening",
        icon: "🌱"
      },
      {
        title: "Pests & Diseases",
        problem: "My plants have pest issues or diseases.",
        solution: "Identify the specific pest or disease, consider organic treatments first, and improve plant health to increase resistance.",
        category: "Gardening",
        icon: "🐛"
      },
      {
        title: "Lawn Care",
        problem: "My lawn has patches or isn't growing evenly.",
        solution: "Test soil, adjust mowing height, aerate compacted soil, and consider overseeding thin areas.",
        category: "Gardening",
        icon: "🌿"
      },
      {
        title: "Seasonal Tasks",
        problem: "I'm not sure what garden tasks to do this season.",
        solution: "Follow a monthly calendar specific to your climate zone, focusing on appropriate planting, pruning, and maintenance.",
        category: "Gardening",
        icon: "📆"
      },
      {
        title: "Climate Advice",
        problem: "Plants that are appropriate for my climate.",
        solution: "Choose native plants or those adapted to your hardiness zone, considering sun exposure and rainfall patterns.",
        category: "Gardening",
        icon: "☀️"
      },
      {
        title: "Garden Design",
        problem: "My garden layout doesn't look cohesive.",
        solution: "Plan with height, bloom time, and color in mind. Create focal points and use repetition for visual harmony.",
        category: "Gardening",
        icon: "🏡"
      },
    ],
    chef: [
      {
        title: "Knife Skills",
        problem: "My knife skills need improvement.",
        solution: "Practice proper grip, keep knives sharp, and learn basic cutting techniques like dicing, mincing, and julienne.",
        category: "Cooking",
        icon: "🔪"
      },
      {
        title: "Cooking Methods",
        problem: "I'm confused about different cooking methods.",
        solution: "Learn the differences between sautéing, roasting, braising, and poaching, and when to use each technique.",
        category: "Cooking",
        icon: "🍳"
      },
    ],
    default: [
      {
        title: "General Advice",
        problem: "I need general assistance.",
        solution: "Check our comprehensive guides or ask specific questions about your issue for targeted help.",
        category: "General",
        icon: "💡"
      },
    ]
  };

  const currentItems = glossaryItems[contextType] || glossaryItems.default;
  
  // Get background color based on context type
  const getBgColorClass = () => {
    switch (contextType) {
      case "plumber": return "bg-gradient-to-b from-blue-50 to-blue-100";
      case "chef": return "bg-gradient-to-b from-orange-50 to-orange-100";
      case "cleaning": return "bg-gradient-to-b from-cyan-50 to-cyan-100";
      case "electrician": return "bg-gradient-to-b from-yellow-50 to-yellow-100";
      case "handyman": return "bg-gradient-to-b from-amber-50 to-amber-100";
      case "landscaper": return "bg-gradient-to-b from-green-50 to-green-100";
      case "mechanic": return "bg-gradient-to-b from-gray-100 to-gray-200";
      case "gadget": return "bg-gradient-to-b from-indigo-50 to-indigo-100";
      case "stylist": return "bg-gradient-to-b from-pink-50 to-pink-100";
      default: return "bg-gradient-to-b from-blue-50 to-blue-100";
    }
  };

  return (
    <div className={`min-h-screen ${getBgColorClass()}`}>
      <EveryFixHeader 
        title={`${contextType.charAt(0).toUpperCase() + contextType.slice(1)} Glossary`}
        icon={<Smartphone className="h-6 w-6 text-white" />} 
        colorClass="w-10 h-10 rounded-full bg-gradient-to-r from-purple-400 to-purple-600 flex items-center justify-center" 
      />

      <main className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <Button 
            variant="ghost" 
            className="flex items-center gap-2"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="h-4 w-4" /> Back
          </Button>
          <h1 className="text-2xl font-bold">Common Issues & Solutions</h1>
          <div className="w-[72px]"></div> {/* Spacer for alignment */}
        </div>

        <div className="grid gap-6">
          {currentItems.map((item, index) => (
            <div key={index} className="bg-white/20 backdrop-blur-md rounded-lg shadow-md p-6 border border-white/30">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center text-xl">
                  {item.icon}
                </div>
                <h3 className="text-xl font-semibold">{item.title}</h3>
              </div>
              <div className="space-y-3">
                <div>
                  <p className="font-medium text-gray-700">Problem:</p>
                  <p className="text-gray-600">{item.problem}</p>
                </div>
                <div>
                  <p className="font-medium text-gray-700">Solution:</p>
                  <p className="text-gray-600">{item.solution}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      <footer className="border-t py-8 mt-12 backdrop-blur-md bg-white/10 border-white/20">
        <div className="container mx-auto px-4 text-center text-sm text-gray-600">
          <p>© 2023 EveryFixAI. All rights reserved.</p>
          <p className="mt-2">For serious issues, always consult a professional {contextType}.</p>
        </div>
      </footer>
    </div>
  );
};

export default GadgetGlossary;
