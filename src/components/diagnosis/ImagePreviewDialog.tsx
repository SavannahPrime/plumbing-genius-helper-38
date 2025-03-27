
import React from "react";
import { X, Loader2, Image as ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface ImagePreviewDialogProps {
  showDialog: boolean;
  setShowDialog: (show: boolean) => void;
  selectedImage: string | null;
  handleCloseDialog: () => void;
  handleAnalyzeImage: () => void;
  isAnalyzing: boolean;
}

const ImagePreviewDialog = ({
  showDialog,
  setShowDialog,
  selectedImage,
  handleCloseDialog,
  handleAnalyzeImage,
  isAnalyzing,
}: ImagePreviewDialogProps) => {
  return (
    <Dialog open={showDialog} onOpenChange={setShowDialog}>
      <DialogContent className="sm:max-w-lg rounded-2xl bg-white">
        <DialogHeader>
          <DialogTitle className="font-space-grotesk">Photo Preview</DialogTitle>
        </DialogHeader>
        <div className="relative aspect-video rounded-xl overflow-hidden border border-neutrals-steel mt-2">
          {selectedImage && (
            <img 
              src={selectedImage} 
              alt="Preview" 
              className="object-contain w-full h-full"
            />
          )}
        </div>
        <div className="flex justify-end gap-3 mt-4">
          <Button variant="outline" className="rounded-xl" onClick={handleCloseDialog}>
            <X className="w-4 h-4 mr-2" />
            Cancel
          </Button>
          <Button 
            className="bg-primary hover:bg-primary/90 rounded-xl" 
            onClick={handleAnalyzeImage}
            disabled={isAnalyzing}
          >
            {isAnalyzing ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Analyzing...
              </>
            ) : (
              <>
                <ImageIcon className="w-4 h-4 mr-2" />
                Analyze Photo
              </>
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ImagePreviewDialog;
