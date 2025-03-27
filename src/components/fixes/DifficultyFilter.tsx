
import React from "react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Difficulty } from "@/constants/plumbingFixes";

interface DifficultyFilterProps {
  selectedDifficulty: Difficulty | "all";
  setSelectedDifficulty: (difficulty: Difficulty | "all") => void;
}

const difficultyOptions = [
  { value: "all", label: "All Difficulties" },
  { value: "Easy", label: "Easy" },
  { value: "Medium", label: "Medium" },
  { value: "Hard", label: "Hard" },
];

const DifficultyFilter = ({ 
  selectedDifficulty, 
  setSelectedDifficulty 
}: DifficultyFilterProps) => {
  return (
    <div className="py-3 border-t">
      <div className="flex items-center gap-3">
        <span className="text-sm font-medium text-gray-700">Difficulty:</span>
        <ToggleGroup 
          type="single" 
          value={selectedDifficulty}
          onValueChange={(value) => {
            if (value) setSelectedDifficulty(value as Difficulty | "all");
          }}
          className="gap-1"
        >
          {difficultyOptions.map((option) => (
            <ToggleGroupItem
              key={option.value}
              value={option.value}
              aria-label={`Filter by ${option.label}`}
              className="rounded-full text-xs px-3 py-1 h-auto data-[state=on]:bg-[#00AEEF] data-[state=on]:text-white"
            >
              {option.label}
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
      </div>
    </div>
  );
};

export default DifficultyFilter;
