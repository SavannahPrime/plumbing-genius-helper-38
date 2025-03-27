
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Camera, Upload, Image as ImageIcon, X, Loader2, Mic } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useState, useRef } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { analyzeImage } from "@/services/imageAnalysisService";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import { useElevenLabsAgent } from "@/hooks/useElevenLabsAgent";

const Diagnosis = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<string | null>(null);
  const [showDialog, setShowDialog] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { handleMicClick } = useElevenLabsAgent();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target?.result as string);
        setShowDialog(true);
        setAnalysisResult(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCameraClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.accept = "image/*";
      fileInputRef.current.capture = "environment";
      fileInputRef.current.click();
    }
  };

  const handleUploadClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.accept = "image/*";
      fileInputRef.current.removeAttribute("capture");
      fileInputRef.current.click();
    }
  };

  const handleCloseDialog = () => {
    setShowDialog(false);
    if (!analysisResult) {
      setSelectedImage(null);
    }
  };

  const handleAnalyzeImage = async () => {
    if (!selectedImage) return;

    try {
      setIsAnalyzing(true);
      const result = await analyzeImage(selectedImage);
      setAnalysisResult(result);
      toast({
        title: "Analysis complete",
        description: "We've analyzed your plumbing issue",
      });
    } catch (error) {
      console.error("Error analyzing image:", error);
      toast({
        title: "Analysis failed",
        description: "There was a problem analyzing your image. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="min-h-screen bg-soft">
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center">
          <Link to="/" className="p-2 hover:bg-neutrals-steel/30 rounded-full transition-colors">
            <ArrowLeft className="w-6 h-6 text-primary" />
          </Link>
          <div className="ml-4 flex-1">
            <h1 className="font-space-grotesk font-bold text-[22px] text-primary">
              Visual Diagnosis
            </h1>
            <p className="font-dm-sans text-[16px] text-neutrals">
              Upload a photo, and our AI will analyze the issue. You can also speak with our plumbing assistant.
            </p>
          </div>
          <Button 
            variant="outline" 
            size="icon" 
            className="rounded-full bg-white hover:bg-secondary/10" 
            onClick={handleMicClick}
          >
            <Mic className="w-5 h-5 text-secondary" />
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col md:flex-row gap-8 items-center"
          >
            <motion.div 
              className="w-full md:w-1/3"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <img 
                src="/lovable-uploads/8b852c7f-6b8c-40ef-9d7a-b38e45699b56.png" 
                alt="Friendly Plumber" 
                className="w-full max-w-[250px] mx-auto md:mx-0"
              />
              <div className="bg-white p-4 rounded-xl shadow-card mt-4">
                <p className="font-dm-sans font-medium text-center md:text-left">
                  "Hi there! Share a photo of your plumbing issue, and I'll help diagnose the problem. You can also click the voice chat icon to talk to me!"
                </p>
              </div>
            </motion.div>

            <Card className="p-8 text-center w-full md:w-2/3 shadow-card rounded-2xl">
              <div className="border-2 border-dashed border-neutrals-steel rounded-xl p-8 cursor-pointer hover:border-secondary transition-colors">
                <div className="flex flex-col items-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-secondary/10 flex items-center justify-center">
                    <Camera className="w-8 h-8 text-secondary" />
                  </div>
                  <h3 className="font-space-grotesk font-semibold text-xl text-primary">
                    Tap to Upload a Photo
                  </h3>
                  <p className="text-neutrals max-w-sm">
                    Take a clear photo of the plumbing issue, and our AI will analyze it for you.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 mt-4 w-full max-w-xs mx-auto">
                    <Button className="bg-primary hover:bg-primary/90 w-full rounded-xl" onClick={handleCameraClick}>
                      <Camera className="w-5 h-5 mr-2" />
                      Take Photo
                    </Button>
                    <Button variant="outline" className="w-full rounded-xl" onClick={handleUploadClick}>
                      <Upload className="w-5 h-5 mr-2" />
                      Upload Image
                    </Button>
                    <Input
                      type="file"
                      ref={fileInputRef}
                      className="hidden"
                      accept="image/*"
                      onChange={handleFileChange}
                    />
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>

          {analysisResult && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mt-10"
            >
              <Card className="p-6 shadow-card rounded-2xl">
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="w-full md:w-1/3">
                    <div className="relative aspect-square rounded-xl overflow-hidden border border-neutrals-steel">
                      <img 
                        src={selectedImage || ''} 
                        alt="Plumbing issue" 
                        className="object-cover w-full h-full"
                      />
                    </div>
                  </div>
                  <div className="w-full md:w-2/3">
                    <h3 className="font-space-grotesk font-semibold text-xl text-primary mb-4">
                      Diagnosis Results
                    </h3>
                    <div className="bg-soft p-4 rounded-xl">
                      <p className="whitespace-pre-line font-dm-sans text-neutrals">
                        {analysisResult}
                      </p>
                    </div>
                    <div className="mt-4 flex justify-end">
                      <Button className="bg-primary hover:bg-primary/90 rounded-xl" onClick={() => setSelectedImage(null)}>
                        New Diagnosis
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          )}
        </div>
      </main>

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
    </div>
  );
};

export default Diagnosis;
