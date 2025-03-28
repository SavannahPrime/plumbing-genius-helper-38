
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import ElevenLabsWidgetInitializer from "./components/chat/ElevenLabsWidgetInitializer";

// Import pages
import Index from "./pages/Index";
import EveryFixHome from "./pages/EveryFixHome";
import Chat from "./pages/Chat";
import Diagnosis from "./pages/Diagnosis";
import Fixes from "./pages/Fixes";
import Cleaning from "./pages/Cleaning";
import Handyman from "./pages/Handyman";
import Electrician from "./pages/Electrician";
import Landscaper from "./pages/Landscaper";
import Mechanic from "./pages/Mechanic";
import GadgetFixGenie from "./pages/GadgetFixGenie";
import GadgetGlossary from "./pages/GadgetGlossary";
import Chef from "./pages/Chef";
import Stylist from "./pages/Stylist";
import StepByStepGlossary from "./pages/StepByStepGlossary";
import Subscription from "./pages/Subscription";
import NotFound from "./pages/NotFound";

// Create a client
const queryClient = new QueryClient();

function App() {
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
            <Route path="/subscription" element={<Subscription />} />
            
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
}

export default App;
