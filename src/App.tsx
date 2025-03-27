
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
import { SCRIPT_URL } from "@/constants/elevenlabs";

const queryClient = new QueryClient();

// Widget initializer component with improved error handling
const ElevenLabsWidgetInitializer = () => {
  useEffect(() => {
    let scriptLoadAttempts = 0;
    const maxAttempts = 3;
    
    const loadScript = () => {
      // Check if script is already loaded
      if (document.querySelector(`script[src="${SCRIPT_URL}"]`)) {
        console.log("ElevenLabs script already loaded in App initializer");
        return;
      }
      
      scriptLoadAttempts++;
      console.log(`Loading ElevenLabs script in App initializer (attempt ${scriptLoadAttempts}/${maxAttempts})`);
      
      const script = document.createElement("script");
      script.src = SCRIPT_URL;
      script.async = true;
      script.type = "text/javascript";
      
      script.onload = () => {
        console.log("ElevenLabs script loaded successfully in App initializer");
        
        // Check if the custom element is registered
        setTimeout(() => {
          if (!customElements.get("elevenlabs-convai") && scriptLoadAttempts < maxAttempts) {
            console.warn("ElevenLabs custom element not registered after script load, retrying...");
            script.remove();
            setTimeout(loadScript, 1000);
          }
        }, 1000);
      };
      
      script.onerror = (error) => {
        console.error("Error loading ElevenLabs script in App initializer:", error);
        
        if (scriptLoadAttempts < maxAttempts) {
          console.log("Retrying script load after error...");
          script.remove();
          setTimeout(loadScript, 1000);
        }
      };
      
      document.head.appendChild(script);
    };
    
    loadScript();
    
    return () => {
      // We don't remove the script on unmount to prevent reloading issues
    };
  }, []);
  
  return null;
};

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <TooltipProvider>
          <Toaster />
          <Sonner />
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
          <ElevenLabsWidgetInitializer />
        </TooltipProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;
