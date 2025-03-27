
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "@/components/ui/collapsible";
import { ArrowLeft, ArrowRight, Check, Clock, Search, Video, Wrench } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const categories = [
  { id: 'all', label: 'All', icon: '🏠' },
  { id: 'leaks', label: 'Leaks', icon: '🚰' },
  { id: 'toilets', label: 'Toilets', icon: '🚽' },
  { id: 'drains', label: 'Drains & Pipes', icon: '🛠️' },
  { id: 'heaters', label: 'Water Heaters', icon: '🔥' },
  { id: 'sinks', label: 'Sinks & Faucets', icon: '🚿' },
  { id: 'outdoor', label: 'Outdoor', icon: '🌱' },
];

const plumbingFixes = [
  {
    id: 1,
    title: "Fix a Leaky Faucet",
    description: "Step-by-step guide to stop those annoying drips.",
    time: "20-30 min",
    category: "leaks",
    difficulty: "Easy",
    videoLink: "https://www.youtube.com/watch?v=F5JIRPKxpfM",
    steps: [
      "Turn off water supply under the sink",
      "Remove faucet handle with screwdriver",
      "Remove the cartridge/stem assembly",
      "Replace O-rings and washers",
      "Reassemble the faucet in reverse order",
      "Turn water back on and test"
    ]
  },
  {
    id: 2,
    title: "Unclog a Drain",
    description: "Clear stubborn drain blockages without harsh chemicals.",
    time: "15-20 min",
    category: "drains",
    difficulty: "Easy",
    videoLink: "https://www.youtube.com/watch?v=WoexEeIkwV8",
    steps: [
      "Pour boiling water down drain",
      "Use plunger to loosen clog",
      "Mix 1/3 cup baking soda with 1/3 cup vinegar and pour down drain",
      "Wait 30 minutes then flush with hot water",
      "Use plumber's snake if clog persists",
      "For prevention, use drain strainer"
    ]
  },
  {
    id: 3,
    title: "Fix Running Toilet",
    description: "Stop wasting water and fix that annoying sound.",
    time: "30-45 min",
    category: "toilets",
    difficulty: "Medium",
    videoLink: "https://www.youtube.com/watch?v=VRpkvxBz3F4",
    steps: [
      "Turn off water supply to toilet",
      "Remove tank lid and inspect flapper",
      "Replace worn flapper if needed",
      "Check fill valve for proper operation",
      "Adjust or replace fill valve if necessary",
      "Check float height and adjust if needed",
      "Turn water back on and test flush"
    ]
  },
  {
    id: 4,
    title: "Replace a Toilet",
    description: "Complete guide to removing old and installing new toilet.",
    time: "2-3 hours",
    category: "toilets", 
    difficulty: "Hard",
    videoLink: "https://www.youtube.com/watch?v=aNrln_xw5gY",
    steps: [
      "Turn off water and disconnect supply line",
      "Remove old toilet (drain tank, unscrew bolts, carefully lift)",
      "Remove old wax ring and clean flange",
      "Install new wax ring on new toilet base",
      "Set new toilet on flange and secure bolts",
      "Connect water supply and fill tank",
      "Check for leaks and adjust as needed"
    ]
  },
  {
    id: 5,
    title: "Fix a Leaking Pipe",
    description: "Temporary and permanent fixes for pipe leaks.",
    time: "30-60 min",
    category: "leaks",
    difficulty: "Medium",
    videoLink: "https://www.youtube.com/watch?v=FaaQR0u9lJw",
    steps: [
      "Turn off water supply to the affected area",
      "Drain water from the damaged section",
      "Clean and dry the pipe thoroughly",
      "For temporary fix: Apply epoxy putty or pipe repair tape",
      "For permanent fix: Cut out damaged section",
      "Install replacement pipe section with appropriate fittings",
      "Turn water back on and check for leaks"
    ]
  },
  {
    id: 6,
    title: "Replace a Showerhead",
    description: "Upgrade to a new showerhead for better water pressure.",
    time: "15 min",
    category: "sinks",
    difficulty: "Easy",
    videoLink: "https://www.youtube.com/watch?v=qnbLFD_7B8M",
    steps: [
      "Unscrew old showerhead by hand (use wrench if stuck)",
      "Clean pipe threads and remove old plumber's tape",
      "Apply new plumber's tape to threads (wrap clockwise)",
      "Screw on new showerhead hand-tight",
      "Tighten slightly with wrench if needed (be careful not to overtighten)",
      "Turn on water and check for leaks"
    ]
  },
  {
    id: 7,
    title: "Clear Clogged Toilet",
    description: "Multiple methods to clear stubborn toilet clogs.",
    time: "10-30 min",
    category: "toilets",
    difficulty: "Easy",
    videoLink: "https://www.youtube.com/watch?v=MfH0oimMXNM",
    steps: [
      "Use a plunger with proper technique (ensure good seal)",
      "Try hot water and dish soap method",
      "Use toilet auger if plunger doesn't work",
      "Insert auger into bowl and crank handle",
      "Push auger until resistance is felt, then rotate and push through clog",
      "Flush to test if clog is cleared"
    ]
  },
  {
    id: 8,
    title: "Fix Low Water Pressure",
    description: "Troubleshoot and fix common causes of low water pressure.",
    time: "30-60 min",
    category: "sinks",
    difficulty: "Medium",
    videoLink: "https://www.youtube.com/watch?v=YDgCLO169o4",
    steps: [
      "Check if issue affects hot water, cold water, or both",
      "Inspect for partially closed main shutoff valve",
      "Clean faucet aerators (unscrew and rinse)",
      "Check for leaks in supply lines",
      "Test pressure regulator and adjust if needed",
      "Clean or replace shower head if clogged with mineral deposits"
    ]
  },
  {
    id: 9,
    title: "Repair a Garbage Disposal",
    description: "Troubleshoot and fix common garbage disposal issues.",
    time: "20-40 min",
    category: "sinks",
    difficulty: "Medium",
    videoLink: "https://www.youtube.com/watch?v=xXbB2S36ZeA",
    steps: [
      "Turn off power to disposal at breaker",
      "Check reset button on disposal unit",
      "Use allen wrench in bottom hole to manually turn motor",
      "Remove jam (never use hands - use tongs or pliers)",
      "Check for leaks at mounting assembly or dishwasher connection",
      "Replace unit if motor is burned out"
    ]
  },
  {
    id: 10,
    title: "Fix Dripping Outdoor Spigot",
    description: "Repair leaking outdoor faucets before winter.",
    time: "30-45 min",
    category: "outdoor",
    difficulty: "Medium",
    videoLink: "https://www.youtube.com/watch?v=gYvL7xbsLEk",
    steps: [
      "Turn off water supply to outdoor faucet",
      "Remove handle and packing nut",
      "Remove stem assembly",
      "Replace washer and O-rings",
      "Apply plumber's grease to new parts",
      "Reassemble faucet and turn water back on",
      "Check for leaks"
    ]
  },
  {
    id: 11,
    title: "Insulate Water Pipes",
    description: "Prevent frozen pipes and conserve energy.",
    time: "1-3 hours",
    category: "drains",
    difficulty: "Medium",
    videoLink: "https://www.youtube.com/watch?v=jhuGxQJgK-I",
    steps: [
      "Measure pipes that need insulation",
      "Purchase correct size of pipe insulation sleeves",
      "Cut insulation to length with utility knife",
      "Slip insulation over pipes (slit side down)",
      "Secure with tape or zip ties every 1-2 feet",
      "Pay special attention to pipes in unheated areas",
      "Insulate outdoor spigots with covers"
    ]
  },
  {
    id: 12,
    title: "Replace Washing Machine Hoses",
    description: "Prevent flooding with new, reliable supply hoses.",
    time: "30 min",
    category: "leaks",
    difficulty: "Easy",
    videoLink: "https://www.youtube.com/watch?v=J9eAryUKGos",
    steps: [
      "Turn off water supply valves to washing machine",
      "Unplug washing machine for safety",
      "Pull machine away from wall for access",
      "Disconnect old hoses from wall and machine",
      "Install new braided stainless steel hoses",
      "Hand tighten connections first, then 1/4 turn with pliers",
      "Turn water back on and check for leaks"
    ]
  },
  {
    id: 13,
    title: "Fix a Water Heater Leak",
    description: "Address leaks from water heater connections or tank.",
    time: "30-60 min",
    category: "heaters",
    difficulty: "Medium",
    videoLink: "https://www.youtube.com/watch?v=wFvldPcXIjU",
    steps: [
      "Turn off power/gas to water heater",
      "Turn off cold water supply to heater",
      "Identify source of leak (connections, T&P valve, or tank)",
      "Tighten loose connections or replace gaskets",
      "Replace T&P valve if leaking",
      "If tank is leaking, prepare for full replacement",
      "Call professional for tank replacement"
    ]
  },
  {
    id: 14,
    title: "Replace a Sink P-Trap",
    description: "Fix leaks or clogs in the curved pipe under your sink.",
    time: "30 min",
    category: "drains",
    difficulty: "Easy",
    videoLink: "https://www.youtube.com/watch?v=hRBQagB5Uas",
    steps: [
      "Place bucket under P-trap to catch water",
      "Loosen slip nuts on both ends of P-trap",
      "Remove old P-trap and clean or replace",
      "Install new P-trap (ensure washers are properly seated)",
      "Hand-tighten slip nuts (don't overtighten)",
      "Run water and check for leaks",
      "Tighten slightly if needed"
    ]
  },
  {
    id: 15,
    title: "Install a New Bathroom Faucet",
    description: "Update your bathroom sink with a new faucet.",
    time: "1-2 hours",
    category: "sinks",
    difficulty: "Medium",
    videoLink: "https://www.youtube.com/watch?v=r0SnxMOXFHg",
    steps: [
      "Turn off water supply valves under sink",
      "Disconnect supply lines from old faucet",
      "Remove mounting hardware holding old faucet",
      "Clean sink surface where old faucet was installed",
      "Install new faucet according to manufacturer instructions",
      "Connect supply lines to new faucet",
      "Turn water back on and check for leaks"
    ]
  }
];

const Fixes = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [expandedFix, setExpandedFix] = useState<number | null>(null);
  const [completedSteps, setCompletedSteps] = useState<Record<number, number[]>>({});

  // Filter fixes based on search query and selected category
  const filteredFixes = plumbingFixes.filter((fix) => {
    const matchesSearch = fix.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          fix.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "all" || fix.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const toggleStepCompletion = (fixId: number, stepIndex: number) => {
    setCompletedSteps(prev => {
      const currentFixSteps = prev[fixId] || [];
      
      // Check if the step is already completed
      if (currentFixSteps.includes(stepIndex)) {
        // Remove the step from completed steps
        return {
          ...prev,
          [fixId]: currentFixSteps.filter(step => step !== stepIndex)
        };
      } else {
        // Add the step to completed steps
        return {
          ...prev,
          [fixId]: [...currentFixSteps, stepIndex]
        };
      }
    });
  };

  return (
    <div className="min-h-screen bg-[#F5F5F5]">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center mb-4">
            <Link to="/" className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <ArrowLeft className="w-6 h-6 text-[#0A2540]" />
            </Link>
            <div className="ml-4">
              <h1 className="font-inter font-bold text-[22px] text-[#0A2540]">
                Common Plumbing Fixes
              </h1>
            </div>
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" />
            <Input 
              className="pl-10" 
              placeholder="Search for a plumbing issue..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </header>

      {/* Category Tabs */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="flex gap-2 overflow-x-auto py-2 no-scrollbar">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "ghost"}
                className="whitespace-nowrap"
                onClick={() => setSelectedCategory(category.id)}
              >
                <span className="mr-2">{category.icon}</span>
                {category.label}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <motion.div 
          className="grid gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {filteredFixes.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500">No plumbing fixes match your search.</p>
            </div>
          ) : (
            filteredFixes.map((fix) => (
              <Collapsible 
                key={fix.id}
                open={expandedFix === fix.id}
                onOpenChange={() => setExpandedFix(expandedFix === fix.id ? null : fix.id)}
              >
                <Card className="overflow-hidden">
                  <CollapsibleTrigger className="w-full">
                    <div className="p-4 hover:bg-gray-50 transition-colors cursor-pointer">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-full bg-[#00AEEF]/10 flex items-center justify-center flex-shrink-0">
                          <Wrench className="w-6 h-6 text-[#00AEEF]" />
                        </div>
                        <div className="flex-grow text-left">
                          <h3 className="font-inter font-semibold text-lg text-gray-900 mb-1">
                            {fix.title}
                          </h3>
                          <p className="text-gray-600 text-sm mb-2">{fix.description}</p>
                          <div className="flex items-center gap-2 text-sm text-gray-500">
                            <Clock className="w-4 h-4" />
                            <span>{fix.time}</span>
                            <span className="px-2 py-1 bg-gray-100 rounded-full text-xs">
                              {fix.difficulty}
                            </span>
                          </div>
                        </div>
                        <ArrowRight className={`w-5 h-5 text-gray-400 transform transition-transform ${expandedFix === fix.id ? 'rotate-90' : ''}`} />
                      </div>
                    </div>
                  </CollapsibleTrigger>
                  
                  <CollapsibleContent>
                    <div className="p-4 pt-0 border-t">
                      <div className="mb-4">
                        <a 
                          href={fix.videoLink} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-[#00AEEF] hover:underline"
                        >
                          <Video className="w-5 h-5" />
                          <span>Watch tutorial video</span>
                        </a>
                      </div>
                      
                      <h4 className="font-medium text-gray-900 mb-3">Step-by-Step Instructions:</h4>
                      <div className="space-y-3 mb-4">
                        {fix.steps.map((step, index) => (
                          <div key={index} className="flex items-start gap-3">
                            <div className="pt-0.5">
                              <Checkbox 
                                id={`fix-${fix.id}-step-${index}`} 
                                className="border-2 border-gray-300 rounded-full"
                                checked={completedSteps[fix.id]?.includes(index) || false}
                                onCheckedChange={() => toggleStepCompletion(fix.id, index)}
                              />
                            </div>
                            <label 
                              htmlFor={`fix-${fix.id}-step-${index}`}
                              className={`text-sm ${completedSteps[fix.id]?.includes(index) ? 'line-through text-gray-400' : 'text-gray-700'}`}
                            >
                              {step}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CollapsibleContent>
                </Card>
              </Collapsible>
            ))
          )}
        </motion.div>
      </main>
    </div>
  );
};

export default Fixes;
