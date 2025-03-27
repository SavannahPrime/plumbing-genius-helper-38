
import React from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { AgentSpecialty, specializedAgents } from "@/services/specializedAgentService";

interface ImagePreviewDialogProps {
  showDialog: boolean;
  setShowDialog: (show: boolean) => void;
  selectedImage: string | null;
  handleCloseDialog: () => void;
  handleAnalyzeImage: () => void;
  isAnalyzing: boolean;
  specialty?: AgentSpecialty;
}

const ImagePreviewDialog = ({
  showDialog,
  setShowDialog,
  selectedImage,
  handleCloseDialog,
  handleAnalyzeImage,
  isAnalyzing,
  specialty = "plumber"
}: ImagePreviewDialogProps) => {
  const agent = specializedAgents[specialty];
  
  return (
    <Dialog open={showDialog} onOpenChange={setShowDialog}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Preview and Analyze Image</DialogTitle>
          <Button
            className="absolute right-4 top-4"
            variant="ghost"
            size="icon"
            onClick={handleCloseDialog}
          >
            <X className="w-4 h-4" />
          </Button>
        </DialogHeader>

        {selectedImage && (
          <div className="flex flex-col gap-4">
            <div className="border rounded-md overflow-hidden">
              <img
                src={selectedImage}
                alt="Preview"
                className="w-full h-auto object-contain max-h-[300px]"
              />
            </div>
            <p className="text-sm text-center text-muted-foreground">
              Press "Analyze" to let {agent.name} examine the image and provide insights on your {specialty} issue.
            </p>
          </div>
        )}

        <DialogFooter>
          <Button
            variant="outline"
            onClick={handleCloseDialog}
            disabled={isAnalyzing}
          >
            Cancel
          </Button>
          <Button
            onClick={handleAnalyzeImage}
            disabled={isAnalyzing || !selectedImage}
            className="bg-primary hover:bg-primary/90"
          >
            {isAnalyzing ? "Analyzing..." : "Analyze Image"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ImagePreviewDialog;
