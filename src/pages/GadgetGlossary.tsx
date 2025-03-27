
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
  
  const glossaryItems: GlossaryItem[] = [
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
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
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
          {glossaryItems.map((item, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md p-6">
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

      <footer className="bg-white border-t py-8 mt-12">
        <div className="container mx-auto px-4 text-center text-sm text-gray-500">
          <p>© 2023 EveryFixAI. All rights reserved.</p>
          <p className="mt-2">For serious issues, always consult a professional {contextType}.</p>
        </div>
      </footer>
    </div>
  );
};

export default GadgetGlossary;
