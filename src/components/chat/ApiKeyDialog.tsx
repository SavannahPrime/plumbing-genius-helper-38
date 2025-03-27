
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Check, Lock } from "lucide-react";
import { useAgentSpecialtyResolver } from "@/hooks/useAgentSpecialtyResolver";

interface ApiKeyDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  apiKey: string;
  onApiKeyChange: (key: string) => void;
  onSave: (key: string) => void;
}

const ApiKeyDialog = ({ 
  open, 
  onOpenChange, 
  apiKey, 
  onApiKeyChange, 
  onSave 
}: ApiKeyDialogProps) => {
  const currentSpecialty = useAgentSpecialtyResolver();
  const isChef = currentSpecialty === "chef";
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>ChatGPT Settings</DialogTitle>
        </DialogHeader>
        <div className="py-4">
          <div className="flex items-center mb-2">
            <label className="block text-sm font-medium">
              OpenAI API Key
            </label>
            <span className="ml-2 inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
              <Check className="h-3 w-3 mr-1" /> Active
            </span>
          </div>
          {isChef ? (
            <div className="mb-4 bg-amber-50 p-3 rounded-md border border-amber-200 flex items-center">
              <Lock className="h-4 w-4 text-amber-600 mr-2" />
              <div>
                <p className="text-sm font-medium text-amber-800">Dedicated Chef API Key</p>
                <p className="text-xs text-amber-700">Chef's Assistant uses a dedicated API key that's pre-configured.</p>
              </div>
            </div>
          ) : (
            <Input
              type="password"
              value={apiKey}
              onChange={(e) => onApiKeyChange(e.target.value)}
              placeholder="sk-..."
              className="mb-4"
            />
          )}
          <p className="text-xs text-muted-foreground mb-4">
            {isChef 
              ? "The Chef's Assistant uses a dedicated API key for optimal performance."
              : "The API key is pre-configured for all EveryFixAI agents. You can update it if needed."}
          </p>
          {!isChef && (
            <Button onClick={() => onSave(apiKey)}>Save Key</Button>
          )}
          {isChef && (
            <Button variant="outline" onClick={() => onOpenChange(false)}>Close</Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ApiKeyDialog;
