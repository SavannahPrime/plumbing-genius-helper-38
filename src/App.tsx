
import { useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Chat from "./pages/Chat";
import Diagnosis from "./pages/Diagnosis";
import Fixes from "./pages/Fixes";
import NotFound from "./pages/NotFound";
import Cleaning from "./pages/Cleaning";
import Handyman from "./pages/Handyman";
import Electrician from "./pages/Electrician";
import Landscaper from "./pages/Landscaper";
import EveryFixHome from "./pages/EveryFixHome";
import Mechanic from "./pages/Mechanic";
import GadgetFixGenie from "./pages/GadgetFixGenie";
import GadgetGlossary from "./pages/GadgetGlossary";
import Chef from "./pages/Chef";
import Stylist from "./pages/Stylist";
import StepByStepGlossary from "./pages/StepByStepGlossary";
import { SCRIPT_URL, ELEVEN_LABS_AGENT_ID } from "@/constants/elevenlabs";

const queryClient = new QueryClient();

const App = () => {
  // Initialize ElevenLabs widget on app load
  useEffect(() => {
    // Load the script if it's not already loaded
    if (!document.querySelector(`script[src="${SCRIPT_URL}"]`)) {
      const script = document.createElement("script");
      script.src = SCRIPT_URL;
      script.async = true;
      script.type = "text/javascript";
      document.head.appendChild(script);
      
      // Once script is loaded, create the initial widget
      script.onload = () => {
        // Add the widget element to the page with the default agent ID
        if (!document.querySelector("elevenlabs-convai")) {
          const widget = document.createElement("elevenlabs-convai");
          widget.setAttribute("agent-id", ELEVEN_LABS_AGENT_ID);
          widget.style.display = "none"; // Hide the widget
          document.body.appendChild(widget);
          console.log("ElevenLabs widget initialized");
        }
      };
    } else {
      // If script is already loaded, create the widget if it doesn't exist
      if (!document.querySelector("elevenlabs-convai")) {
        const widget = document.createElement("elevenlabs-convai");
        widget.setAttribute("agent-id", ELEVEN_LABS_AGENT_ID);
        widget.style.display = "none"; // Hide the widget
        document.body.appendChild(widget);
        console.log("ElevenLabs widget initialized");
      }
    }
    
    // Cleanup on app unmount (probably won't happen much)
    return () => {
      const widget = document.querySelector("elevenlabs-convai");
      if (widget) {
        widget.remove();
      }
    };
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/plumber" element={<Index />} />
            <Route path="/" element={<EveryFixHome />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="/diagnosis" element={<Diagnosis />} />
            <Route path="/fixes" element={<Fixes />} />
            <Route path="/cleaning" element={<Cleaning />} />
            <Route path="/handyman" element={<Handyman />} />
            <Route path="/electrician" element={<Electrician />} />
            <Route path="/landscaper" element={<Landscaper />} />
            <Route path="/mechanic" element={<Mechanic />} />
            <Route path="/gadgetfixgenie" element={<GadgetFixGenie />} />
            
            {/* Context-specific glossary routes */}
            <Route path="/glossary" element={<GadgetGlossary />} />
            <Route path="/plumber/glossary" element={<GadgetGlossary contextType="plumber" />} />
            <Route path="/landscaper/glossary" element={<GadgetGlossary contextType="landscaper" />} />
            <Route path="/chef/glossary" element={<GadgetGlossary contextType="chef" />} />
            <Route path="/stylist/glossary" element={<GadgetGlossary contextType="stylist" />} />
            <Route path="/electrician/glossary" element={<GadgetGlossary contextType="electrician" />} />
            <Route path="/handyman/glossary" element={<GadgetGlossary contextType="handyman" />} />
            <Route path="/mechanic/glossary" element={<GadgetGlossary contextType="mechanic" />} />
            <Route path="/cleaning/glossary" element={<GadgetGlossary contextType="cleaning" />} />
            <Route path="/gadget/glossary" element={<GadgetGlossary contextType="gadget" />} />
            
            <Route path="/chef" element={<Chef />} />
            <Route path="/stylist" element={<Stylist />} />
            <Route path="/step-by-step" element={<StepByStepGlossary />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
