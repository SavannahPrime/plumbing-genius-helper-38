
import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { toast } from "@/hooks/use-toast";
import { analyzeImage } from "@/services/imageAnalysisService";
import { useLocation } from "react-router-dom";
import { AgentSpecialty, getAgentByRoute } from "@/services/specializedAgentService";

// Import refactored components
import DiagnosisHeader from "@/components/diagnosis/DiagnosisHeader";
import DiagnosisBanner from "@/components/diagnosis/DiagnosisBanner";
import UploadCard from "@/components/diagnosis/UploadCard";
import AnalysisResult from "@/components/diagnosis/AnalysisResult";
import ImagePreviewDialog from "@/components/diagnosis/ImagePreviewDialog";

const Diagnosis = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<string | null>(null);
  const [showDialog, setShowDialog] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const location = useLocation();

  // Get the current agent specialty based on route
  const currentSpecialty: AgentSpecialty = getAgentByRoute(location.pathname);

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
      // Pass the current specialty for specialized analysis
      const result = await analyzeImage(selectedImage, currentSpecialty);
      setAnalysisResult(result);
      setShowDialog(false);
      toast({
        title: "Analysis complete",
        description: `We've analyzed your ${currentSpecialty} issue`,
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

  const handleNewDiagnosis = () => {
    setSelectedImage(null);
    setAnalysisResult(null);
  };

  // Get background color based on specialty
  const getBgColorClass = () => {
    switch (currentSpecialty) {
      case "plumber": return "bg-gradient-to-b from-blue-50 to-blue-100";
      case "chef": return "bg-gradient-to-b from-orange-50 to-orange-100";
      case "cleaning": return "bg-gradient-to-b from-cyan-50 to-cyan-100";
      case "electrician": return "bg-gradient-to-b from-yellow-50 to-yellow-100";
      case "handyman": return "bg-gradient-to-b from-amber-50 to-amber-100";
      case "landscaper": return "bg-gradient-to-b from-green-50 to-green-100";
      case "mechanic": return "bg-gradient-to-b from-gray-100 to-gray-200";
      case "gadget": return "bg-gradient-to-b from-indigo-50 to-indigo-100";
      case "stylist": return "bg-gradient-to-b from-pink-50 to-pink-100";
      default: return "bg-gradient-to-b from-blue-50 to-blue-100";
    }
  };

  return (
    <div className={`min-h-screen ${getBgColorClass()}`}>
      <DiagnosisHeader specialty={currentSpecialty} />

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col md:flex-row gap-8 items-center"
          >
            <DiagnosisBanner specialty={currentSpecialty} />

            <UploadCard
              handleFileChange={handleFileChange}
              handleCameraClick={handleCameraClick}
              handleUploadClick={handleUploadClick}
              fileInputRef={fileInputRef}
              specialty={currentSpecialty}
            />
          </motion.div>

          {analysisResult && selectedImage && (
            <AnalysisResult 
              selectedImage={selectedImage} 
              analysisResult={analysisResult}
              onNewDiagnosis={handleNewDiagnosis}
            />
          )}
        </div>
      </main>

      <ImagePreviewDialog
        showDialog={showDialog}
        setShowDialog={setShowDialog}
        selectedImage={selectedImage}
        handleCloseDialog={handleCloseDialog}
        handleAnalyzeImage={handleAnalyzeImage}
        isAnalyzing={isAnalyzing}
        specialty={currentSpecialty}
      />
    </div>
  );
};

export default Diagnosis;
