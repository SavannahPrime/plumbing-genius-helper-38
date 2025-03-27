
import { useLocation } from "react-router-dom";

/**
 * Extract the current context (specialty) from the URL path
 */
export const getCurrentContextFromPath = (path: string): string => {
  if (path.includes("/landscaper")) return "landscaper";
  if (path.includes("/chef")) return "chef";
  if (path.includes("/stylist")) return "stylist";
  if (path.includes("/electrician")) return "electrician";
  if (path.includes("/handyman")) return "handyman";
  if (path.includes("/mechanic")) return "mechanic";
  if (path.includes("/cleaning")) return "cleaning";
  if (path.includes("/gadgetfixgenie")) return "gadget";
  if (path.includes("/plumber")) return "plumber";
  
  return "default";
};

/**
 * Determine the correct glossary path based on the current context
 */
export const getContextSpecificPath = (defaultPath: string, currentContext: string): string => {
  // If the path already contains the context, return it as is
  if (defaultPath.includes(`/${currentContext}/`)) {
    return defaultPath;
  }
  
  // If the path is a glossary path, ensure we're using the current context
  if (defaultPath === "/glossary" || defaultPath.includes("/glossary")) {
    return `/${currentContext}/glossary`;
  }
  
  return defaultPath;
};

/**
 * Custom hook to get the current context from the URL
 */
export const useCurrentContext = (): string => {
  const location = useLocation();
  return getCurrentContextFromPath(location.pathname);
};
