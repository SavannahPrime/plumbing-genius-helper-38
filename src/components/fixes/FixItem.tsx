
import React from "react";
import { ArrowRight, Clock, Wrench } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "@/components/ui/collapsible";
import { Progress } from "@/components/ui/progress";
import FixSteps from "./FixSteps";
import { PlumbingFix } from "@/constants/plumbingFixes";

interface FixItemProps {
  fix: PlumbingFix;
  expandedFix: number | null;
  setExpandedFix: (id: number | null) => void;
  completedSteps: number[];
  toggleStepCompletion: (fixId: number, stepIndex: number) => void;
}

const FixItem = ({
  fix, 
  expandedFix, 
  setExpandedFix, 
  completedSteps, 
  toggleStepCompletion
}: FixItemProps) => {
  // Calculate progress percentage
  const progressPercentage = fix.steps.length > 0
    ? (completedSteps.length / fix.steps.length) * 100
    : 0;

  return (
    <Collapsible 
      open={expandedFix === fix.id}
      onOpenChange={() => setExpandedFix(expandedFix === fix.id ? null : fix.id)}
    >
      <Card className="overflow-hidden">
        <CollapsibleTrigger className="w-full">
          <div className="p-4 hover:bg-gray-50 transition-colors cursor-pointer">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-[#00AEEF]/10 flex items-center justify-center flex-shrink-0">
                <Wrench className="w-6 h-6 text-[#00AEEF]" />
              </div>
              <div className="flex-grow text-left">
                <h3 className="font-inter font-semibold text-lg text-gray-900 mb-1">
                  {fix.title}
                </h3>
                <p className="text-gray-600 text-sm mb-2">{fix.description}</p>
                <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                  <Clock className="w-4 h-4" />
                  <span>{fix.time}</span>
                  <span className="px-2 py-1 bg-gray-100 rounded-full text-xs">
                    {fix.difficulty}
                  </span>
                </div>
                
                {/* Progress bar */}
                <div className="flex items-center gap-2 mt-1">
                  <Progress value={progressPercentage} className="h-2" />
                  <span className="text-xs text-gray-500 whitespace-nowrap">
                    {completedSteps.length}/{fix.steps.length}
                  </span>
                </div>
              </div>
              <ArrowRight className={`w-5 h-5 text-gray-400 transform transition-transform ${expandedFix === fix.id ? 'rotate-90' : ''}`} />
            </div>
          </div>
        </CollapsibleTrigger>
        
        <CollapsibleContent>
          <FixSteps
            fixId={fix.id}
            steps={fix.steps}
            videoLink={fix.videoLink}
            completedSteps={completedSteps}
            toggleStepCompletion={toggleStepCompletion}
          />
        </CollapsibleContent>
      </Card>
    </Collapsible>
  );
};

export default FixItem;
