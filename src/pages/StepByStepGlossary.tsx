
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
import { Textarea } from "@/components/ui/textarea";

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
  const [userNotes, setUserNotes] = useState<Record<string, string>>({});

  // Import all guides from the expanded guides collection
  const guides: StepByStepGuide[] = [...plumbingGuides, ...electricianGuides, ...handymanGuides, 
    ...mechanicGuides, ...landscaperGuides, ...cleaningGuides, ...chefGuides, ...stylistGuides, ...gadgetGuides];

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

  const handleAddNote = (guideId: string, note: string) => {
    setUserNotes(prev => ({
      ...prev,
      [guideId]: note
    }));
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
                            
                            <div className="mt-6">
                              <h4 className="font-medium mb-2">Personal Notes:</h4>
                              <Textarea
                                placeholder="Add your own notes about this procedure..."
                                value={userNotes[guide.id] || ""}
                                onChange={(e) => handleAddNote(guide.id, e.target.value)}
                                className="w-full"
                              />
                            </div>
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

// GUIDE COLLECTIONS
// Plumbing guides (12+ entries)
const plumbingGuides: StepByStepGuide[] = [
  {
    id: "toilet-fix",
    title: "Fixing a Running Toilet",
    category: "Plumbing",
    service: "Plumber",
    icon: <Droplet className="h-5 w-5" />,
    emoji: "🚽",
    steps: [
      { title: "Turn off water supply", description: "Locate the shut-off valve behind the toilet and turn it clockwise to stop water flow." },
      { title: "Remove tank lid", description: "Carefully lift the lid off the toilet tank and set it aside on a safe surface." },
      { title: "Check the flapper", description: "Inspect the rubber flapper at the bottom of the tank. If it's worn, cracked, or not sealing properly, it needs replacement." },
      { title: "Adjust or replace flapper", description: "Either adjust the chain to ensure proper sealing or replace the flapper entirely with a matching model." },
      { title: "Test your repair", description: "Turn the water back on and flush the toilet to see if the running has stopped." }
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
      { title: "Try boiling water", description: "Pour boiling water down the drain to melt grease and soap scum clogs." },
      { title: "Use a plunger", description: "Cover the drain with a sink plunger and push up and down vigorously for about 30 seconds." },
      { title: "Apply baking soda and vinegar", description: "Pour 1/2 cup baking soda down the drain, followed by 1/2 cup vinegar. Cover with a plug and wait 30 minutes." },
      { title: "Clear the P-trap", description: "Place a bucket under the P-trap, then unscrew the connectors to remove it and clear any debris." },
      { title: "Use a drain snake", description: "Insert a drain snake into the drain and rotate while pushing to break up stubborn clogs." }
    ]
  },
  {
    id: "replace-faucet-washer",
    title: "Replacing a Faucet Washer",
    category: "Plumbing",
    service: "Plumber",
    icon: <Droplet className="h-5 w-5" />,
    emoji: "🚰",
    steps: [
      { title: "Turn off water supply", description: "Locate the shut-off valves under the sink and turn them clockwise to shut off water." },
      { title: "Remove handle", description: "Pry off the decorative cap, unscrew the handle screw, and lift off the handle." },
      { title: "Access the washer", description: "Unscrew the packing nut and stem to access the washer at the bottom of the stem." },
      { title: "Replace the washer", description: "Remove the old washer and replace it with an exact match. Make sure it seats properly." },
      { title: "Reassemble and test", description: "Reassemble all parts in reverse order, turn on the water, and check for leaks." }
    ]
  },
  {
    id: "install-new-showerhead",
    title: "Installing a New Showerhead",
    category: "Plumbing",
    service: "Plumber",
    icon: <Droplet className="h-5 w-5" />,
    emoji: "🚿",
    steps: [
      { title: "Remove old showerhead", description: "Use an adjustable wrench to loosen the old showerhead by turning counterclockwise." },
      { title: "Clean the shower arm", description: "Remove old plumber's tape and clean the threads of the shower arm." },
      { title: "Apply plumber's tape", description: "Wrap the shower arm threads with 3-4 layers of plumber's tape in a clockwise direction." },
      { title: "Install new showerhead", description: "Screw on the new showerhead by hand, then tighten gently with a wrench." },
      { title: "Test for leaks", description: "Turn on the water and check for any leaks around the connection. Tighten if necessary." }
    ]
  },
  {
    id: "fix-leaky-pipe",
    title: "Fixing a Leaky Pipe",
    category: "Plumbing",
    service: "Plumber",
    icon: <Droplet className="h-5 w-5" />,
    emoji: "🔧",
    steps: [
      { title: "Turn off water supply", description: "Locate the main water shut-off valve and turn it off to prevent further leaking." },
      { title: "Drain the pipe", description: "Open faucets to drain remaining water from the pipes." },
      { title: "Clean and dry the area", description: "Clean the leaking area thoroughly and dry it completely." },
      { title: "Apply pipe repair materials", description: "For temporary fixes, use epoxy putty or pipe repair tape, following product instructions." },
      { title: "For permanent repairs", description: "Cut out the damaged section and replace with new pipe using appropriate couplings." },
      { title: "Restore water and check", description: "Turn water back on and inspect the repair for any leaks." }
    ]
  },
  {
    id: "clear-toilet-blockage",
    title: "Clearing a Toilet Blockage",
    category: "Plumbing",
    service: "Plumber",
    icon: <Droplet className="h-5 w-5" />,
    emoji: "🚽",
    steps: [
      { title: "Use a plunger", description: "Position the plunger over the toilet drain hole, ensuring a good seal, and push down and up vigorously several times." },
      { title: "Try hot water and dish soap", description: "Pour a bucket of hot (not boiling) water mixed with dish soap into the toilet from waist height." },
      { title: "Use a toilet auger", description: "Insert the curved end of the auger into the toilet drain and crank the handle while pushing down." },
      { title: "Apply drain cleaner", description: "If permitted for your plumbing system, use an enzyme-based drain cleaner following package instructions." },
      { title: "Remove toilet if necessary", description: "For severe blockages, you may need to remove the toilet to access the blockage from below." }
    ]
  },
  {
    id: "replace-toilet-flapper",
    title: "Replacing a Toilet Flapper",
    category: "Plumbing",
    service: "Plumber",
    icon: <Droplet className="h-5 w-5" />,
    emoji: "🚽",
    steps: [
      { title: "Turn off water supply", description: "Close the shut-off valve behind the toilet by turning it clockwise." },
      { title: "Flush to empty tank", description: "Flush the toilet to empty the tank of water." },
      { title: "Remove old flapper", description: "Unhook the chain from the flush lever and disconnect the flapper from the overflow tube." },
      { title: "Install new flapper", description: "Attach the new flapper to the overflow tube and connect the chain to the flush lever." },
      { title: "Adjust chain length", description: "Ensure the chain has about 1/2 inch of slack when the flapper is closed." },
      { title: "Test the flush", description: "Turn the water back on, let the tank fill, and test flush several times to ensure proper operation." }
    ]
  },
  {
    id: "install-faucet-aerator",
    title: "Installing a Faucet Aerator",
    category: "Plumbing",
    service: "Plumber",
    icon: <Droplet className="h-5 w-5" />,
    emoji: "🚰",
    steps: [
      { title: "Remove old aerator", description: "Turn the aerator counterclockwise to unscrew it from the faucet. Use tape-wrapped pliers for stuck aerators." },
      { title: "Clean the threads", description: "Clean any debris or buildup from the faucet threads using an old toothbrush." },
      { title: "Check for washer", description: "Make sure the rubber washer is seated properly in the new aerator." },
      { title: "Install new aerator", description: "Screw the new aerator onto the faucet by hand, turning clockwise." },
      { title: "Tighten appropriately", description: "Hand-tighten only. Using tools can damage the aerator or faucet." }
    ]
  },
  {
    id: "fix-garbage-disposal",
    title: "Fixing a Jammed Garbage Disposal",
    category: "Plumbing",
    service: "Plumber",
    icon: <Droplet className="h-5 w-5" />,
    emoji: "♻️",
    steps: [
      { title: "Turn off power", description: "Unplug the disposal or turn off the appropriate circuit breaker for safety." },
      { title: "Check for foreign objects", description: "Use a flashlight to look for visible obstructions in the disposal. Remove any with long-handled tongs, never your fingers." },
      { title: "Use hex wrench", description: "Insert an Allen wrench (usually 1/4 inch) into the hole at the bottom of the disposal and rotate back and forth to free the impeller." },
      { title: "Reset the unit", description: "Press the red reset button on the bottom of the disposal unit." },
      { title: "Restore power and test", description: "Turn the power back on and test the disposal with cold water running." }
    ]
  },
  {
    id: "unclog-bathtub-drain",
    title: "Unclogging a Bathtub Drain",
    category: "Plumbing",
    service: "Plumber",
    icon: <Droplet className="h-5 w-5" />,
    emoji: "🛁",
    steps: [
      { title: "Remove visible debris", description: "Remove the drain stopper or cover and clear any visible hair or debris." },
      { title: "Use a plunger", description: "Cover the overflow plate with a wet cloth and plunge the drain vigorously." },
      { title: "Try baking soda and vinegar", description: "Pour 1/2 cup baking soda followed by 1/2 cup vinegar down the drain. Wait 30 minutes, then flush with hot water." },
      { title: "Use a drain snake", description: "Feed a drain snake into the drain and rotate while pushing deeper to break up clogs." },
      { title: "Clean the P-trap", description: "For persistent clogs, access and clean the P-trap beneath the tub if possible." }
    ]
  },
  {
    id: "repair-dripping-faucet",
    title: "Repairing a Dripping Faucet",
    category: "Plumbing",
    service: "Plumber",
    icon: <Droplet className="h-5 w-5" />,
    emoji: "💧",
    steps: [
      { title: "Turn off water supply", description: "Close the shut-off valves under the sink by turning clockwise." },
      { title: "Plug the drain", description: "Place a stopper or rag in the drain to prevent losing small parts." },
      { title: "Disassemble the faucet", description: "Remove the handle by prying off the decorative cap and unscrewing the handle screw." },
      { title: "Replace worn parts", description: "Depending on faucet type, replace O-rings, washers, cartridges, or seals as needed." },
      { title: "Reassemble and test", description: "Put everything back together in reverse order, turn on the water, and check for leaks." }
    ]
  },
  {
    id: "thaw-frozen-pipe",
    title: "Thawing a Frozen Pipe",
    category: "Plumbing",
    service: "Plumber",
    icon: <Droplet className="h-5 w-5" />,
    emoji: "❄️",
    steps: [
      { title: "Locate the frozen section", description: "Identify which pipe is frozen by checking for frost or bulging." },
      { title: "Open the faucet", description: "Open the faucet supplied by the frozen pipe to release pressure and allow water to flow as the ice melts." },
      { title: "Apply heat", description: "Use a hair dryer, heating pad, or hot towels to warm the pipe, starting from the faucet end and working toward the blockage." },
      { title: "Never use open flame", description: "Never use a blowtorch, kerosene or propane heater, or other open flame devices to thaw pipes." },
      { title: "Continue until water flows", description: "Keep applying heat until full water pressure is restored." },
      { title: "Check for leaks", description: "Inspect the thawed pipe for cracks or leaks that may have occurred during freezing." }
    ]
  }
];

// Electrician guides (12+ entries)
const electricianGuides: StepByStepGuide[] = [
  {
    id: "replace-outlet",
    title: "Replacing an Electrical Outlet",
    category: "Electrical",
    service: "Electrician",
    icon: <Zap className="h-5 w-5" />,
    emoji: "⚡",
    steps: [
      { title: "Turn off power", description: "Shut off the circuit breaker that controls the outlet you're replacing." },
      { title: "Verify power is off", description: "Use a voltage tester to ensure no electricity is flowing to the outlet." },
      { title: "Remove old outlet", description: "Unscrew the faceplate and outlet from the box, then disconnect wires." },
      { title: "Connect new outlet", description: "Connect black wire to brass terminal, white to silver, and ground to green." },
      { title: "Secure and test", description: "Screw the outlet into the box, attach the faceplate, then restore power and test." }
    ]
  },
  {
    id: "install-ceiling-fan",
    title: "Installing a Ceiling Fan",
    category: "Electrical",
    service: "Electrician",
    icon: <Zap className="h-5 w-5" />,
    emoji: "💨",
    steps: [
      { title: "Turn off power", description: "Shut off the circuit breaker that supplies electricity to the room." },
      { title: "Remove existing fixture", description: "Disconnect the wires and remove any existing light fixture." },
      { title: "Install mounting bracket", description: "Secure the ceiling fan mounting bracket to the ceiling electrical box." },
      { title: "Assemble fan components", description: "Follow manufacturer instructions to assemble the fan motor, blades, and light kit if included." },
      { title: "Connect wiring", description: "Connect the fan wires to the ceiling wires: black to black, white to white, and ground to ground." },
      { title: "Secure fan to bracket", description: "Carefully lift the fan and attach it to the mounting bracket according to instructions." },
      { title: "Test operation", description: "Turn power back on and test the fan and light functions." }
    ]
  },
  {
    id: "replace-light-switch",
    title: "Replacing a Light Switch",
    category: "Electrical",
    service: "Electrician",
    icon: <Zap className="h-5 w-5" />,
    emoji: "💡",
    steps: [
      { title: "Turn off power", description: "Shut off the circuit breaker that controls the switch you're replacing." },
      { title: "Verify power is off", description: "Use a voltage tester to make sure no electricity is flowing to the switch." },
      { title: "Remove old switch", description: "Unscrew the faceplate and switch from the box, then carefully disconnect wires." },
      { title: "Note wire positions", description: "Take a photo or note which wires connect where if the switch has multiple terminals." },
      { title: "Connect new switch", description: "Connect wires to the corresponding terminals on the new switch." },
      { title: "Secure switch and faceplate", description: "Mount the switch in the box, attach the faceplate, then restore power and test." }
    ]
  },
  {
    id: "install-dimmer-switch",
    title: "Installing a Dimmer Switch",
    category: "Electrical",
    service: "Electrician",
    icon: <Zap className="h-5 w-5" />,
    emoji: "🔆",
    steps: [
      { title: "Turn off power", description: "Shut off the circuit breaker that controls the existing switch." },
      { title: "Verify compatibility", description: "Ensure your dimmer switch is compatible with your light bulbs (LED, CFL, incandescent)." },
      { title: "Remove old switch", description: "Unscrew the faceplate and switch, then disconnect the wires." },
      { title: "Connect dimmer switch", description: "Connect the dimmer's black wire to the black (hot) wire and the dimmer's other wire to the load wire going to the light." },
      { title: "Connect ground wire", description: "Connect the green ground wire to the ground wire in the box." },
      { title: "Mount and test", description: "Secure the dimmer in the box, attach the faceplate, restore power, and test the dimming function." }
    ]
  },
  {
    id: "install-usb-outlet",
    title: "Installing a USB Outlet",
    category: "Electrical",
    service: "Electrician",
    icon: <Zap className="h-5 w-5" />,
    emoji: "🔌",
    steps: [
      { title: "Turn off power", description: "Shut off the circuit breaker that controls the outlet you're replacing." },
      { title: "Confirm box size", description: "Ensure your electrical box is deep enough to accommodate the USB outlet, which is typically larger than standard outlets." },
      { title: "Remove old outlet", description: "Remove the faceplate, unscrew the outlet, and disconnect the wires." },
      { title: "Connect new USB outlet", description: "Connect black wire to brass terminal, white to silver, and ground to green on the new USB outlet." },
      { title: "Secure and test", description: "Carefully tuck wires into the box, secure the outlet with screws, attach the faceplate, restore power, and test both the electrical plugs and USB ports." }
    ]
  },
  {
    id: "replace-circuit-breaker",
    title: "Replacing a Circuit Breaker",
    category: "Electrical",
    service: "Electrician",
    icon: <Zap className="h-5 w-5" />,
    emoji: "⚡",
    steps: [
      { title: "Turn off main power", description: "Shut off the main breaker that supplies power to the entire panel." },
      { title: "Verify power is off", description: "Use a voltage tester to confirm no electricity is flowing to the panel." },
      { title: "Remove panel cover", description: "Unscrew and carefully remove the panel cover to access the breakers." },
      { title: "Disconnect old breaker", description: "Unscrew the wire from the old breaker and carefully pull the breaker out of the panel." },
      { title: "Install new breaker", description: "Insert the new breaker of the same type and amperage into the panel slot, making sure it snaps into place." },
      { title: "Connect wire", description: "Connect the circuit wire to the new breaker and tighten the terminal screw securely." },
      { title: "Replace panel cover", description: "Replace the panel cover, turn the main breaker back on, and test the circuit." }
    ]
  },
  {
    id: "install-gfci-outlet",
    title: "Installing a GFCI Outlet",
    category: "Electrical",
    service: "Electrician",
    icon: <Zap className="h-5 w-5" />,
    emoji: "🔌",
    steps: [
      { title: "Turn off power", description: "Shut off the circuit breaker that controls the outlet you're replacing." },
      { title: "Test for power", description: "Use a voltage tester to ensure no electricity is flowing to the outlet." },
      { title: "Remove old outlet", description: "Remove the faceplate, unscrew the outlet, and disconnect the wires." },
      { title: "Identify line and load", description: "Identify the incoming power (LINE) and outgoing (LOAD) wires if you want to protect downstream outlets." },
      { title: "Connect GFCI outlet", description: "Connect LINE wires to LINE terminals (black to brass, white to silver) and LOAD wires to LOAD terminals if applicable." },
      { title: "Connect ground wire", description: "Connect the ground wire to the green terminal." },
      { title: "Secure and test", description: "Secure the outlet in the box, attach the faceplate, restore power, and test by pressing the TEST and RESET buttons." }
    ]
  },
  {
    id: "install-smart-light-switch",
    title: "Installing a Smart Light Switch",
    category: "Electrical",
    service: "Electrician",
    icon: <Zap className="h-5 w-5" />,
    emoji: "📱",
    steps: [
      { title: "Turn off power", description: "Shut off the circuit breaker that controls the switch you're replacing." },
      { title: "Check for neutral wire", description: "Most smart switches require a neutral wire. Look for a white wire in the switch box." },
      { title: "Remove old switch", description: "Remove the faceplate, unscrew the switch, and disconnect the wires." },
      { title: "Connect smart switch", description: "Connect wires according to the manufacturer's instructions, typically black to 'line', black/red to 'load', white to 'neutral', and green to 'ground'." },
      { title: "Secure and set up", description: "Mount the switch in the box, attach the faceplate, restore power, and follow the app instructions to complete setup." }
    ]
  },
  {
    id: "test-gfci-outlets",
    title: "Testing GFCI Outlets",
    category: "Electrical",
    service: "Electrician",
    icon: <Zap className="h-5 w-5" />,
    emoji: "🔌",
    steps: [
      { title: "Locate GFCI outlets", description: "Identify all GFCI outlets in your home, typically found in kitchens, bathrooms, garages, and outdoor areas." },
      { title: "Plug in a night light", description: "Plug a small lamp or night light into the outlet to verify it has power." },
      { title: "Press the TEST button", description: "Press the TEST button on the GFCI outlet. The RESET button should pop out and the light should turn off." },
      { title: "Press the RESET button", description: "Press the RESET button to restore power. The light should turn back on." },
      { title: "Check downstream outlets", description: "If other outlets are protected by this GFCI, verify they also lost and regained power during the test." },
      { title: "Replace if necessary", description: "If the GFCI doesn't trip when tested or won't reset, it should be replaced." }
    ]
  },
  {
    id: "install-motion-sensor-light",
    title: "Installing a Motion Sensor Light",
    category: "Electrical",
    service: "Electrician",
    icon: <Zap className="h-5 w-5" />,
    emoji: "👁️",
    steps: [
      { title: "Turn off power", description: "Shut off the circuit breaker that controls the existing light fixture." },
      { title: "Remove old light", description: "Remove the existing light fixture and disconnect the wires." },
      { title: "Mount the motion sensor", description: "Install the motion sensor light's mounting bracket to the junction box." },
      { title: "Connect the wires", description: "Connect the black wire from the house to the black wire on the fixture, white to white, and ground to ground." },
      { title: "Adjust settings", description: "Set the sensitivity, duration, and light level controls according to your preferences." },
      { title: "Test operation", description: "Turn the power back on and test the motion sensor by walking in front of it." }
    ]
  },
  {
    id: "upgrade-light-fixture",
    title: "Upgrading a Light Fixture",
    category: "Electrical",
    service: "Electrician",
    icon: <Zap className="h-5 w-5" />,
    emoji: "💡",
    steps: [
      { title: "Turn off power", description: "Shut off the circuit breaker that controls the light fixture." },
      { title: "Remove old fixture", description: "Remove the glass shade or cover, unscrew the fixture, and disconnect the wires." },
      { title: "Check the electrical box", description: "Ensure the box can support the weight of the new fixture. Install a ceiling brace if needed." },
      { title: "Assemble new fixture", description: "Partially assemble the new fixture according to manufacturer instructions." },
      { title: "Connect the wires", description: "Connect black to black, white to white, and ground to ground, using wire nuts to secure connections." },
      { title: "Mount new fixture", description: "Carefully tuck wires into the box and secure the fixture to the mounting bracket." },
      { title: "Install light bulbs", description: "Install the appropriate bulbs and any decorative covers or shades." },
      { title: "Test operation", description: "Turn the power back on and test the new fixture." }
    ]
  },
  {
    id: "change-smoke-detector-battery",
    title: "Changing a Smoke Detector Battery",
    category: "Electrical",
    service: "Electrician",
    icon: <Zap className="h-5 w-5" />,
    emoji: "🔋",
    steps: [
      { title: "Prepare replacement battery", description: "Purchase the correct type of battery as specified in the detector's manual." },
      { title: "Remove cover", description: "Twist or slide the cover off the smoke detector. Some models may require pressing a tab or button." },
      { title: "Remove old battery", description: "Take out the old battery, noting its orientation." },
      { title: "Clean contacts", description: "Gently clean the battery contacts with a dry cloth if they appear corroded." },
      { title: "Install new battery", description: "Insert the new battery in the proper orientation, matching the + and - signs." },
      { title: "Replace cover", description: "Reattach the cover and twist or slide it to lock in place." },
      { title: "Test detector", description: "Press the test button to ensure the alarm sounds properly." }
    ]
  }
];

// Handyman guides (10+ entries)
const handymanGuides: StepByStepGuide[] = [
  {
    id: "fix-door-hinge",
    title: "Fixing a Squeaky Door Hinge",
    category: "Home Repair",
    service: "Handyman",
    icon: <Wrench className="h-5 w-5" />,
    emoji: "🚪",
    steps: [
      { title: "Clean the hinge", description: "Remove dust and debris from the hinge with a damp cloth." },
      { title: "Apply lubricant", description: "Spray WD-40 or apply a small amount of petroleum jelly to the hinge." },
      { title: "Move the door", description: "Open and close the door several times to distribute the lubricant." },
      { title: "Wipe excess", description: "Clean any excess lubricant with a clean cloth to prevent staining." }
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
      { title: "Choose location", description: "Decide where you want to hang the picture. Most frames look best at eye level." },
      { title: "Mark the spot", description: "Use a pencil to mark where the nail or screw should go on the wall." },
      { title: "Check for studs or pipes", description: "Use a stud finder to ensure you're not drilling into electrical wires or pipes." },
      { title: "Install wall anchor", description: "For heavier frames, install a wall anchor for better support." },
      { title: "Hang the picture", description: "Place the frame on the nail or screw and adjust until level." }
    ]
  },
  {
    id: "repair-drywall-hole",
    title: "Repairing a Small Drywall Hole",
    category: "Home Repair",
    service: "Handyman",
    icon: <Wrench className="h-5 w-5" />,
    emoji: "🧱",
    steps: [
      { title: "Clean the hole", description: "Remove any loose debris from the damaged area." },
      { title: "Apply mesh patch", description: "For holes smaller than 6 inches, place a self-adhesive mesh patch over the hole." },
      { title: "Apply joint compound", description: "Spread a thin layer of joint compound over the patch with a putty knife." },
      { title: "Sand when dry", description: "Once dry (usually 24 hours), sand the area smooth with fine-grit sandpaper." },
      { title: "Prime and paint", description: "Prime the repaired area and then paint to match the surrounding wall." }
    ]
  },
  {
    id: "fix-leaky-faucet",
    title: "Fixing a Dripping Faucet",
    category: "Home Repair",
    service: "Handyman",
    icon: <Wrench className="h-5 w-5" />,
    emoji: "🚰",
    steps: [
      { title: "Turn off water", description: "Shut off the water supply valves under the sink." },
      { title: "Remove handle", description: "Pry off any decorative caps and remove the handle screws, then lift off the handle." },
      { title: "Replace washer or cartridge", description: "Identify your faucet type (compression, ball, ceramic disk, or cartridge) and replace the appropriate parts." },
      { title: "Reassemble", description: "Put the faucet back together in reverse order of disassembly." },
      { title: "Turn on water", description: "Turn the water supply back on and test for leaks." }
    ]
  },
  {
    id: "install-floating-shelf",
    title: "Installing Floating Shelves",
    category: "Home Repair",
    service: "Handyman",
    icon: <Wrench className="h-5 w-5" />,
    emoji: "📚",
    steps: [
      { title: "Mark shelf location", description: "Use a level and pencil to mark where you want the shelf to be mounted." },
      { title: "Locate studs", description: "Use a stud finder to locate and mark wall studs for secure mounting." },
      { title: "Install bracket", description: "Secure the mounting bracket to the wall, making sure to screw into studs or use appropriate wall anchors." },
      { title: "Slide shelf onto bracket", description: "Carefully slide the shelf onto the mounted bracket until secure." },
      { title: "Check for level", description: "Use a level to ensure the shelf is perfectly horizontal." },
      { title: "Test strength", description: "Gently press down on the shelf to ensure it can support weight before adding items." }
    ]
  },
  {
    id: "fix-running-toilet",
    title: "Fixing a Running Toilet",
    category: "Home Repair",
    service: "Handyman",
    icon: <Wrench className="h-5 w-5" />,
    emoji: "🚽",
    steps: [
      { title: "Remove tank lid", description: "Carefully lift off the toilet tank lid and set aside." },
      { title: "Check the flapper", description: "See if the flapper is closing properly over the drain at the bottom of the tank." },
      { title: "Adjust the chain", description: "If the chain is too tight or too loose, adjust it to allow proper flapper closure." },
      { title: "Check fill height", description: "Adjust the float to ensure water stops about 1 inch below the overflow tube." },
      { title: "Replace worn parts", description: "If adjustments don't work, replace the flapper or fill valve as needed." }
    ]
  },
  {
    id: "caulk-bathroom",
    title: "Caulking a Bathroom",
    category: "Home Repair",
    service: "Handyman",
    icon: <Wrench className="h-5 w-5" />,
    emoji: "🛁",
    steps: [
      { title: "Remove old caulk", description: "Use a caulk removal tool or utility knife to completely remove all old caulk." },
      { title: "Clean the surface", description: "Clean the area thoroughly with rubbing alcohol and allow to dry completely." },
      { title: "Apply painter's tape", description: "Place tape on both sides of the joint to create clean, straight lines." },
      { title: "Apply new caulk", description: "Cut the caulk tube tip at a 45-degree angle and apply a smooth, continuous bead." },
      { title: "Smooth the bead", description: "Use a caulk finishing tool or your finger dipped in water to smooth the bead." },
      { title: "Remove tape", description: "Remove the tape immediately after smoothing, before the caulk begins to dry." },
      { title: "Allow to cure", description: "Let the caulk cure completely according to the manufacturer's instructions before using the shower or tub." }
    ]
  },
  {
    id: "fix-sticky-door",
    title: "Fixing a Sticky Door",
    category: "Home Repair",
    service: "Handyman",
    icon: <Wrench className="h-5 w-5" />,
    emoji: "🚪",
    steps: [
      { title: "Identify the problem", description: "Open and close the door to determine where it's sticking." },
      { title: "Tighten hinges", description: "Check if loose hinges are causing the problem and tighten screws if needed." },
      { title: "Sand high spots", description: "If the door is rubbing, mark the spot with chalk and sand down the high area." },
      { title: "Check for humidity issues", description: "In humid conditions, consider using a dehumidifier if the door swells seasonally." },
      { title: "Adjust strike plate", description: "If the door is catching on the strike plate, loosen it and reposition as needed." }
    ]
  },
  {
    id: "replace-cabinet-hardware",
    title: "Replacing Cabinet Hardware",
    category: "Home Repair",
    service: "Handyman",
    icon: <Wrench className="h-5 w-5" />,
    emoji: "🧰",
    steps: [
      { title: "Remove old hardware", description: "Unscrew and remove all old knobs or pulls from the cabinets." },
      { title: "Measure hole spacing", description: "For pulls with two screws, measure the distance between holes (the 'center-to-center' measurement)." },
      { title: "Fill old holes if needed", description: "If the new hardware has different spacing, fill the old holes with wood filler and drill new ones." },
      { title: "Install new hardware", description: "Insert screws through the cabinet door from the inside and attach the new knobs or pulls." },
      { title: "Tighten securely", description: "Use a screwdriver to ensure all hardware is firmly attached but not overtightened." }
    ]
  },
  {
    id: "fix-screen-door",
    title: "Repairing a Window or Door Screen",
    category: "Home Repair",
    service: "Handyman",
    icon: <Wrench className="h-5 w-5" />,
    emoji: "🪟",
    steps: [
      { title: "Remove the screen", description: "Take the screen out of the door or window frame." },
      { title: "Remove the spline", description: "Use a screwdriver to carefully pry out the rubber spline that holds the screen in place." },
      { title: "Remove old screen", description: "Lift out the damaged screen material." },
      { title: "Cut new screen", description: "Cut a new piece of screen material about 2 inches larger than the frame on all sides." },
      { title: "Position new screen", description: "Lay the new screen over the frame, ensuring it's centered and flat." },
      { title: "Install spline", description: "Use a spline roller tool to press the spline into the groove, securing the screen." },
      { title: "Trim excess screen", description: "Use a utility knife to carefully trim off excess screen material outside the spline." },
      { title: "Reinstall screen", description: "Put the repaired screen back into the door or window." }
    ]
  }
];

// Mechanic guides (10+ entries)
const mechanicGuides: StepByStepGuide[] = [
  {
    id: "change-oil",
    title: "Changing Your Car's Oil",
    category: "Automotive",
    service: "Mechanic",
    icon: <Settings className="h-5 w-5" />,
    emoji: "🚗",
    steps: [
      { title: "Prepare materials", description: "Gather oil, oil filter, wrench, oil pan, and jack stands." },
      { title: "Warm up engine", description: "Run the engine for a few minutes to warm the oil for better drainage." },
      { title: "Lift vehicle safely", description: "Use a car jack and secure with jack stands before getting underneath." },
      { title: "Drain old oil", description: "Place the oil pan under the drain plug, then remove the plug and let oil drain completely." },
      { title: "Replace oil filter", description: "Remove the old filter and replace with a new one after applying a small amount of oil to the gasket." },
      { title: "Add new oil", description: "Replace the drain plug, then add new oil through the fill hole on top of the engine." },
      { title: "Check oil level", description: "Start the engine, let it run briefly, then check the dipstick to ensure proper oil level." }
    ]
  },
  {
    id: "replace-air-filter",
    title: "Replacing an Engine Air Filter",
    category: "Automotive",
    service: "Mechanic",
    icon: <Settings className="h-5 w-5" />,
    emoji: "🚗",
    steps: [
      { title: "Locate the air filter housing", description: "Find the air filter box, usually a black plastic box on top or side of the engine." },
      { title: "Open the housing", description: "Unclip or unscrew the fasteners holding the air filter housing closed." },
      { title: "Remove old filter", description: "Take out the old air filter, noting its orientation in the housing." },
      { title: "Inspect and clean", description: "Clean any debris from the housing using a shop vacuum or damp cloth." },
      { title: "Install new filter", description: "Insert the new air filter in the same orientation as the old one." },
      { title: "Close housing", description: "Secure the housing cover by fastening all clips or screws." },
      { title: "Check engine performance", description: "Start the engine to ensure it runs smoothly with the new filter." }
    ]
  },
  {
    id: "change-wiper-blades",
    title: "Changing Windshield Wiper Blades",
    category: "Automotive",
    service: "Mechanic",
    icon: <Settings className="h-5 w-5" />,
    emoji: "🚗",
    steps: [
      { title: "Purchase correct blades", description: "Buy replacement blades that fit your vehicle's make and model." },
      { title: "Lift wiper arm", description: "Carefully pull the wiper arm away from the windshield until it locks in the extended position." },
      { title: "Disconnect old blade", description: "Press the small tab on the underside of the wiper and slide the blade off the arm." },
      { title: "Attach new blade", description: "Line up the new wiper blade with the arm and slide it into place until it clicks." },
      { title: "Lower arm", description: "Carefully lower the wiper arm back to the windshield." },
      { title: "Repeat for other blade", description: "Follow the same steps to replace the other wiper blade." },
      { title: "Test wipers", description: "Turn on the wiper system to make sure the new blades work properly." }
    ]
  },
  {
    id: "check-tire-pressure",
    title: "Checking and Adjusting Tire Pressure",
    category: "Automotive",
    service: "Mechanic",
    icon: <Settings className="h-5 w-5" />,
    emoji: "🚗",
    steps: [
      { title: "Find recommended pressure", description: "Check the driver's side door jamb sticker or owner's manual for the correct tire pressure (PSI)." },
      { title: "Check when cold", description: "Measure tire pressure when tires are cold (vehicle has been parked for at least 3 hours)." },
      { title: "Remove valve cap", description: "Unscrew the valve stem cap and place it where it won't get lost." },
      { title: "Check pressure", description: "Press the tire gauge firmly onto the valve stem and read the pressure." },
      { title: "Add air if needed", description: "If pressure is low, use an air compressor to add air, checking pressure frequently." },
      { title: "Release air if too high", description: "If pressure is too high, press the center pin of the valve stem to release air." },
      { title: "Replace valve cap", description: "Once the pressure is correct, screw the valve cap back on tightly." },
      { title: "Repeat for all tires", description: "Check and adjust all four tires, plus the spare if your vehicle has one." }
    ]
  },
  {
    id: "replace-battery",
    title: "Replacing a Car Battery",
    category: "Automotive",
    service: "Mechanic",
    icon: <Settings className="h-5 w-5" />,
    emoji: "🚗",
    steps: [
      { title: "Gather tools", description: "You'll need wrenches, possibly pliers, and protective gloves." },
      { title: "Locate battery", description: "Open the hood and identify the battery, usually near one corner of the engine bay." },
      { title: "Disconnect negative cable", description: "Loosen the negative (-) terminal clamp bolt and remove the cable. Always disconnect negative first." },
      { title: "Disconnect positive cable", description: "Loosen the positive (+) terminal clamp bolt and remove the cable." },
      { title: "Remove battery hold-down", description: "Unscrew or unlock the bracket or strap that keeps the battery in place." },
      { title: "Remove old battery", description: "Carefully lift out the old battery, keeping it upright to avoid acid spills." },
      { title: "Clean terminals", description: "Clean the terminal clamps with a wire brush if they show corrosion." },
      { title: "Install new battery", description: "Place the new battery in the same position as the old one." },
      { title: "Secure battery", description: "Reinstall the hold-down bracket or strap." },
      { title: "Connect positive cable", description: "Attach and tighten the positive (+) cable first." },
      { title: "Connect negative cable", description: "Attach and tighten the negative (-) cable last." },
      { title: "Test operation", description: "Close the hood and start the vehicle to ensure proper operation." }
    ]
  },
  {
    id: "jump-start-car",
    title: "Jump-Starting a Car",
    category: "Automotive",
    service: "Mechanic",
    icon: <Settings className="h-5 w-5" />,
    emoji: "🚗",
    steps: [
      { title: "Position vehicles", description: "Park the working vehicle so its battery is close to the dead battery, but ensure the vehicles don't touch." },
      { title: "Turn off both vehicles", description: "Make sure both vehicles are in Park/Neutral with ignitions off and parking brakes set." },
      { title: "Connect positive cables", description: "Connect one end of the red jumper cable to the positive (+) terminal of the dead battery." },
      { title: "Connect other positive", description: "Connect the other end of the red cable to the positive (+) terminal of the good battery." },
      { title: "Connect negative to good battery", description: "Connect one end of the black jumper cable to the negative (-) terminal of the good battery." },
      { title: "Connect ground", description: "Connect the other end of the black cable to an unpainted metal surface on the engine of the car with the dead battery (not to the negative terminal)." },
      { title: "Start good vehicle", description: "Start the engine of the vehicle with the good battery and let it run for a few minutes." },
      { title: "Start dead vehicle", description: "Try to start the vehicle with the dead battery. If it doesn't start, wait a few more minutes with the good car running." },
      { title: "Disconnect cables", description: "Once the dead vehicle starts, remove the cables in the reverse order: black from ground, black from good battery, red from good battery, red from jumped battery." },
      { title: "Keep engine running", description: "Keep the jumped vehicle running for at least 20 minutes to allow the alternator to charge the battery." }
    ]
  },
  {
    id: "replace-headlight-bulb",
    title: "Replacing a Headlight Bulb",
    category: "Automotive",
    service: "Mechanic",
    icon: <Settings className="h-5 w-5" />,
    emoji: "🚗",
    steps: [
      { title: "Check the manual", description: "Consult your vehicle's manual to identify the correct bulb type and access method." },
      { title: "Access headlight assembly", description: "Open the hood and locate the back of the headlight assembly." },
      { title: "Disconnect power", description: "Disconnect the power connector from the back of the headlight bulb. Usually a clip or plug." },
      { title: "Remove old bulb", description: "Depending on your vehicle, either unscrew the retaining ring, release the spring clip, or twist the bulb base counterclockwise." },
      { title: "Handle new bulb properly", description: "Hold the new bulb by its base, not the glass. Oil from skin can cause the bulb to fail prematurely." },
      { title: "Install new bulb", description: "Insert the new bulb into the socket, ensuring it's properly aligned and seated." },
      { title: "Secure the bulb", description: "Reattach the retaining mechanism (ring, clip, or twist-lock)." },
      { title: "Reconnect power", description: "Reattach the power connector to the new bulb." },
      { title: "Test headlight", description: "Turn on the headlights to ensure the new bulb works properly." }
    ]
  },
  {
    id: "replace-brake-pads",
    title: "Replacing Brake Pads",
    category: "Automotive",
    service: "Mechanic",
    icon: <Settings className="h-5 w-5" />,
    emoji: "🚗",
    steps: [
      { title: "Gather tools and parts", description: "You'll need a jack, jack stands, lug wrench, c-clamp, wrench set, new brake pads, and possibly brake lubricant." },
      { title: "Loosen lug nuts", description: "Slightly loosen the lug nuts while the vehicle is still on the ground." },
      { title: "Jack and secure vehicle", description: "Raise the vehicle and support it with jack stands on a solid level surface." },
      { title: "Remove wheel", description: "Finish removing the lug nuts and take off the wheel to access the brake caliper." },
      { title: "Remove caliper bolts", description: "Remove the bolts holding the caliper in place (usually on the back or sides of the caliper)." },
      { title: "Pivot caliper away", description: "Lift the caliper off the rotor and suspend it with wire to prevent strain on the brake line." },
      { title: "Remove old pads", description: "Take out the old brake pads from the caliper bracket." },
      { title: "Compress caliper piston", description: "Use a c-clamp to push the caliper piston back into its housing to make room for the new thicker pads." },
      { title: "Install new pads", description: "Apply brake lubricant to the backs of the new pads and places they contact the caliper, then install them in the bracket." },
      { title: "Reattach caliper", description: "Lower the caliper back into position and reinstall the bolts, tightening to specifications." },
      { title: "Replace wheel", description: "Put the wheel back on, thread the lug nuts by hand, and partially tighten them." },
      { title: "Lower vehicle", description: "Carefully lower the vehicle from the jack stands and fully tighten the lug nuts in a star pattern." },
      { title: "Pump brakes", description: "Before driving, pump the brake pedal several times to restore pressure in the system." },
      { title: "Repeat for other wheels", description: "Repeat the process for each wheel where you want to replace the pads." },
      { title: "Break in pads", description: "Drive carefully for the first 100 miles while the new pads break in." }
    ]
  },
  {
    id: "fix-squeaky-brakes",
    title: "Fixing Squeaky Brakes",
    category: "Automotive",
    service: "Mechanic",
    icon: <Settings className="h-5 w-5" />,
    emoji: "🚗",
    steps: [
      { title: "Identify the type of squeak", description: "Determine if the sound occurs during braking or constantly, and whether it's high-pitched or grinding." },
      { title: "Inspect brake pads", description: "Check the condition of the brake pads. If they're worn down to less than 1/4 inch, they need replacement." },
      { title: "Clean the brakes", description: "Remove the wheels and clean the brake components with brake cleaner to remove built-up dust and debris." },
      { title: "Apply anti-squeal compound", description: "If pads are in good condition, apply brake anti-squeal compound to the backs of the pads where they contact the calipers." },
      { title: "Check for glazed rotors", description: "Look for a shiny, glazed appearance on the rotors, which can cause squeaking. If present, have them resurfaced or replaced." },
      { title: "Lubricate contact points", description: "Apply a small amount of brake lubricant to the caliper pins and where the pads contact the caliper bracket." },
      { title: "Install anti-squeal shims", description: "Install anti-squeal shims between the brake pads and calipers if your vehicle doesn't already have them." },
      { title: "Reassemble and test", description: "Put everything back together, replace the wheels, and test drive to see if the squeak is gone." }
    ]
  },
  {
    id: "check-transmission-fluid",
    title: "Checking Transmission Fluid",
    category: "Automotive",
    service: "Mechanic",
    icon: <Settings className="h-5 w-5" />,
    emoji: "🚗",
    steps: [
      { title: "Prepare the vehicle", description: "Park on level ground and warm up the engine to normal operating temperature." },
      { title: "Locate dipstick", description: "Find the transmission dipstick, usually with a red or pink handle (different from the oil dipstick)." },
      { title: "Check with engine running", description: "For most vehicles, keep the engine running with the transmission in Park or Neutral." },
      { title: "Remove dipstick", description: "Pull out the dipstick, wipe it clean with a lint-free cloth or paper towel." },
      { title: "Reinsert and remove", description: "Put the dipstick all the way back in, then pull it out again to check the fluid level." },
      { title: "Check fluid level", description: "The fluid should be between the 'MIN' and 'MAX' marks (or 'ADD' and 'FULL')." },
      { title: "Inspect fluid condition", description: "The fluid should be clear with a reddish tint. Brown or black fluid with a burnt smell indicates it needs changing." },
      { title: "Add fluid if needed", description: "If low, add the correct type of transmission fluid through the dipstick tube using a funnel. Add a little at a time, rechecking the level." },
      { title: "Replace dipstick", description: "Return the dipstick to its tube and ensure it's fully seated." }
    ]
  }
];

// Landscaper guides (10+ entries)
const landscaperGuides: StepByStepGuide[] = [
  {
    id: "prune-shrubs",
    title: "Pruning Garden Shrubs",
    category: "Gardening",
    service: "Landscaper",
    icon: <Leaf className="h-5 w-5" />,
    emoji: "🌳",
    steps: [
      { title: "Choose the right time", description: "Most shrubs are best pruned in late winter or early spring before new growth begins." },
      { title: "Select proper tools", description: "Use sharp, clean pruning shears for small branches and loppers for larger ones." },
      { title: "Remove dead or damaged branches", description: "Cut off any dead, diseased, or damaged branches first." },
      { title: "Thin out crowded areas", description: "Remove some of the older branches to allow light and air circulation." },
      { title: "Shape the shrub", description: "Make cuts at a 45-degree angle just above a bud that faces the direction you want new growth." }
    ]
  },
  {
    id: "plant-tree",
    title: "Planting a Tree",
    category: "Gardening",
    service: "Landscaper",
    icon: <Leaf className="h-5 w-5" />,
    emoji: "🌱",
    steps: [
      { title: "Choose the right location", description: "Consider the mature size of the tree, sun requirements, and distance from structures and utilities." },
      { title: "Dig the hole", description: "Dig a hole two to three times wider than the root ball and just as deep as the root ball height." },
      { title: "Prepare the tree", description: "Remove any packaging and loosen the root ball if root-bound, without damaging the roots." },
      { title: "Position the tree", description: "Place the tree in the hole with the trunk flare (where the trunk expands at the base) slightly above ground level." },
      { title: "Backfill the hole", description: "Fill in with the original soil, tamping lightly to remove air pockets but not compacting too firmly." },
      { title: "Water thoroughly", description: "Create a soil basin around the tree and water deeply to settle the soil." },
      { title: "Add mulch", description: "Apply 2-4 inches of mulch in a circle around the tree, keeping it away from the trunk." },
      { title: "Stake if necessary", description: "Only stake the tree if it's in a very windy area or has a small root ball relative to its height." }
    ]
  },
  {
    id: "lawn-care",
    title: "Basic Lawn Care",
    category: "Gardening",
    service: "Landscaper",
    icon: <Leaf className="h-5 w-5" />,
    emoji: "🌿",
    steps: [
      { title: "Mow properly", description: "Never remove more than one-third of the grass blade length at once. Keep mower blades sharp." },
      { title: "Water deeply", description: "Water 1-1.5 inches per week, preferably in one or two deep waterings rather than frequent light sprinklings." },
      { title: "Fertilize appropriately", description: "Apply fertilizer according to grass type and season. Generally, fertilize cool-season grasses in fall and spring, warm-season grasses in late spring through summer." },
      { title: "Control weeds", description: "Apply pre-emergent herbicide in early spring and spot-treat existing weeds with appropriate herbicides." },
      { title: "Aerate compacted soil", description: "Aerate the lawn once a year if soil is compacted or has heavy thatch buildup." },
      { title: "Overseed thin areas", description: "In fall (for cool-season grasses) or late spring (for warm-season grasses), spread grass seed over thin areas." }
    ]
  },
  {
    id: "install-drip-irrigation",
    title: "Installing a Drip Irrigation System",
    category: "Gardening",
    service: "Landscaper",
    icon: <Leaf className="h-5 w-5" />,
    emoji: "💧",
    steps: [
      { title: "Plan your system", description: "Map out your garden areas and determine water needs for different plants." },
      { title: "Connect to water source", description: "Install a backflow preventer, pressure regulator, and filter at your water source." },
      { title: "Lay main line", description: "Run 1/2-inch poly tubing as your main supply line through garden areas." },
      { title: "Install emitters", description: "Punch holes in the main line and insert appropriate emitters near plant bases. Use 1/4-inch micro tubing to reach individual plants if needed." },
      { title: "Secure tubing", description: "Use ground stakes to secure the tubing in place." },
      { title: "Install timer", description: "Connect an automatic timer to your system for consistent watering." },
      { title: "Test the system", description: "Turn on the water to check for leaks and ensure all plants receive water." },
      { title: "Add mulch", description: "Cover the tubing with mulch to protect from sun damage and reduce evaporation." }
    ]
  },
  {
    id: "build-raised-garden-bed",
    title: "Building a Raised Garden Bed",
    category: "Gardening",
    service: "Landscaper",
    icon: <Leaf className="h-5 w-5" />,
    emoji: "🥕",
    steps: [
      { title: "Choose a location", description: "Select a level spot that receives at least 6-8 hours of sunlight daily, with good drainage and access to water." },
      { title: "Select materials", description: "Choose rot-resistant wood (cedar, redwood), composite lumber, concrete blocks, or other durable materials." },
      { title: "Determine dimensions", description: "Plan a width that allows you to reach the center from either side (typically 3-4 feet) and any convenient length." },
      { title: "Prepare the site", description: "Remove grass or weeds and loosen the soil underneath where the bed will go." },
      { title: "Construct the frame", description: "Cut boards to size and assemble using galvanized screws or brackets at the corners." },
      { title: "Install the frame", description: "Place the frame in your prepared location, checking that it's level." },
      { title: "Line if necessary", description: "If using treated wood or to prevent weeds, line the bottom with landscape fabric." },
      { title: "Fill with soil", description: "Fill with a mix of topsoil, compost, and other amendments appropriate for what you plan to grow." },
      { title: "Add plants or seeds", description: "Plant according to your garden plan and water thoroughly." }
    ]
  },
  {
    id: "mulch-garden-beds",
    title: "Mulching Garden Beds",
    category: "Gardening",
    service: "Landscaper",
    icon: <Leaf className="h-5 w-5" />,
    emoji: "🌱",
    steps: [
      { title: "Choose the right mulch", description: "Select organic mulch (wood chips, bark, compost, straw) or inorganic mulch (rocks, rubber) based on your garden needs." },
      { title: "Weed thoroughly", description: "Remove all weeds from the bed before applying mulch." },
      { title: "Apply proper depth", description: "Spread organic mulch 2-4 inches deep; inorganic mulch 1-2 inches deep." },
      { title: "Keep away from stems", description: "Leave a few inches of space around plant stems and tree trunks to prevent rot and pest problems." },
      { title: "Water before mulching", description: "If the soil is dry, water thoroughly before applying mulch." },
      { title: "Spread evenly", description: "Distribute the mulch evenly across the entire bed for best results." },
      { title: "Refresh annually", description: "Add a new thin layer of mulch each year as the organic mulch breaks down." }
    ]
  },
  {
    id: "compost-basics",
    title: "Starting a Compost Pile",
    category: "Gardening",
    service: "Landscaper",
    icon: <Leaf className="h-5 w-5" />,
    emoji: "♻️",
    steps: [
      { title: "Choose a location", description: "Select a level, partially shaded spot with good drainage, away from wooden structures." },
      { title: "Select a bin or system", description: "Use a commercial bin, DIY container, or simply create a pile depending on your space and needs." },
      { title: "Layer green and brown materials", description: "Alternate green (nitrogen-rich) materials like kitchen scraps and grass clippings with brown (carbon-rich) materials like dry leaves and cardboard." },
      { title: "Maintain proper moisture", description: "Keep the pile as moist as a wrung-out sponge. Water during dry periods." },
      { title: "Turn regularly", description: "Turn or mix the pile every few weeks to aerate it and speed decomposition." },
      { title: "Monitor temperature", description: "A properly working compost pile will heat up in the center—this is good!" },
      { title: "Harvest finished compost", description: "When materials are dark, crumbly, and earthy-smelling (usually 2-12 months), your compost is ready to use." }
    ]
  },
  {
    id: "lawn-edging",
    title: "Edging a Lawn",
    category: "Gardening",
    service: "Landscaper",
    icon: <Leaf className="h-5 w-5" />,
    emoji: "🌿",
    steps: [
      { title: "Mark the edge line", description: "Use a garden hose or rope to mark the desired edge line between lawn and garden beds or pathways." },
      { title: "Choose your tool", description: "Select a manual edging tool, power edger, or spade depending on the size of the job and your preference." },
      { title: "Cut the edge", description: "Cut straight down 2-3 inches along your marked line, creating a clean separation between grass and other areas." },
      { title: "Remove excess grass", description: "Pull away any turf that extends beyond your cut line." },
      { title: "Install edging material (optional)", description: "For a more permanent solution, install plastic, metal, stone, or brick edging along the cut line." },
      { title: "Add mulch or gravel", description: "Fill garden beds or pathways with appropriate material up to the edge line." },
      { title: "Maintain regularly", description: "Trim edges every 1-2 weeks during growing season to maintain a clean look." }
    ]
  },
  {
    id: "lawn-aeration",
    title: "Aerating Your Lawn",
    category: "Gardening",
    service: "Landscaper",
    icon: <Leaf className="h-5 w-5" />,
    emoji: "🌿",
    steps: [
      { title: "Determine if needed", description: "Check if your lawn has compacted soil, standing water, or heavy thatch (more than 1/2 inch)." },
      { title: "Choose the right time", description: "Aerate during your grass type's growing season: fall for cool-season grasses, late spring for warm-season grasses." },
      { title: "Water the lawn", description: "Water the lawn 1-2 days before aerating to soften the soil." },
      { title: "Mark irrigation and utilities", description: "Mark sprinkler heads and underground utility lines to avoid damage." },
      { title: "Select an aerator", description: "Rent or buy a core aerator (preferred) or spike aerator based on your lawn size." },
      { title: "Aerate the lawn", description: "Run the aerator over the lawn, making multiple passes in different directions on heavily compacted areas." },
      { title: "Leave soil cores", description: "Allow the extracted soil cores to decompose naturally on the lawn." },
      { title: "Apply post-aeration treatment", description: "Consider overseeding, topdressing with compost, or fertilizing after aeration for best results." }
    ]
  },
  {
    id: "planting-bulbs",
    title: "Planting Flower Bulbs",
    category: "Gardening",
    service: "Landscaper",
    icon: <Leaf className="h-5 w-5" />,
    emoji: "🌷",
    steps: [
      { title: "Choose the right time", description: "Plant spring-flowering bulbs in fall and summer-flowering bulbs in spring after the last frost." },
      { title: "Select a suitable location", description: "Most bulbs prefer well-draining soil and full to partial sun. Check specific requirements for your bulb types." },
      { title: "Prepare the soil", description: "Dig and loosen the soil to a depth of about 8 inches, mixing in compost or organic matter." },
      { title: "Determine planting depth", description: "Generally, plant bulbs at a depth of 2-3 times their height, with the pointed end facing up." },
      { title: "Space appropriately", description: "Follow spacing recommendations for your specific bulbs, typically 3-6 inches apart." },
      { title: "Plant in groups", description: "For natural-looking displays, plant bulbs in irregular groups rather than single rows." },
      { title: "Cover and water", description: "Backfill with soil, gently firm it down, and water thoroughly." },
      { title: "Apply mulch", description: "Add 2-3 inches of mulch to regulate soil temperature and conserve moisture." }
    ]
  }
];

// Cleaning guides (10+ entries)
const cleaningGuides: StepByStepGuide[] = [
  {
    id: "clean-carpet-stain",
    title: "Removing Carpet Stains",
    category: "Cleaning",
    service: "Cleaning",
    icon: <Trash2 className="h-5 w-5" />,
    emoji: "🧹",
    steps: [
      { title: "Blot fresh stains immediately", description: "Use a clean cloth to blot (not rub) the stain, working from outside in." },
      { title: "Apply cleaning solution", description: "Make a solution with 1/4 cup vinegar, 1 tbsp dish soap, and 1 cup warm water." },
      { title: "Test in hidden area", description: "Apply solution to an inconspicuous area first to ensure it doesn't damage the carpet." },
      { title: "Treat the stain", description: "Apply solution to the stain, let sit for 5-10 minutes, then blot with a clean cloth." },
      { title: "Rinse and dry", description: "Rinse with clean water, blot dry, then place a stack of paper towels with weight on top to absorb moisture." }
    ]
  },
  {
    id: "clean-oven",
    title: "Deep Cleaning an Oven",
    category: "Cleaning",
    service: "Cleaning",
    icon: <Trash2 className="h-5 w-5" />,
    emoji: "🧽",
    steps: [
      { title: "Prepare the oven", description: "Remove racks, thermometer, and any loose debris. Turn off the oven and ensure it's completely cool." },
      { title: "Make cleaning paste", description: "Mix 1/2 cup baking soda with 2-3 tablespoons of water to form a spreadable paste." },
      { title: "Apply paste", description: "Spread the paste throughout the oven interior, avoiding heating elements and the oven door if it has a self-cleaning feature." },
      { title: "Let it sit", description: "Leave the paste for 6-12 hours or overnight." },
      { title: "Clean oven racks", description: "While waiting, soak racks in hot water with dish soap or in a bathtub with baking soda and vinegar." },
      { title: "Wipe out paste", description: "Use a damp cloth to wipe out the dried paste. Use a plastic scraper for stubborn spots." },
      { title: "Spray with vinegar", description: "Spray white vinegar on any remaining paste to cause a reaction that helps with removal." },
      { title: "Final wipe down", description: "Wipe the entire oven with a clean, damp cloth until all residue is gone." },
      { title: "Clean racks and replace", description: "Scrub racks clean, dry completely, and return to the oven." }
    ]
  },
  {
    id: "clean-hardwood-floors",
    title: "Cleaning Hardwood Floors",
    category: "Cleaning",
    service: "Cleaning",
    icon: <Trash2 className="h-5 w-5" />,
    emoji: "🪵",
    steps: [
      { title: "Dust and sweep", description: "Remove loose dirt and dust with a microfiber dust mop or vacuum with a floor-brush attachment." },
      { title: "Prepare cleaning solution", description: "Mix a mild solution of pH-neutral wood floor cleaner according to product instructions." },
      { title: "Damp mop only", description: "Use a well-wrung microfiber mop that feels only slightly damp to the touch." },
      { title: "Work in sections", description: "Clean in small sections, following the wood grain." },
      { title: "Avoid excess water", description: "Never saturate wood floors with water or cleaning solution." },
      { title: "Dry immediately", description: "Wipe dry with a clean, dry towel if there's any excess moisture." },
      { title: "Maintain regularly", description: "Dust daily and damp-clean weekly to maintain hardwood floors." }
    ]
  },
  {
    id: "clean-bathroom-tiles",
    title: "Cleaning Bathroom Tiles and Grout",
    category: "Cleaning",
    service: "Cleaning",
    icon: <Trash2 className="h-5 w-5" />,
    emoji: "🛁",
    steps: [
      { title: "Ventilate the area", description: "Open windows or turn on fans to ensure good air circulation." },
      { title: "Prepare grout cleaner", description: "Make a paste with baking soda and water or use a commercial grout cleaner." },
      { title: "Apply to grout lines", description: "Spread the paste along grout lines using an old toothbrush or grout brush." },
      { title: "Spray with vinegar (for baking soda method)", description: "If using baking soda paste, spray white vinegar over it to create a foaming reaction." },
      { title: "Scrub grout lines", description: "Once the cleaner has set for 5-10 minutes, scrub grout lines with a brush." },
      { title: "Clean tile surfaces", description: "Use an all-purpose bathroom cleaner or a vinegar solution to clean the tile surfaces." },
      { title: "Rinse thoroughly", description: "Rinse all surfaces with clean water to remove cleaning residue." },
      { title: "Dry completely", description: "Use a clean towel to dry tiles and grout to prevent new mold growth." },
      { title: "Apply grout sealer (optional)", description: "For long-term protection, apply a grout sealer once grout is completely dry." }
    ]
  },
  {
    id: "clean-windows",
    title: "Streak-Free Window Cleaning",
    category: "Cleaning",
    service: "Cleaning",
    icon: <Trash2 className="h-5 w-5" />,
    emoji: "🪟",
    steps: [
      { title: "Choose the right day", description: "Clean windows on a cloudy day to prevent cleaner from drying too quickly and causing streaks." },
      { title: "Remove dust", description: "Dust window frames and sills with a microfiber cloth or brush." },
      { title: "Prepare cleaning solution", description: "Mix equal parts white vinegar and warm water, or use a commercial window cleaner." },
      { title: "Apply solution", description: "Spray solution onto the window or onto a microfiber cloth." },
      { title: "Wipe in pattern", description: "Clean using a Z-pattern or top-to-bottom method, ensuring you cover the entire surface." },
      { title: "Use newspaper or microfiber", description: "For streak-free results, buff dry with crumpled newspaper or a clean microfiber cloth." },
      { title: "Clean screens", description: "Remove screens, vacuum with a brush attachment, then wash with soapy water and rinse." },
      { title: "Don't forget exterior", description: "Clean outside windows using the same technique, using a ladder safely if needed." }
    ]
  },
  {
    id: "clean-refrigerator",
    title: "Deep Cleaning a Refrigerator",
    category: "Cleaning",
    service: "Cleaning",
    icon: <Trash2 className="h-5 w-5" />,
    emoji: "❄️",
    steps: [
      { title: "Empty the refrigerator", description: "Remove all food items. Discard expired products and place others in a cooler." },
      { title: "Remove shelves and drawers", description: "Take out all removable parts for separate cleaning." },
      { title: "Prepare cleaning solution", description: "Mix 2 tablespoons baking soda in 1 quart warm water for a food-safe cleaner." },
      { title: "Clean interior surfaces", description: "Wipe down all interior surfaces with the baking soda solution, including walls, ceiling, and floor." },
      { title: "Scrub problem areas", description: "For sticky spots, let the solution sit for a few minutes before scrubbing." },
      { title: "Clean shelves and drawers", description: "Wash removable parts in the sink with warm, soapy water. Rinse and dry completely." },
      { title: "Wipe door seals", description: "Clean the rubber door gaskets thoroughly, as they often harbor mold and crumbs." },
      { title: "Clean exterior", description: "Wipe the outside with appropriate cleaner for your refrigerator's material (stainless steel, etc.)." },
      { title: "Vacuum condenser coils", description: "Pull the refrigerator out and vacuum the coils on the back or underneath to improve efficiency." },
      { title: "Replace items", description: "Return the clean shelves and drawers, then organize food items as you replace them." },
      { title: "Place baking soda", description: "Put an open box of baking soda inside to absorb odors." }
    ]
  },
  {
    id: "clean-microwave",
    title: "Cleaning a Microwave",
    category: "Cleaning",
    service: "Cleaning",
    icon: <Trash2 className="h-5 w-5" />,
    emoji: "🍽️",
    steps: [
      { title: "Prepare steam cleaning solution", description: "Mix 1 cup water with 1 tablespoon white vinegar in a microwave-safe bowl. Add a wooden toothpick to prevent superheating." },
      { title: "Microwave the solution", description: "Heat the solution for 5 minutes to create steam that loosens dried-on food." },
      { title: "Let it sit", description: "Keep the microwave door closed for an additional 2-3 minutes to let the steam continue working." },
      { title: "Remove the bowl", description: "Carefully take out the hot bowl using oven mitts." },
      { title: "Wipe interior surfaces", description: "Use a damp microfiber cloth to wipe down all interior surfaces, including the door." },
      { title: "Clean stubborn spots", description: "For tough residue, dip the cloth in the vinegar solution and scrub gently." },
      { title: "Remove and clean turntable", description: "Wash the glass turntable in warm, soapy water or in the dishwasher if it's dishwasher-safe." },
      { title: "Clean the exterior", description: "Wipe the outside with appropriate cleaner for your microwave's finish." },
      { title: "Reassemble and deodorize", description: "Return the turntable and run the microwave with a bowl of water and lemon slices for 1 minute to freshen the smell." }
    ]
  },
  {
    id: "clean-washing-machine",
    title: "Cleaning a Washing Machine",
    category: "Cleaning",
    service: "Cleaning",
    icon: <Trash2 className="h-5 w-5" />,
    emoji: "🧼",
    steps: [
      { title: "Clean the dispenser", description: "Remove the detergent dispenser (if possible) and soak in warm, soapy water. Scrub with an old toothbrush." },
      { title: "Wipe the gasket/seal", description: "For front-loaders, clean the rubber door gasket thoroughly, pulling back folds to remove mold and debris." },
      { title: "Run a hot cycle with vinegar", description: "Fill the empty machine with hot water at the largest load setting, add 2 cups of white vinegar, and run a complete cycle." },
      { title: "Run a second hot cycle with baking soda", description: "Add 1/2 cup baking soda to the drum and run another hot water cycle." },
      { title: "Clean the exterior", description: "Wipe the outside surfaces with a damp cloth and mild cleanser." },
      { title: "Clean the filter", description: "If your machine has an accessible filter, clean it according to the manufacturer's instructions." },
      { title: "Leave the door open", description: "Between uses, leave the door ajar to allow air circulation and prevent mold growth." },
      { title: "Regular maintenance", description: "Run this cleaning process monthly to prevent odors and maintain washing efficiency." }
    ]
  },
  {
    id: "clean-mattress",
    title: "Deep Cleaning a Mattress",
    category: "Cleaning",
    service: "Cleaning",
    icon: <Trash2 className="h-5 w-5" />,
    emoji: "🛏️",
    steps: [
      { title: "Strip the bed", description: "Remove all bedding and wash according to care instructions." },
      { title: "Vacuum thoroughly", description: "Use the upholstery attachment to vacuum the entire mattress surface, including sides and seams." },
      { title: "Spot clean stains", description: "Mix a solution of mild dish soap and water. Apply to stains with a clean cloth, rubbing gently in a circular motion." },
      { title: "Deodorize with baking soda", description: "Sprinkle a generous amount of baking soda over the entire mattress surface." },
      { title: "Add essential oils (optional)", description: "Mix a few drops of lavender or another essential oil with the baking soda for a fresh scent." },
      { title: "Let sit", description: "Allow the baking soda to sit for at least 1 hour, preferably several hours or all day." },
      { title: "Vacuum again", description: "Thoroughly vacuum up all the baking soda." },
      { title: "Air out the mattress", description: "If possible, move the mattress into direct sunlight for a few hours to kill remaining bacteria and remove moisture." },
      { title: "Use a mattress protector", description: "Once clean, cover your mattress with a washable mattress protector to prevent future stains." },
      { title: "Remake the bed", description: "Put on clean bedding and enjoy your fresh mattress." }
    ]
  },
  {
    id: "clean-dishwasher",
    title: "Cleaning a Dishwasher",
    category: "Cleaning",
    service: "Cleaning",
    icon: <Trash2 className="h-5 w-5" />,
    emoji: "🍽️",
    steps: [
      { title: "Remove items and check spray arms", description: "Empty the dishwasher and check that spray arms rotate freely and holes are clear of debris." },
      { title: "Clean the filter", description: "Remove the filter at the bottom, rinse under hot water, and scrub with a soft brush if needed." },
      { title: "Wipe door edges and gasket", description: "Clean the rubber gasket and door edges with a damp cloth to remove food particles and buildup." },
      { title: "Clean utensil holder", description: "Remove and wash the utensil basket with warm, soapy water." },
      { title: "Remove and clean spray arms", description: "If removable, take out the spray arms and clean holes with a toothpick or small wire." },
      { title: "Run vinegar cycle", description: "Place a cup of white vinegar on the top rack and run a hot water cycle (empty otherwise)." },
      { title: "Run baking soda cycle", description: "Sprinkle a cup of baking soda on the bottom and run a short hot water cycle." },
      { title: "Wipe exterior", description: "Clean the outside with appropriate cleaner for your dishwasher's finish." },
      { title: "Maintain regularly", description: "Clean the filter weekly and run a vinegar cycle monthly to prevent buildup and odors." }
    ]
  }
];

// Chef guides (10+ entries)
const chefGuides: StepByStepGuide[] = [
  {
    id: "knife-skills",
    title: "Basic Knife Skills",
    category: "Cooking",
    service: "Chef",
    icon: <ChefHat className="h-5 w-5" />,
    emoji: "🔪",
    steps: [
      { title: "Choose the right knife", description: "Chef's knife for most tasks, paring knife for small items, serrated for bread." },
      { title: "Grip properly", description: "Pinch the blade between thumb and forefinger, wrap remaining fingers around handle." },
      { title: "Stabilize cutting board", description: "Place a damp towel under the board to prevent slipping." },
      { title: "Use the claw technique", description: "Curl fingers of non-knife hand into a claw shape to hold food while protecting fingertips." },
      { title: "Practice the rocking motion", description: "Keep the tip of the knife on the board and rock the blade forward for smooth, efficient cuts." }
    ]
  },
  {
    id: "homemade-pasta",
    title: "Making Homemade Pasta",
    category: "Cooking",
    service: "Chef",
    icon: <ChefHat className="h-5 w-5" />,
    emoji: "🍝",
    steps: [
      { title: "Prepare the dough", description: "Mix 2 cups flour with 3 eggs, 1 tbsp olive oil, and a pinch of salt. Create a well in the flour and add wet ingredients gradually." },
      { title: "Knead thoroughly", description: "Knead the dough for 8-10 minutes until smooth and elastic." },
      { title: "Rest the dough", description: "Wrap in plastic and let rest at room temperature for at least 30 minutes." },
      { title: "Roll out dough", description: "Divide into portions and roll each portion through a pasta machine, gradually reducing thickness." },
      { title: "Cut into desired shapes", description: "Use pasta machine attachments or hand-cut for fettuccine, linguine, etc." },
      { title: "Dry briefly", description: "Let cut pasta dry for 15-30 minutes before cooking." },
      { title: "Cook in boiling water", description: "Fresh pasta cooks much faster than dried—typically 2-3 minutes in salted boiling water." }
    ]
  },
  {
    id: "perfect-steak",
    title: "Cooking the Perfect Steak",
    category: "Cooking",
    service: "Chef",
    icon: <ChefHat className="h-5 w-5" />,
    emoji: "🥩",
    steps: [
      { title: "Choose quality meat", description: "Select well-marbled steaks at least 1-inch thick. Popular cuts include ribeye, strip, and tenderloin." },
      { title: "Bring to room temperature", description: "Remove steak from refrigerator 30-60 minutes before cooking." },
      { title: "Pat dry and season", description: "Pat the steak dry with paper towels, then season generously with salt and pepper." },
      { title: "Preheat cooking surface", description: "Get your pan or grill extremely hot before adding the steak." },
      { title: "Sear both sides", description: "Cook for 3-5 minutes per side for medium-rare, depending on thickness." },
      { title: "Use a meat thermometer", description: "For precision: 125°F for rare, 135°F for medium-rare, 145°F for medium." },
      { title: "Rest before cutting", description: "Let the steak rest for 5-10 minutes before slicing to retain juices." },
      { title: "Slice against the grain", description: "Cut perpendicular to the muscle fibers for maximum tenderness." }
    ]
  },
  {
    id: "bake-bread",
    title: "Baking Basic Bread",
    category: "Cooking",
    service: "Chef",
    icon: <ChefHat className="h-5 w-5" />,
    emoji: "🍞",
    steps: [
      { title: "Activate yeast", description: "Dissolve 2 1/4 tsp active dry yeast and 1 tsp sugar in 1/4 cup warm water (105-115°F). Let stand until foamy, about 5-10 minutes." },
      { title: "Mix ingredients", description: "Combine 3 cups flour, 1 tsp salt, 2 tbsp oil, the yeast mixture, and 1 cup warm water in a large bowl." },
      { title: "Knead the dough", description: "Turn onto a floured surface and knead for 8-10 minutes until smooth and elastic." },
      { title: "First rise", description: "Place in a greased bowl, cover, and let rise in a warm place until doubled, about 1 hour." },
      { title: "Shape the loaf", description: "Punch down the dough, shape into a loaf, and place in a greased 9x5-inch loaf pan." },
      { title: "Second rise", description: "Cover and let rise until doubled again, about 30-45 minutes." },
      { title: "Bake", description: "Bake at 375°F for 30-35 minutes until golden brown and hollow-sounding when tapped." },
      { title: "Cool properly", description: "Remove from pan and cool completely on a wire rack before slicing." }
    ]
  },
  {
    id: "roast-chicken",
    title: "Roasting a Perfect Chicken",
    category: "Cooking",
    service: "Chef",
    icon: <ChefHat className="h-5 w-5" />,
    emoji: "🍗",
    steps: [
      { title: "Preheat oven", description: "Set oven to 425°F (220°C)." },
      { title: "Prepare the chicken", description: "Remove giblets, rinse the cavity, and pat the chicken dry inside and out with paper towels." },
      { title: "Season cavity", description: "Season inside the cavity with salt and pepper, and add aromatics like herbs, lemon, and garlic." },
      { title: "Truss if desired", description: "Tie legs together with kitchen twine and tuck wing tips under body for even cooking." },
      { title: "Season exterior", description: "Rub skin with butter or oil, then season generously with salt and pepper." },
      { title: "Place in roasting pan", description: "Set chicken breast-side up on a rack in a roasting pan. Add vegetables around the chicken if desired." },
      { title: "Roast", description: "Roast for 15 minutes at 425°F, then reduce temperature to 375°F and cook until internal temperature reaches 165°F (about 1 hour for a 3-4 pound chicken)." },
      { title: "Rest before carving", description: "Let the chicken rest for 15-20 minutes before carving to allow juices to redistribute." },
      { title: "Make gravy (optional)", description: "Use the pan drippings to make gravy while the chicken rests." }
    ]
  },
  {
    id: "make-risotto",
    title: "Making Perfect Risotto",
    category: "Cooking",
    service: "Chef",
    icon: <ChefHat className="h-5 w-5" />,
    emoji: "🍚",
    steps: [
      { title: "Prepare broth", description: "Heat 6 cups of broth in a saucepan and keep warm over low heat." },
      { title: "Sauté aromatics", description: "In a large, heavy-bottomed pan, sauté 1 finely chopped onion in 2 tbsp butter and 1 tbsp oil until translucent." },
      { title: "Toast the rice", description: "Add 1 1/2 cups Arborio rice and stir to coat with oil. Toast for 2-3 minutes until edges become translucent." },
      { title: "Add wine", description: "Pour in 1/2 cup white wine and stir until absorbed." },
      { title: "Add broth gradually", description: "Add warm broth one ladle at a time, stirring constantly until each addition is absorbed before adding more." },
      { title: "Test for doneness", description: "After about 18-20 minutes, test rice. It should be al dente (tender but with slight resistance)." },
      { title: "Finish with butter and cheese", description: "Remove from heat and stir in 2 tbsp butter and 1/2 cup grated Parmesan cheese." },
      { title: "Rest briefly", description: "Cover and let stand for 2 minutes before serving." },
      { title: "Serve immediately", description: "Risotto should be creamy and slightly flowing, not stiff. Serve right away." }
    ]
  },
  {
    id: "caramelize-onions",
    title: "Caramelizing Onions",
    category: "Cooking",
    service: "Chef",
    icon: <ChefHat className="h-5 w-5" />,
    emoji: "🧅",
    steps: [
      { title: "Slice onions", description: "Slice 3-4 large onions thinly and uniformly." },
      { title: "Choose the right pan", description: "Use a wide, heavy-bottomed pan or skillet that allows onions to make contact with the surface." },
      { title: "Heat oil and butter", description: "Heat 2 tbsp oil and 1 tbsp butter over medium-low heat." },
      { title: "Add onions", description: "Add sliced onions and coat thoroughly with the oil-butter mixture." },
      { title: "Season with salt", description: "Sprinkle with 1/2 tsp salt to help draw out moisture." },
      { title: "Cook slowly", description: "Cook over medium-low heat, stirring occasionally to prevent burning. This is a slow process that takes 40-60 minutes." },
      { title: "Scrape fond", description: "As brown bits form on the pan bottom, scrape them up and incorporate into the onions." },
      { title: "Add liquid if needed", description: "If onions start to stick or burn, add a tablespoon of water or broth and scrape pan." },
      { title: "Cook until deep brown", description: "Continue until onions are deeply browned, sweet, and jammy." },
      { title: "Deglaze (optional)", description: "For extra flavor, deglaze the pan with wine or broth once onions are caramelized." }
    ]
  },
  {
    id: "cook-perfect-rice",
    title: "Cooking Perfect Rice",
    category: "Cooking",
    service: "Chef",
    icon: <ChefHat className="h-5 w-5" />,
    emoji: "🍚",
    steps: [
      { title: "Measure correctly", description: "Use the standard 1:2 ratio of rice to water for most varieties (adjust according to specific rice type)." },
      { title: "Rinse the rice", description: "Rinse rice in cold water until water runs clear to remove excess starch." },
      { title: "Soak (optional)", description: "For firmer grains, soak rice for 15-30 minutes, then drain before cooking." },
      { title: "Use the right pot", description: "Choose a medium saucepan with a tight-fitting lid." },
      { title: "Bring to a boil", description: "Combine rice, water, and a pinch of salt. Bring to a boil over high heat." },
      { title: "Reduce heat and cover", description: "Once boiling, reduce heat to low and cover with a tight-fitting lid." },
      { title: "Avoid peeking", description: "Do not remove the lid during cooking as this releases steam and affects cooking time." },
      { title: "Check timing", description: "Cook white rice for about 18 minutes, brown rice for about 45 minutes." },
      { title: "Rest after cooking", description: "Remove from heat and let stand, covered, for 5-10 minutes." },
      { title: "Fluff with fork", description: "Gently fluff the rice with a fork before serving to separate the grains." }
    ]
  },
  {
    id: "make-vinaigrette",
    title: "Making Perfect Vinaigrette",
    category: "Cooking",
    service: "Chef",
    icon: <ChefHat className="h-5 w-5" />,
    emoji: "🥗",
    steps: [
      { title: "Choose your acid", description: "Select vinegar (red wine, balsamic, apple cider) or citrus juice (lemon, lime, orange)." },
      { title: "Pick your oil", description: "Extra virgin olive oil is classic, but you can also use neutral oils like grapeseed or avocado." },
      { title: "Use the right ratio", description: "The classic ratio is 3 parts oil to 1 part acid, but adjust to taste." },
      { title: "Add emulsifier (optional)", description: "A small amount of Dijon mustard, honey, or egg yolk helps bind the oil and vinegar." },
      { title: "Season properly", description: "Always include salt and freshly ground black pepper. Add minced shallots or garlic for more flavor." },
      { title: "Mix properly", description: "In a bowl, whisk together acid, seasonings, and emulsifier first, then slowly drizzle in oil while whisking continuously." },
      { title: "Alternative mixing method", description: "Combine all ingredients in a jar with a tight lid and shake vigorously until emulsified." },
      { title: "Taste and adjust", description: "Dip a lettuce leaf into the dressing to taste, then adjust seasonings as needed." },
      { title: "Store properly", description: "Keep in a sealed container in the refrigerator for up to a week. Bring to room temperature and shake well before using." }
    ]
  },
  {
    id: "blanch-vegetables",
    title: "Blanching Vegetables",
    category: "Cooking",
    service: "Chef",
    icon: <ChefHat className="h-5 w-5" />,
    emoji: "🥦",
    steps: [
      { title: "Prepare ice bath", description: "Fill a large bowl with ice water and set aside." },
      { title: "Bring water to boil", description: "Fill a large pot with water, add 1 tablespoon of salt per quart, and bring to a rolling boil." },
      { title: "Prepare vegetables", description: "Clean vegetables and cut into uniform pieces for even cooking." },
      { title: "Blanch in batches", description: "Add vegetables to boiling water in small batches to maintain the water temperature." },
      { title: "Time carefully", description: "Cook just until vegetables are crisp-tender and bright in color (30 seconds to 5 minutes, depending on the vegetable)." },
      { title: "Shock in ice water", description: "Immediately transfer blanched vegetables to the ice bath to stop the cooking process." },
      { title: "Drain thoroughly", description: "Once vegetables are completely cooled, drain well and pat dry if necessary." },
      { title: "Use or store", description: "Use immediately or store refrigerated in an airtight container for 3-5 days." }
    ]
  }
];

// Stylist guides (10+ entries)
const stylistGuides: StepByStepGuide[] = [
  {
    id: "trim-hair",
    title: "Trimming Your Own Hair",
    category: "Personal Care",
    service: "Stylist",
    icon: <Scissors className="h-5 w-5" />,
    emoji: "💇",
    steps: [
      { title: "Prepare your tools", description: "Get sharp scissors designed for hair cutting, clips for sectioning, and a comb." },
      { title: "Start with clean, dry hair", description: "Hair shrinks when dry, so cutting dry hair gives you a more accurate length." },
      { title: "Section your hair", description: "Divide hair into manageable sections using clips. Start with bottom layers." },
      { title: "Cut with points up", description: "Hold scissors with points facing up and make small, vertical snips for a softer look." },
      { title: "Check for evenness", description: "Regularly check both sides to ensure even length and adjust as needed." }
    ]
  },
  {
    id: "style-bob-haircut",
    title: "Styling a Bob Haircut",
    category: "Personal Care",
    service: "Stylist",
    icon: <Scissors className="h-5 w-5" />,
    emoji: "💇‍♀️",
    steps: [
      { title: "Wash with volumizing shampoo", description: "Use a volumizing shampoo and lightweight conditioner to add body." },
      { title: "Apply styling product", description: "Work a small amount of mousse or volumizing spray through damp hair, focusing on the roots." },
      { title: "Blow dry with round brush", description: "For a sleek look, use a round brush to dry hair section by section, pulling slightly at the roots for volume." },
      { title: "Create inward curl", description: "As you dry each section, roll the brush under at the ends to create that classic bob curve inward." },
      { title: "Define with flat iron", description: "For a sleeker finish, run a flat iron over dry hair, curving slightly inward at the ends." },
      { title: "Add texture if desired", description: "For a more modern, textured bob, use a small amount of texturizing paste on the ends." },
      { title: "Finish with light hairspray", description: "Set the style with a light-hold hairspray, sprayed from about 12 inches away." }
    ]
  },
  {
    id: "mens-basic-haircut",
    title: "Basic Men's Haircut",
    category: "Personal Care",
    service: "Stylist",
    icon: <Scissors className="h-5 w-5" />,
    emoji: "💇‍♂️",
    steps: [
      { title: "Prepare tools", description: "Gather clippers with various guard sizes, scissors, comb, and spray bottle." },
      { title: "Start with clean, slightly damp hair", description: "Wash hair and towel dry, or use spray bottle to dampen dry hair." },
      { title: "Determine desired length", description: "Select appropriate clipper guard size based on desired length (higher number = longer hair)." },
      { title: "Cut the sides", description: "Starting at the bottom of the sides, move clippers upward, gradually blending into top section." },
      { title: "Blend between sections", description: "Use a middle-sized guard to blend between the shorter sides and longer top." },
      { title: "Cut the top with scissors", description: "Use a comb to lift sections of hair on top and cut with scissors to desired length." },
      { title: "Check for evenness", description: "Comb through hair in different directions to check for uneven spots and trim as needed." },
      { title: "Clean up neckline", description: "Remove guard and use trimmers to create a clean line around ears and neckline." },
      { title: "Style as desired", description: "Apply styling product and shape hair according to preference." }
    ]
  },
  {
    id: "natural-makeup",
    title: "Natural Everyday Makeup",
    category: "Personal Care",
    service: "Stylist",
    icon: <Scissors className="h-5 w-5" />,
    emoji: "💄",
    steps: [
      { title: "Prepare your skin", description: "Cleanse face and apply moisturizer. Allow it to absorb before proceeding." },
      { title: "Apply primer", description: "Use a small amount of primer on T-zone and areas with larger pores." },
      { title: "Even out skin tone", description: "Apply tinted moisturizer or light foundation only where needed, blending with fingers or sponge." },
      { title: "Conceal imperfections", description: "Use concealer on dark circles and blemishes, patting gently to blend." },
      { title: "Set with powder", description: "Lightly dust translucent powder on T-zone to reduce shine." },
      { title: "Add dimension with bronzer", description: "Apply bronzer in the shape of a '3' on each side of face (forehead, cheekbone, jawline)." },
      { title: "Apply blush", description: "Smile and apply a natural-colored blush to the apples of cheeks, blending outward." },
      { title: "Define eyebrows", description: "Fill in sparse areas of brows with light strokes of pencil or powder, then brush through with a spoolie." },
      { title: "Enhance eyes", description: "Apply neutral eyeshadow across lid, add definition to crease if desired. Curl lashes and apply mascara." },
      { title: "Finish with lips", description: "Apply tinted lip balm or a neutral lipstick for a natural finish." }
    ]
  },
  {
    id: "simple-updo",
    title: "Creating a Simple Updo",
    category: "Personal Care",
    service: "Stylist",
    icon: <Scissors className="h-5 w-5" />,
    emoji: "👱‍♀️",
    steps: [
      { title: "Prepare your hair", description: "Start with day-old hair (not freshly washed) for better grip. Apply dry shampoo if needed for texture." },
      { title: "Section the hair", description: "Divide hair into top and bottom sections, clipping the top section out of the way." },
      { title: "Create a ponytail", description: "Gather the bottom section into a ponytail at the desired height (middle of the head works well for most updos)." },
      { title: "Twist the ponytail", description: "Twist the ponytail and wrap it around its base to form a bun, securing with bobby pins." },
      { title: "Release top section", description: "Let down the top section and gently tease at the crown for volume if desired." },
      { title: "Wrap top section", description: "Loosely gather the top section and wrap it over the bun, securing with bobby pins." },
      { title: "Create texture", description: "Gently pull small pieces of hair to loosen slightly for a softer look." },
      { title: "Secure flyaways", description: "Use hairspray and additional bobby pins to secure any loose strands." },
      { title: "Add accessories (optional)", description: "Incorporate decorative pins, flowers, or a headband to enhance the updo." }
    ]
  },
  {
    id: "beard-trimming",
    title: "Trimming and Shaping a Beard",
    category: "Personal Care",
    service: "Stylist",
    icon: <Scissors className="h-5 w-5" />,
    emoji: "🧔",
    steps: [
      { title: "Prepare your beard", description: "Wash and thoroughly dry your beard before trimming." },
      { title: "Comb it out", description: "Use a beard comb to remove tangles and align the hairs in their natural direction of growth." },
      { title: "Define your neckline", description: "Imagine a curved line connecting the bottom of each ear and passing through a point about an inch above your Adam's apple. Shave everything below this line." },
      { title: "Define cheek line", description: "Decide on a natural cheek line and carefully shave above it for a clean look." },
      { title: "Trim to desired length", description: "Use a beard trimmer with a guard set to your preferred length. Start with a longer setting—you can always go shorter." },
      { title: "Taper if desired", description: "For a more natural look, use a slightly shorter guard setting on the bottom portion of the beard." },
      { title: "Detail around lips", description: "Trim the mustache so it doesn't cover your lips, following the natural curve of your mouth." },
      { title: "Clean up stray hairs", description: "Use scissors to snip any notably longer hairs that the trimmer missed." },
      { title: "Apply beard oil", description: "Rub a few drops of beard oil between palms and work through the beard to condition and style." }
    ]
  },
  {
    id: "braid-hair",
    title: "Creating a Basic Braid",
    category: "Personal Care",
    service: "Stylist",
    icon: <Scissors className="h-5 w-5" />,
    emoji: "👩‍🦰",
    steps: [
      { title: "Prepare your hair", description: "Brush thoroughly to remove tangles. For easier braiding, apply a texturizing spray or dry shampoo." },
      { title: "Section the hair", description: "For a basic three-strand braid, divide your hair into three equal sections at the nape of the neck or wherever you want the braid to start." },
      { title: "Begin braiding", description: "Cross the right section over the middle section, making it the new middle. Then cross the left section over the middle, making it the new middle." },
      { title: "Continue the pattern", description: "Keep alternating sides, always crossing the outside section over the middle section." },
      { title: "Maintain tension", description: "Keep the braid tight by applying gentle tension as you work." },
      { title: "Secure the end", description: "When you reach the end of your hair, secure the braid with an elastic band." },
      { title: "Create texture (optional)", description: "For a fuller look, gently pull the braid outward slightly, loosening it." },
      { title: "Set with hairspray", description: "Lightly spray the braid to tame flyaways and help it last longer." }
    ]
  },
  {
    id: "smoky-eye",
    title: "Creating a Classic Smoky Eye",
    category: "Personal Care",
    service: "Stylist",
    icon: <Scissors className="h-5 w-5" />,
    emoji: "👁️",
    steps: [
      { title: "Apply eye primer", description: "Cover the entire eyelid with primer to help eyeshadow stay in place and prevent creasing." },
      { title: "Create a base", description: "Apply a neutral, matte shadow just lighter than your skin tone over the entire lid up to the brow bone." },
      { title: "Define the crease", description: "Use a medium-toned shadow (taupe, brown, or gray) in the crease, blending in a windshield wiper motion." },
      { title: "Darken the lid", description: "Apply a darker shadow (deep brown, charcoal, or black) on the outer third of the eyelid, blending inward." },
      { title: "Blend thoroughly", description: "Use a clean blending brush to soften any harsh lines between colors." },
      { title: "Line the eyes", description: "Apply eyeliner along the upper lash line, smudging slightly for a softer look. Optionally line the lower lash line as well." },
      { title: "Highlight inner corners", description: "Add a light, shimmery shadow to the inner corners of the eyes to brighten." },
      { title: "Apply mascara", description: "Curl lashes and apply 2-3 coats of mascara to upper and lower lashes." },
      { title: "Clean up fallout", description: "Use a cotton swab with makeup remover to clean up any shadow that has fallen under the eyes." }
    ]
  },
  {
    id: "hair-coloring-basics",
    title: "Basic At-Home Hair Coloring",
    category: "Personal Care",
    service: "Stylist",
    icon: <Scissors className="h-5 w-5" />,
    emoji: "🎨",
    steps: [
      { title: "Choose the right color", description: "Select a shade close to your natural color for best results, especially if you're a beginner." },
      { title: "Prep your space", description: "Wear old clothes, cover surfaces, and have towels ready. Apply petroleum jelly along your hairline to prevent skin staining." },
      { title: "Prepare your hair", description: "Don't wash hair for 1-2 days before coloring. Brush thoroughly to remove tangles." },
      { title: "Mix the color", description: "Following package instructions, mix the developer and color in a non-metal bowl if not using an applicator bottle." },
      { title: "Section your hair", description: "Divide dry hair into four sections: two in front, two in back. Secure with clips." },
      { title: "Apply the color", description: "Starting at the roots, apply color in small sections, working through each of the four main sections." },
      { title: "Ensure full coverage", description: "Make sure all hair is saturated, paying special attention to the back which is easy to miss." },
      { title: "Time properly", description: "Set a timer according to package directions. Don't leave color on longer than recommended." },
      { title: "Rinse thoroughly", description: "Rinse with lukewarm water until water runs clear. Apply the included conditioner if provided." },
      { title: "Maintain your color", description: "Use color-safe shampoo and conditioner. Wait at least 48 hours before washing newly colored hair." }
    ]
  },
  {
    id: "manicure-basics",
    title: "Basic At-Home Manicure",
    category: "Personal Care",
    service: "Stylist",
    icon: <Scissors className="h-5 w-5" />,
    emoji: "💅",
    steps: [
      { title: "Remove old polish", description: "Use acetone-free remover when possible to avoid drying nails. Press soaked cotton ball on nail for a few seconds before wiping." },
      { title: "Shape your nails", description: "File nails in one direction (not back and forth) to desired shape: round, square, oval, etc." },
      { title: "Soak your hands", description: "Soak in warm, soapy water for 3-5 minutes to soften cuticles and clean nails." },
      { title: "Exfoliate", description: "Gently scrub hands with a sugar scrub or hand exfoliant to remove dead skin." },
      { title: "Push back cuticles", description: "Use a cuticle pusher to gently push back cuticles. Never cut them unless you have a hangnail." },
      { title: "Buff nail surface", description: "Lightly buff the nail surface for a smoother polish application." },
      { title: "Apply base coat", description: "Apply a thin layer of base coat to protect nails and help polish adhere better." },
      { title: "Apply polish", description: "Apply two thin coats of polish, allowing each to dry. Start with a stripe down the center, then one on each side." },
      { title: "Finish with top coat", description: "Apply a clear top coat to seal the color and add shine." },
      { title: "Clean up edges", description: "Use a small brush dipped in polish remover to clean any polish on skin." },
      { title: "Apply cuticle oil", description: "Once dry, apply cuticle oil to nourish nails and extend the life of your manicure." }
    ]
  }
];

// Gadget guides (10+ entries)
const gadgetGuides: StepByStepGuide[] = [
  {
    id: "clean-phone",
    title: "Cleaning a Smartphone",
    category: "Electronics",
    service: "GadgetFixGenie",
    icon: <Smartphone className="h-5 w-5" />,
    emoji: "📱",
    steps: [
      { title: "Turn off device", description: "Power down your phone completely before cleaning." },
      { title: "Remove case and attachments", description: "Take off any case, screen protector, or attached accessories." },
      { title: "Use microfiber cloth", description: "Gently wipe the screen and body with a slightly dampened microfiber cloth." },
      { title: "Clean ports and speakers", description: "Use a dry, soft brush or compressed air to remove dust from ports and speakers." },
      { title: "Disinfect surfaces", description: "Apply a small amount of 70% isopropyl alcohol to a cloth (not directly on device) and wipe surfaces." }
    ]
  },
  {
    id: "speed-up-computer",
    title: "Speeding Up a Slow Computer",
    category: "Electronics",
    service: "GadgetFixGenie",
    icon: <Smartphone className="h-5 w-5" />,
    emoji: "💻",
    steps: [
      { title: "Restart your computer", description: "Begin with a simple restart to clear temporary files and refresh system processes." },
      { title: "Check startup programs", description: "Disable unnecessary programs that launch at startup. On Windows, use Task Manager; on Mac, use System Preferences > Users & Groups > Login Items." },
      { title: "Clean up disk space", description: "Delete temporary files and empty the recycle bin/trash. Use Disk Cleanup on Windows or Storage Management on Mac." },
      { title: "Uninstall unused programs", description: "Remove applications you no longer use through Control Panel (Windows) or Applications folder (Mac)." },
      { title: "Check for malware", description: "Run an anti-virus scan to check for malicious software that might be slowing your system." },
      { title: "Update operating system", description: "Ensure your OS has the latest updates, which often include performance improvements." },
      { title: "Defragment hard drive (HDD only)", description: "If you have a traditional hard drive (not SSD), run disk defragmentation on Windows. Not necessary for Macs or SSDs." },
      { title: "Increase RAM (if possible)", description: "If your computer has upgradeable memory, consider adding more RAM for better performance." },
      { title: "Replace HDD with SSD", description: "For a significant speed boost, consider replacing a traditional hard drive with a solid-state drive." }
    ]
  },
  {
    id: "extend-battery-life",
    title: "Extending Device Battery Life",
    category: "Electronics",
    service: "GadgetFixGenie",
    icon: <Smartphone className="h-5 w-5" />,
    emoji: "🔋",
    steps: [
      { title: "Lower screen brightness", description: "Reduce screen brightness to the lowest comfortable level." },
      { title: "Enable battery saver mode", description: "Use built-in battery saving features on your device." },
      { title: "Close background apps", description: "Close unused apps running in the background that drain battery." },
      { title: "Turn off unnecessary features", description: "Disable Bluetooth, WiFi, location services, and notifications when not needed." },
      { title: "Update software", description: "Keep your device updated with the latest software which often includes battery optimizations." },
      { title: "Manage screen timeout", description: "Set your screen to turn off after a short period of inactivity." },
      { title: "Use optimized charging", description: "Enable optimized battery charging features if available on your device." },
      { title: "Avoid extreme temperatures", description: "Keep your device away from very hot or cold environments, which can damage the battery." },
      { title: "Use airplane mode", description: "When in areas with poor signal, switch to airplane mode to prevent battery drain from constant signal searching." }
    ]
  },
  {
    id: "setup-smart-home",
    title: "Setting Up a Basic Smart Home System",
    category: "Electronics",
    service: "GadgetFixGenie",
    icon: <Smartphone className="h-5 w-5" />,
    emoji: "🏠",
    steps: [
      { title: "Choose a smart home ecosystem", description: "Decide on a primary ecosystem: Amazon Alexa, Google Home, or Apple HomeKit." },
      { title: "Ensure good Wi-Fi coverage", description: "Check that your Wi-Fi router provides strong coverage throughout your home." },
      { title: "Start with a smart speaker", description: "Begin with a smart speaker/hub like Amazon Echo, Google Nest, or Apple HomePod." },
      { title: "Add smart plugs", description: "Install smart plugs to control lamps and small appliances as an easy first step." },
      { title: "Install smart lighting", description: "Add smart bulbs or switches for automated lighting control." },
      { title: "Set up smart thermostat", description: "Install a smart thermostat for energy savings and remote temperature control." },
      { title: "Add door/window sensors", description: "Install sensors for security and automated routines based on entry/exit." },
      { title: "Create routines", description: "Set up automated routines like morning wake-up or evening shutdown sequences." },
      { title: "Secure your network", description: "Change default passwords on devices and enable two-factor authentication where available." }
    ]
  },
  {
    id: "reset-wifi-router",
    title: "Troubleshooting Wi-Fi Router Problems",
    category: "Electronics",
    service: "GadgetFixGenie",
    icon: <Smartphone className="h-5 w-5" />,
    emoji: "📶",
    steps: [
      { title: "Restart your router", description: "Unplug your router for 30 seconds, then plug it back in and wait for it to fully restart." },
      { title: "Check connections", description: "Ensure all cables are securely connected to your router and modem." },
      { title: "Verify service status", description: "Check with your internet service provider for any outages in your area." },
      { title: "Reset to factory settings (if needed)", description: "If problems persist, locate the reset button on your router (usually a small pinhole), press and hold for 10-30 seconds." },
      { title: "Update firmware", description: "Log into your router's admin panel and check for firmware updates." },
      { title: "Change Wi-Fi channel", description: "Access router settings to change the Wi-Fi channel to avoid interference from neighboring networks." },
      { title: "Optimize router placement", description: "Position your router centrally in your home, away from walls, metal objects, and other electronic devices." },
      { title: "Check for overheating", description: "Ensure your router has proper ventilation and isn't overheating." },
      { title: "Consider a mesh network", description: "For large homes, consider upgrading to a mesh network system for better coverage." }
    ]
  },
  {
    id: "back-up-data",
    title: "Backing Up Your Digital Data",
    category: "Electronics",
    service: "GadgetFixGenie",
    icon: <Smartphone className="h-5 w-5" />,
    emoji: "💾",
    steps: [
      { title: "Identify important data", description: "Make a list of essential files, photos, videos, and documents you can't afford to lose." },
      { title: "Choose backup methods", description: "Decide on a combination of external hard drives, cloud storage, and/or NAS (Network Attached Storage)." },
      { title: "Follow the 3-2-1 rule", description: "Keep at least 3 copies of your data, on 2 different types of storage media, with 1 copy stored off-site." },
      { title: "Set up cloud backups", description: "Configure services like Google Drive, Dropbox, iCloud, or OneDrive to automatically back up important folders." },
      { title: "Use built-in backup tools", description: "Set up Windows Backup, Time Machine (Mac), or device-specific backup features." },
      { title: "Schedule regular backups", description: "Configure automatic backups to run daily, weekly, or monthly depending on how frequently your data changes." },
      { title: "Verify your backups", description: "Periodically check that your backups are working by restoring a few files as a test." },
      { title: "Secure your backups", description: "Use encryption and strong passwords to protect sensitive backed-up data." },
      { title: "Document your backup system", description: "Keep notes on your backup methods, passwords, and recovery procedures in a secure location." }
    ]
  },
  {
    id: "fix-bluetooth-issues",
    title: "Fixing Bluetooth Connection Problems",
    category: "Electronics",
    service: "GadgetFixGenie",
    icon: <Smartphone className="h-5 w-5" />,
    emoji: "📲",
    steps: [
      { title: "Toggle Bluetooth off and on", description: "Turn Bluetooth off on your device, wait 5 seconds, then turn it back on." },
      { title: "Restart both devices", description: "Power off both the device and the Bluetooth accessory, then turn them back on." },
      { title: "Check for interference", description: "Move away from other wireless devices, microwaves, or cordless phones that might cause interference." },
      { title: "Clear pairing and reconnect", description: "Remove the device from your Bluetooth settings and set up the pairing again from scratch." },
      { title: "Check for updates", description: "Update your device's operating system and the firmware of your Bluetooth accessory if possible." },
      { title: "Reset network settings", description: "On mobile devices, try resetting network settings (this will remove all saved Wi-Fi networks too)." },
      { title: "Check distance", description: "Ensure you're within the optimal range (usually 30 feet/10 meters) of the Bluetooth device." },
      { title: "Try a different device", description: "Test the Bluetooth accessory with another device to determine if the problem is with the accessory or your device." },
      { title: "Reset the Bluetooth accessory", description: "Many Bluetooth devices have a reset procedure—check the manual for specific instructions." }
    ]
  },
  {
    id: "organize-digital-photos",
    title: "Organizing Digital Photos",
    category: "Electronics",
    service: "GadgetFixGenie",
    icon: <Smartphone className="h-5 w-5" />,
    emoji: "📷",
    steps: [
      { title: "Gather all photos", description: "Collect photos from all devices, memory cards, and cloud services into one location." },
      { title: "Remove duplicates", description: "Use duplicate finder software to identify and delete identical photos." },
      { title: "Delete unwanted images", description: "Remove blurry, similar, or unwanted photos to reduce clutter." },
      { title: "Create a consistent folder structure", description: "Organize folders by year, then by event or month (e.g., 2023 > January or 2023 > Hawaii Vacation)." },
      { title: "Use descriptive file names", description: "Rename files with descriptive names including date and event (e.g., 2023-01-15_HawaiiBeach.jpg)." },
      { title: "Add metadata", description: "Tag photos with keywords, locations, and people's names using photo management software." },
      { title: "Back up your organized collection", description: "Once organized, back up your photo collection to cloud storage and external drives." },
      { title: "Use photo management software", description: "Consider using dedicated software like Google Photos, Adobe Lightroom, or Apple Photos for better organization." },
      { title: "Maintain your system", description: "Set a regular schedule (monthly or quarterly) to sort new photos into your organizational system." }
    ]
  },
  {
    id: "clean-keyboard",
    title: "Cleaning a Computer Keyboard",
    category: "Electronics",
    service: "GadgetFixGenie",
    icon: <Smartphone className="h-5 w-5" />,
    emoji: "⌨️",
    steps: [
      { title: "Power down your computer", description: "Turn off or disconnect the keyboard before cleaning." },
      { title: "Shake out loose debris", description: "Turn keyboard upside down and gently shake to remove loose crumbs and dust." },
      { title: "Use compressed air", description: "Spray between keys with compressed air to dislodge remaining debris." },
      { title: "Clean between keys", description: "Use a small brush, cotton swab, or a keyboard cleaning tool to reach between keys." },
      { title: "Disinfect key surfaces", description: "Lightly dampen a microfiber cloth with isopropyl alcohol (70%) and wipe the tops of keys." },
      { title: "Remove key caps (optional)", description: "For deep cleaning, carefully remove key caps using a key puller tool. Note the layout before removing." },
      { title: "Clean under key caps", description: "If keys are removed, gently clean the exposed keyboard surface with a cotton swab dampened with alcohol." },
      { title: "Reassemble and dry", description: "Replace any removed keys and ensure the keyboard is completely dry before reconnecting." },
      { title: "Consider a keyboard cover", description: "For future protection, consider using a silicone keyboard cover for your model." }
    ]
  },
  {
    id: "recover-deleted-files",
    title: "Recovering Accidentally Deleted Files",
    category: "Electronics",
    service: "GadgetFixGenie",
    icon: <Smartphone className="h-5 w-5" />,
    emoji: "🗂️",
    steps: [
      { title: "Check the Recycle Bin/Trash", description: "Look in your computer's Recycle Bin (Windows) or Trash (Mac) for the deleted files." },
      { title: "Stop using the device", description: "Minimize use of the device to prevent overwriting the deleted data." },
      { title: "Check cloud backups", description: "If you use services like OneDrive, Google Drive, or Dropbox, check their recently deleted or version history features." },
      { title: "Use file recovery software", description: "Download reputable recovery software like Recuva, TestDisk, or Disk Drill." },
      { title: "Run the recovery program", description: "Install and run the recovery software, selecting the drive where the files were deleted." },
      { title: "Scan for deleted files", description: "Perform a thorough scan to find recoverable files." },
      { title: "Preview before recovery", description: "Use the preview feature to ensure the files are what you're looking for and are not corrupted." },
      { title: "Recover to a different drive", description: "Save recovered files to a different drive to avoid overwriting other potentially recoverable data." },
      { title: "Seek professional help if needed", description: "For critical data, consider professional data recovery services if your attempts are unsuccessful." }
    ]
  }
];

export default StepByStepGlossary;

