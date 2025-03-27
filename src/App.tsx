
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

const queryClient = new QueryClient();

const App = () => (
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
          <Route path="/glossary" element={<GadgetGlossary />} />
          <Route path="/chef" element={<Chef />} />
          <Route path="/stylist" element={<Stylist />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
