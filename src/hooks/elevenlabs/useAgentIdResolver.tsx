
import { useCallback } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import { ELEVEN_LABS_AGENT_IDS } from "@/constants/elevenlabs";
import { AgentSpecialty } from "@/services/specializedAgentService";

export const useAgentIdResolver = () => {
  const location = useLocation();
  const [searchParams] = useSearchParams();
  
  const getAgentId = useCallback(() => {
    // First try to get from URL specialty parameter
    const specialtyParam = searchParams.get('specialty') as AgentSpecialty | null;
    if (specialtyParam && specialtyParam in ELEVEN_LABS_AGENT_IDS) {
      const agentId = ELEVEN_LABS_AGENT_IDS[specialtyParam as keyof typeof ELEVEN_LABS_AGENT_IDS];
      console.log(`Using agent ID from URL specialty param (${specialtyParam}):`, agentId);
      return agentId;
    }
    
    // Otherwise determine from path
    const path = location.pathname;
    
    if (path.includes("electrician")) {
      console.log("Using electrician agent ID");
      return ELEVEN_LABS_AGENT_IDS.electrician;
    }
    if (path.includes("handyman")) {
      console.log("Using handyman agent ID");
      return ELEVEN_LABS_AGENT_IDS.handyman;
    }
    if (path.includes("mechanic")) {
      console.log("Using mechanic agent ID");
      return ELEVEN_LABS_AGENT_IDS.mechanic;
    }
    if (path.includes("landscaper")) {
      console.log("Using landscaper agent ID");
      return ELEVEN_LABS_AGENT_IDS.landscaper;
    }
    if (path.includes("chef")) {
      console.log("Using chef agent ID");
      return ELEVEN_LABS_AGENT_IDS.chef;
    }
    if (path.includes("stylist")) {
      console.log("Using stylist agent ID");
      return ELEVEN_LABS_AGENT_IDS.stylist;
    }
    if (path.includes("cleaning")) {
      console.log("Using cleaning agent ID");
      return ELEVEN_LABS_AGENT_IDS.cleaning;
    }
    if (path.includes("gadget")) {
      console.log("Using gadget agent ID");
      return ELEVEN_LABS_AGENT_IDS.gadget;
    }
    
    // Add new specialties
    if (path.includes("tax")) {
      console.log("Using tax agent ID");
      return ELEVEN_LABS_AGENT_IDS.tax;
    }
    if (path.includes("psychiatrist")) {
      console.log("Using psychiatrist agent ID");
      return ELEVEN_LABS_AGENT_IDS.psychiatrist;
    }
    if (path.includes("financial")) {
      console.log("Using financial agent ID");
      return ELEVEN_LABS_AGENT_IDS.financial;
    }
    if (path.includes("wellness")) {
      console.log("Using wellness agent ID");
      return ELEVEN_LABS_AGENT_IDS.wellness;
    }
    if (path.includes("legal")) {
      console.log("Using legal agent ID");
      return ELEVEN_LABS_AGENT_IDS.legal;
    }
    if (path.includes("career")) {
      console.log("Using career agent ID");
      return ELEVEN_LABS_AGENT_IDS.career;
    }
    if (path.includes("relationship")) {
      console.log("Using relationship agent ID");
      return ELEVEN_LABS_AGENT_IDS.relationship;
    }
    if (path.includes("nutrition")) {
      console.log("Using nutrition agent ID");
      return ELEVEN_LABS_AGENT_IDS.nutrition;
    }
    
    if (path.includes("painter")) {
      console.log("Using painter agent ID");
      return ELEVEN_LABS_AGENT_IDS.plumber; // Using plumber as fallback until custom agent IDs are created
    }
    if (path.includes("pool")) {
      console.log("Using pool agent ID");
      return ELEVEN_LABS_AGENT_IDS.plumber; // Using plumber as fallback until custom agent IDs are created
    }
    if (path.includes("declutter")) {
      console.log("Using declutter agent ID");
      return ELEVEN_LABS_AGENT_IDS.plumber; // Using plumber as fallback until custom agent IDs are created
    }
    
    // Default to plumber
    console.log("Using default plumber agent ID");
    return ELEVEN_LABS_AGENT_IDS.plumber;
  }, [location.pathname, searchParams]);

  return { getAgentId };
};
