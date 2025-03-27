
import { useState } from "react";
import { motion } from "framer-motion";
import FixesHeader from "@/components/fixes/FixesHeader";
import CategoryTabs from "@/components/fixes/CategoryTabs";
import FixItem from "@/components/fixes/FixItem";
import DifficultyFilter from "@/components/fixes/DifficultyFilter";
import { plumbingFixes, FixCategory, Difficulty } from "@/constants/plumbingFixes";

const Fixes = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty | "all">("all");
  const [expandedFix, setExpandedFix] = useState<number | null>(null);
  const [completedSteps, setCompletedSteps] = useState<Record<number, number[]>>({});

  // Filter fixes based on search query, selected category, and difficulty
  const filteredFixes = plumbingFixes.filter((fix) => {
    const matchesSearch = fix.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          fix.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "all" || fix.category === selectedCategory;
    const matchesDifficulty = selectedDifficulty === "all" || fix.difficulty === selectedDifficulty;
    return matchesSearch && matchesCategory && matchesDifficulty;
  });

  const toggleStepCompletion = (fixId: number, stepIndex: number) => {
    setCompletedSteps(prev => {
      const currentFixSteps = prev[fixId] || [];
      
      // Check if the step is already completed
      if (currentFixSteps.includes(stepIndex)) {
        // Remove the step from completed steps
        return {
          ...prev,
          [fixId]: currentFixSteps.filter(step => step !== stepIndex)
        };
      } else {
        // Add the step to completed steps
        return {
          ...prev,
          [fixId]: [...currentFixSteps, stepIndex]
        };
      }
    });
  };

  return (
    <div className="min-h-screen bg-[#F5F5F5]">
      {/* Header with search */}
      <FixesHeader 
        searchQuery={searchQuery} 
        setSearchQuery={setSearchQuery} 
      />

      <div className="bg-white border-b">
        <div className="container mx-auto px-4">
          {/* Category Tabs */}
          <CategoryTabs 
            selectedCategory={selectedCategory} 
            setSelectedCategory={setSelectedCategory} 
          />
          
          {/* Difficulty Filter */}
          <DifficultyFilter
            selectedDifficulty={selectedDifficulty}
            setSelectedDifficulty={setSelectedDifficulty}
          />
        </div>
      </div>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <motion.div 
          className="grid gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {filteredFixes.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500">No plumbing fixes match your search.</p>
            </div>
          ) : (
            filteredFixes.map((fix) => (
              <FixItem 
                key={fix.id}
                fix={fix}
                expandedFix={expandedFix}
                setExpandedFix={setExpandedFix}
                completedSteps={completedSteps[fix.id] || []}
                toggleStepCompletion={toggleStepCompletion}
              />
            ))
          )}
        </motion.div>
      </main>
    </div>
  );
};

export default Fixes;
