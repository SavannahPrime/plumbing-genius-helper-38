
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

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
          <Input
            type="password"
            value={apiKey}
            onChange={(e) => onApiKeyChange(e.target.value)}
            placeholder="sk-..."
            className="mb-4"
          />
          <p className="text-xs text-muted-foreground mb-4">
            The API key is pre-configured for all EveryFixAI agents. You can update it if needed.
          </p>
          <Button onClick={() => onSave(apiKey)}>Save Key</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ApiKeyDialog;
