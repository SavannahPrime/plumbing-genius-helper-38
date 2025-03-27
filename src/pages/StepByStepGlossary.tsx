
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  Search, 
  ArrowLeft, 
  Wrench, 
  Trash2, 
  Settings, 
  Scissors, 
  ChefHat, 
  Leaf,
  Smartphone,
  Droplet,
  Zap
} from "lucide-react";
import EveryFixHeader from "@/components/shared/EveryFixHeader";
import { Input } from "@/components/ui/input";
import { 
  Command, 
  CommandEmpty, 
  CommandGroup, 
  CommandInput, 
  CommandItem, 
  CommandList 
} from "@/components/ui/command";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

interface StepByStepGuide {
  id: string;
  title: string;
  category: string;
  service: string;
  icon: React.ReactNode;
  emoji: string;
  steps: {
    title: string;
    description: string;
  }[];
}

const StepByStepGlossary = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [openCategory, setOpenCategory] = useState<string | null>(null);

  const guides: StepByStepGuide[] = [
    // Plumbing Guides
    {
      id: "toilet-fix",
      title: "Fixing a Running Toilet",
      category: "Plumbing",
      service: "Plumber",
      icon: <Droplet className="h-5 w-5" />,
      emoji: "🚽",
      steps: [
        {
          title: "Turn off water supply",
          description: "Locate the shut-off valve behind the toilet and turn it clockwise to stop water flow."
        },
        {
          title: "Remove tank lid",
          description: "Carefully lift the lid off the toilet tank and set it aside on a safe surface."
        },
        {
          title: "Check the flapper",
          description: "Inspect the rubber flapper at the bottom of the tank. If it's worn, cracked, or not sealing properly, it needs replacement."
        },
        {
          title: "Adjust or replace flapper",
          description: "Either adjust the chain to ensure proper sealing or replace the flapper entirely with a matching model."
        },
        {
          title: "Test your repair",
          description: "Turn the water back on and flush the toilet to see if the running has stopped."
        }
      ]
    },
    {
      id: "unclog-sink",
      title: "Unclogging a Sink Drain",
      category: "Plumbing",
      service: "Plumber",
      icon: <Droplet className="h-5 w-5" />,
      emoji: "🚰",
      steps: [
        {
          title: "Try boiling water",
          description: "Pour boiling water down the drain to melt grease and soap scum clogs."
        },
        {
          title: "Use a plunger",
          description: "Cover the drain with a sink plunger and push up and down vigorously for about 30 seconds."
        },
        {
          title: "Apply baking soda and vinegar",
          description: "Pour 1/2 cup baking soda down the drain, followed by 1/2 cup vinegar. Cover with a plug and wait 30 minutes."
        },
        {
          title: "Clear the P-trap",
          description: "Place a bucket under the P-trap, then unscrew the connectors to remove it and clear any debris."
        },
        {
          title: "Use a drain snake",
          description: "Insert a drain snake into the drain and rotate while pushing to break up stubborn clogs."
        }
      ]
    },
    // Handyman Guides
    {
      id: "fix-door-hinge",
      title: "Fixing a Squeaky Door Hinge",
      category: "Home Repair",
      service: "Handyman",
      icon: <Wrench className="h-5 w-5" />,
      emoji: "🚪",
      steps: [
        {
          title: "Clean the hinge",
          description: "Remove dust and debris from the hinge with a damp cloth."
        },
        {
          title: "Apply lubricant",
          description: "Spray WD-40 or apply a small amount of petroleum jelly to the hinge."
        },
        {
          title: "Move the door",
          description: "Open and close the door several times to distribute the lubricant."
        },
        {
          title: "Wipe excess",
          description: "Clean any excess lubricant with a clean cloth to prevent staining."
        }
      ]
    },
    {
      id: "hang-picture",
      title: "Hanging a Picture Frame",
      category: "Home Repair",
      service: "Handyman",
      icon: <Wrench className="h-5 w-5" />,
      emoji: "🖼️",
      steps: [
        {
          title: "Choose location",
          description: "Decide where you want to hang the picture. Most frames look best at eye level."
        },
        {
          title: "Mark the spot",
          description: "Use a pencil to mark where the nail or screw should go on the wall."
        },
        {
          title: "Check for studs or pipes",
          description: "Use a stud finder to ensure you're not drilling into electrical wires or pipes."
        },
        {
          title: "Install wall anchor",
          description: "For heavier frames, install a wall anchor for better support."
        },
        {
          title: "Hang the picture",
          description: "Place the frame on the nail or screw and adjust until level."
        }
      ]
    },
    // Car Mechanic Guides
    {
      id: "change-oil",
      title: "Changing Your Car's Oil",
      category: "Automotive",
      service: "Mechanic",
      icon: <Settings className="h-5 w-5" />,
      emoji: "🚗",
      steps: [
        {
          title: "Prepare materials",
          description: "Gather oil, oil filter, wrench, oil pan, and jack stands."
        },
        {
          title: "Warm up engine",
          description: "Run the engine for a few minutes to warm the oil for better drainage."
        },
        {
          title: "Lift vehicle safely",
          description: "Use a car jack and secure with jack stands before getting underneath."
        },
        {
          title: "Drain old oil",
          description: "Place the oil pan under the drain plug, then remove the plug and let oil drain completely."
        },
        {
          title: "Replace oil filter",
          description: "Remove the old filter and replace with a new one after applying a small amount of oil to the gasket."
        },
        {
          title: "Add new oil",
          description: "Replace the drain plug, then add new oil through the fill hole on top of the engine."
        },
        {
          title: "Check oil level",
          description: "Start the engine, let it run briefly, then check the dipstick to ensure proper oil level."
        }
      ]
    },
    // Gadget Fix Guides
    {
      id: "clean-phone",
      title: "Cleaning a Smartphone",
      category: "Electronics",
      service: "GadgetFixGenie",
      icon: <Smartphone className="h-5 w-5" />,
      emoji: "📱",
      steps: [
        {
          title: "Turn off device",
          description: "Power down your phone completely before cleaning."
        },
        {
          title: "Remove case and attachments",
          description: "Take off any case, screen protector, or attached accessories."
        },
        {
          title: "Use microfiber cloth",
          description: "Gently wipe the screen and body with a slightly dampened microfiber cloth."
        },
        {
          title: "Clean ports and speakers",
          description: "Use a dry, soft brush or compressed air to remove dust from ports and speakers."
        },
        {
          title: "Disinfect surfaces",
          description: "Apply a small amount of 70% isopropyl alcohol to a cloth (not directly on device) and wipe surfaces."
        }
      ]
    },
    // Landscaper Guides
    {
      id: "prune-shrubs",
      title: "Pruning Garden Shrubs",
      category: "Gardening",
      service: "Landscaper",
      icon: <Leaf className="h-5 w-5" />,
      emoji: "🌳",
      steps: [
        {
          title: "Choose the right time",
          description: "Most shrubs are best pruned in late winter or early spring before new growth begins."
        },
        {
          title: "Select proper tools",
          description: "Use sharp, clean pruning shears for small branches and loppers for larger ones."
        },
        {
          title: "Remove dead or damaged branches",
          description: "Cut off any dead, diseased, or damaged branches first."
        },
        {
          title: "Thin out crowded areas",
          description: "Remove some of the older branches to allow light and air circulation."
        },
        {
          title: "Shape the shrub",
          description: "Make cuts at a 45-degree angle just above a bud that faces the direction you want new growth."
        }
      ]
    },
    // Electrician Guides
    {
      id: "replace-outlet",
      title: "Replacing an Electrical Outlet",
      category: "Electrical",
      service: "Electrician",
      icon: <Zap className="h-5 w-5" />,
      emoji: "⚡",
      steps: [
        {
          title: "Turn off power",
          description: "Shut off the circuit breaker that controls the outlet you're replacing."
        },
        {
          title: "Verify power is off",
          description: "Use a voltage tester to ensure no electricity is flowing to the outlet."
        },
        {
          title: "Remove old outlet",
          description: "Unscrew the faceplate and outlet from the box, then disconnect wires."
        },
        {
          title: "Connect new outlet",
          description: "Connect black wire to brass terminal, white to silver, and ground to green."
        },
        {
          title: "Secure and test",
          description: "Screw the outlet into the box, attach the faceplate, then restore power and test."
        }
      ]
    },
    // Cleaning Guides
    {
      id: "clean-carpet-stain",
      title: "Removing Carpet Stains",
      category: "Cleaning",
      service: "Cleaning",
      icon: <Trash2 className="h-5 w-5" />,
      emoji: "🧹",
      steps: [
        {
          title: "Blot fresh stains immediately",
          description: "Use a clean cloth to blot (not rub) the stain, working from outside in."
        },
        {
          title: "Apply cleaning solution",
          description: "Make a solution with 1/4 cup vinegar, 1 tbsp dish soap, and 1 cup warm water."
        },
        {
          title: "Test in hidden area",
          description: "Apply solution to an inconspicuous area first to ensure it doesn't damage the carpet."
        },
        {
          title: "Treat the stain",
          description: "Apply solution to the stain, let sit for 5-10 minutes, then blot with a clean cloth."
        },
        {
          title: "Rinse and dry",
          description: "Rinse with clean water, blot dry, then place a stack of paper towels with weight on top to absorb moisture."
        }
      ]
    },
    // Chef Guides
    {
      id: "knife-skills",
      title: "Basic Knife Skills",
      category: "Cooking",
      service: "Chef",
      icon: <ChefHat className="h-5 w-5" />,
      emoji: "🔪",
      steps: [
        {
          title: "Choose the right knife",
          description: "Chef's knife for most tasks, paring knife for small items, serrated for bread."
        },
        {
          title: "Grip properly",
          description: "Pinch the blade between thumb and forefinger, wrap remaining fingers around handle."
        },
        {
          title: "Stabilize cutting board",
          description: "Place a damp towel under the board to prevent slipping."
        },
        {
          title: "Use the claw technique",
          description: "Curl fingers of non-knife hand into a claw shape to hold food while protecting fingertips."
        },
        {
          title: "Practice the rocking motion",
          description: "Keep the tip of the knife on the board and rock the blade forward for smooth, efficient cuts."
        }
      ]
    },
    // Stylist Guides
    {
      id: "trim-hair",
      title: "Trimming Your Own Hair",
      category: "Personal Care",
      service: "Stylist",
      icon: <Scissors className="h-5 w-5" />,
      emoji: "💇",
      steps: [
        {
          title: "Prepare your tools",
          description: "Get sharp scissors designed for hair cutting, clips for sectioning, and a comb."
        },
        {
          title: "Start with clean, dry hair",
          description: "Hair shrinks when dry, so cutting dry hair gives you a more accurate length."
        },
        {
          title: "Section your hair",
          description: "Divide hair into manageable sections using clips. Start with bottom layers."
        },
        {
          title: "Cut with points up",
          description: "Hold scissors with points facing up and make small, vertical snips for a softer look."
        },
        {
          title: "Check for evenness",
          description: "Regularly check both sides to ensure even length and adjust as needed."
        }
      ]
    }
  ];

  // Filter guides based on search query
  const filteredGuides = guides.filter(guide => 
    guide.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    guide.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    guide.service.toLowerCase().includes(searchQuery.toLowerCase()) ||
    guide.steps.some(step => 
      step.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      step.description.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  // Group guides by category
  const groupedGuides = filteredGuides.reduce((groups, guide) => {
    if (!groups[guide.category]) {
      groups[guide.category] = [];
    }
    groups[guide.category].push(guide);
    return groups;
  }, {} as Record<string, StepByStepGuide[]>);

  const toggleCategory = (category: string) => {
    setOpenCategory(openCategory === category ? null : category);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <EveryFixHeader 
        title="EveryFix Step-by-Step Guides" 
        icon={<Search className="h-6 w-6 text-white" />} 
        colorClass="w-10 h-10 rounded-full bg-gradient-to-r from-blue-400 to-blue-600 flex items-center justify-center" 
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
          <h1 className="text-2xl font-bold">Comprehensive Guide Library</h1>
          <div className="w-[72px]"></div> {/* Spacer for alignment */}
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <Command className="rounded-lg border shadow-md">
            <CommandInput 
              placeholder="Search for guides by title, category, or keywords..." 
              value={searchQuery}
              onValueChange={setSearchQuery}
              className="h-12"
            />
            {searchQuery && (
              <CommandList>
                <CommandEmpty>No guides found.</CommandEmpty>
                {Object.entries(groupedGuides).map(([category, guides]) => (
                  <CommandGroup key={category} heading={category}>
                    {guides.map((guide) => (
                      <CommandItem 
                        key={guide.id}
                        onSelect={() => {
                          setOpenCategory(category);
                          // Scroll to the guide after a small delay to allow the accordion to open
                          setTimeout(() => {
                            document.getElementById(`guide-${guide.id}`)?.scrollIntoView({ behavior: 'smooth' });
                          }, 100);
                        }}
                        className="flex items-center gap-2 cursor-pointer"
                      >
                        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-100">
                          <span>{guide.emoji}</span>
                        </div>
                        <span>{guide.title}</span>
                      </CommandItem>
                    ))}
                  </CommandGroup>
                ))}
              </CommandList>
            )}
          </Command>
        </div>

        <div className="grid gap-4 mb-8">
          {Object.entries(groupedGuides).length === 0 && !searchQuery && (
            <div className="text-center py-10">
              <p className="text-gray-500">Type in the search box to find specific guides</p>
            </div>
          )}

          {Object.entries(groupedGuides).length === 0 && searchQuery && (
            <div className="text-center py-10">
              <p className="text-gray-500">No guides found matching "{searchQuery}"</p>
            </div>
          )}

          <Accordion type="single" collapsible className="w-full">
            {Object.entries(groupedGuides).map(([category, guides]) => (
              <AccordionItem key={category} value={category}>
                <AccordionTrigger className="text-xl font-semibold py-4">
                  {category} ({guides.length})
                </AccordionTrigger>
                <AccordionContent className="space-y-4">
                  {guides.map((guide) => (
                    <div 
                      key={guide.id} 
                      id={`guide-${guide.id}`}
                      className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden"
                    >
                      <Collapsible>
                        <CollapsibleTrigger className="w-full">
                          <div className="flex items-center gap-3 p-4 hover:bg-gray-50 transition-colors">
                            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                              <span className="text-xl">{guide.emoji}</span>
                            </div>
                            <div className="flex-1 text-left">
                              <h3 className="text-lg font-semibold">{guide.title}</h3>
                              <p className="text-sm text-gray-500">{guide.service}</p>
                            </div>
                          </div>
                        </CollapsibleTrigger>
                        <CollapsibleContent className="px-4 pb-4">
                          <div className="border-t pt-4">
                            <h4 className="font-medium mb-4">Step-by-Step Instructions:</h4>
                            <ol className="space-y-4">
                              {guide.steps.map((step, index) => (
                                <li key={index} className="bg-gray-50 p-4 rounded-md">
                                  <div className="flex items-start gap-3">
                                    <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                      {index + 1}
                                    </div>
                                    <div>
                                      <h5 className="font-medium">{step.title}</h5>
                                      <p className="text-gray-600 mt-1">{step.description}</p>
                                    </div>
                                  </div>
                                </li>
                              ))}
                            </ol>
                          </div>
                        </CollapsibleContent>
                      </Collapsible>
                    </div>
                  ))}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </main>

      <footer className="bg-white border-t py-8">
        <div className="container mx-auto px-4 text-center text-sm text-gray-500">
          <p>© 2023 EveryFixAI. All rights reserved.</p>
          <p className="mt-2">For complex issues, always consult a professional.</p>
        </div>
      </footer>
    </div>
  );
};

export default StepByStepGlossary;
