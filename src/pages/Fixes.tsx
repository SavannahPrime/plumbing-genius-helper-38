
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Clock, Search, Wrench } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const categories = [
  { id: 'all', label: 'All', icon: '🏠' },
  { id: 'leaks', label: 'Leaks', icon: '🚰' },
  { id: 'toilets', label: 'Toilets', icon: '🚽' },
  { id: 'drains', label: 'Drains & Pipes', icon: '🛠️' },
  { id: 'heaters', label: 'Water Heaters', icon: '🔥' },
];

const fixes = [
  {
    id: 1,
    title: "Fix a Leaky Faucet",
    description: "Step-by-step guide to stop leaks.",
    time: "20-30 min",
    category: "leaks",
    difficulty: "Easy",
  },
  {
    id: 2,
    title: "Unclog a Drain",
    description: "Clear stubborn drain blockages.",
    time: "15-20 min",
    category: "drains",
    difficulty: "Easy",
  },
];

const Fixes = () => {
  return (
    <div className="min-h-screen bg-[#F5F5F5]">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center mb-4">
            <Link to="/" className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <ArrowLeft className="w-6 h-6 text-[#0A2540]" />
            </Link>
            <div className="ml-4">
              <h1 className="font-inter font-bold text-[22px] text-[#0A2540]">
                Common Plumbing Fixes
              </h1>
            </div>
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" />
            <Input 
              className="pl-10" 
              placeholder="Search for a plumbing issue..."
            />
          </div>
        </div>
      </header>

      {/* Category Tabs */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="flex gap-2 overflow-x-auto py-2 no-scrollbar">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant="ghost"
                className="whitespace-nowrap"
              >
                <span className="mr-2">{category.icon}</span>
                {category.label}
              </Button>
            ))}
          </div>
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
          {fixes.map((fix) => (
            <Card key={fix.id} className="p-4 hover:shadow-md transition-shadow cursor-pointer">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-[#00AEEF]/10 flex items-center justify-center flex-shrink-0">
                  <Wrench className="w-6 h-6 text-[#00AEEF]" />
                </div>
                <div className="flex-grow">
                  <h3 className="font-inter font-semibold text-lg text-gray-900 mb-1">
                    {fix.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-2">{fix.description}</p>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Clock className="w-4 h-4" />
                    <span>{fix.time}</span>
                    <span className="px-2 py-1 bg-gray-100 rounded-full text-xs">
                      {fix.difficulty}
                    </span>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </motion.div>
      </main>
    </div>
  );
};

export default Fixes;
