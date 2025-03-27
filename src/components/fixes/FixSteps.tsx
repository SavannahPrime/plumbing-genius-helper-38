
import React from "react";
import { Video } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";

interface FixStepsProps {
  fixId: number;
  steps: string[];
  videoLink: string;
  completedSteps: number[];
  toggleStepCompletion: (fixId: number, stepIndex: number) => void;
}

const FixSteps = ({ 
  fixId, 
  steps, 
  videoLink, 
  completedSteps, 
  toggleStepCompletion 
}: FixStepsProps) => {
  return (
    <div className="p-4 pt-0 border-t">
      <div className="mb-4">
        <a 
          href={videoLink} 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-[#00AEEF] hover:underline"
        >
          <Video className="w-5 h-5" />
          <span>Watch tutorial video</span>
        </a>
      </div>
      
      <h4 className="font-medium text-gray-900 mb-3">Step-by-Step Instructions:</h4>
      <div className="space-y-3 mb-4">
        {steps.map((step, index) => (
          <div key={index} className="flex items-start gap-3">
            <div className="pt-0.5">
              <Checkbox 
                id={`fix-${fixId}-step-${index}`} 
                className="border-2 border-gray-300 rounded-full"
                checked={completedSteps?.includes(index) || false}
                onCheckedChange={() => toggleStepCompletion(fixId, index)}
              />
            </div>
            <label 
              htmlFor={`fix-${fixId}-step-${index}`}
              className={`text-sm ${completedSteps?.includes(index) ? 'line-through text-gray-400' : 'text-gray-700'}`}
            >
              {step}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FixSteps;
