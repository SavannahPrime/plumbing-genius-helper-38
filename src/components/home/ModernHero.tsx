
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MessageSquare, Camera, ArrowRight, Play } from "lucide-react";
import { Link } from "react-router-dom";

interface ModernHeroProps {
  title?: string;
  specialty?: string;
  emoji?: string;
  description?: string;
  placeholderText?: string;
  showChat?: boolean;
}

const ModernHero = ({
  title = "Plumber's Helper",
  specialty = "plumber",
  emoji = "🔧",
  description = "Say goodbye to plumbers, googling, and guessing.",
  placeholderText = "What's leaking, squeaking, or not working?",
  showChat = true
}: ModernHeroProps) => {
  const specialtyPath = specialty === "plumber" ? "/plumber" : 
                      specialty === "handyman" ? "/handyman" :
                      specialty === "electrician" ? "/electrician" :
                      specialty === "gadget" ? "/gadgetfixgenie" :
                      specialty === "chef" ? "/chef" :
                      specialty === "cleaning" ? "/cleaning" :
                      specialty === "mechanic" ? "/mechanic" :
                      specialty === "landscaper" ? "/landscaper" :
                      specialty === "stylist" ? "/stylist" :
                      "/";

  return (
    <div className="w-full py-10 lg:py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
              Fix Anything at Home 
              <span className="block text-primary">— Instantly</span> 
              with AI {emoji}
            </h1>
            <p className="text-xl mb-6 text-gray-700">{description}</p>
            <p className="mb-6 text-gray-600">One tap. Snap a pic. Your home fix guide, instantly.</p>
            
            <div className="relative mb-8">
              <Input 
                placeholder={placeholderText}
                className="pl-12 py-6 text-base rounded-lg border border-gray-200 shadow-sm focus:shadow-md"
              />
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M11 19C15.4183 19 19 15.4183 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19Z" stroke="#6B7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M21 21L16.65 16.65" stroke="#6B7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-4">
              <Link to={`/chat?specialty=${specialty}`}>
                <Button className="py-6 px-8 rounded-lg shadow-md bg-primary hover:bg-primary/90 flex items-center gap-2">
                  <MessageSquare className="h-5 w-5" />
                  Try the Fix Assistant
                </Button>
              </Link>
              <Button variant="outline" className="py-6 px-8 rounded-lg flex items-center gap-2">
                <Play className="h-5 w-5" />
                Watch It Work
              </Button>
            </div>
          </div>

          {showChat && (
            <div className="bg-gray-900 rounded-xl shadow-xl overflow-hidden">
              <div className="bg-gray-800 py-3 px-4 flex items-center gap-2 text-white">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <div className="ml-2">{title} Chat</div>
              </div>
              <div className="p-4 h-80 overflow-y-auto text-white">
                <div className="flex justify-start mb-4">
                  <div className="bg-gray-700 rounded-lg p-3 max-w-[80%]">
                    <p>My kitchen sink is clogged and draining slowly. What should I do?</p>
                  </div>
                </div>
                
                <div className="flex justify-end mb-4">
                  <div className="bg-primary/90 rounded-lg p-3 max-w-[80%]">
                    <p>Let's fix that clogged sink! 👨‍🔧</p>
                    <p className="mt-2">Here's a simple step-by-step solution:</p>
                    <ol className="mt-2 pl-5 list-decimal">
                      <li>Try pouring boiling water down the drain</li>
                      <li>Use a mixture of baking soda and vinegar:
                        <ul className="pl-5 list-disc mt-1">
                          <li>½ cup baking soda</li>
                          <li>½ cup vinegar</li>
                        </ul>
                      </li>
                      <li>Wait 30 minutes, then flush with hot water</li>
                    </ol>
                  </div>
                </div>
                
                <div className="flex justify-start mb-4">
                  <div className="bg-gray-700 rounded-lg p-3 max-w-[80%]">
                    <p>What if that doesn't work?</p>
                  </div>
                </div>
              </div>
              <div className="bg-gray-800 p-3 border-t border-gray-700 flex items-center gap-2">
                <Input 
                  placeholder="Type your question..."
                  className="bg-gray-700 border-gray-600 text-white"
                />
                <Button size="icon" className="bg-primary hover:bg-primary/90">
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ModernHero;
