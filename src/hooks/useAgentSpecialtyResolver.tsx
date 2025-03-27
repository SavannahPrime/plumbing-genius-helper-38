
import { useLocation, useSearchParams } from "react-router-dom";
import { AgentSpecialty, specializedAgents } from "@/services/specializedAgentService";

export const useAgentSpecialtyResolver = (): AgentSpecialty => {
  const location = useLocation();
  const [searchParams] = useSearchParams();
  
  const specialtyParam = searchParams.get('specialty') as AgentSpecialty;
  if (specialtyParam && Object.keys(specializedAgents).includes(specialtyParam)) {
    console.log(`Using agent specialty from URL param: ${specialtyParam}`);
    return specialtyParam;
  }
  
  const path = location.pathname;
  
  if (path.includes("electrician")) return "electrician";
  if (path.includes("handyman")) return "handyman";
  if (path.includes("mechanic")) return "mechanic";
  if (path.includes("landscaper")) return "landscaper";
  if (path.includes("chef")) return "chef";
  if (path.includes("stylist")) return "stylist";
  if (path.includes("cleaning")) return "cleaning";
  if (path.includes("gadget")) return "gadget";
  
  return "plumber";
};
