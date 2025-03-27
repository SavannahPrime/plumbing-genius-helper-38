
import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface AnalysisResultProps {
  selectedImage: string;
  analysisResult: string;
  onNewDiagnosis: () => void;
}

const AnalysisResult = ({ selectedImage, analysisResult, onNewDiagnosis }: AnalysisResultProps) => {
  return (
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
                src={selectedImage} 
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
              <Button className="bg-primary hover:bg-primary/90 rounded-xl" onClick={onNewDiagnosis}>
                New Diagnosis
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

export default AnalysisResult;
