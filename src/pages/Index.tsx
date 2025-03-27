
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { 
  Wrench, 
  MessageSquare, 
  Image as ImageIcon, 
  Settings, 
  Toilet, 
  Droplet, 
  Bath, 
  Flame, 
  Trash2, 
  Info, 
  ArrowRight 
} from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const problemCategories = [
  { icon: <Toilet className="w-5 h-5" />, name: "Toilet", query: "I have a problem with my toilet." },
  { icon: <Droplet className="w-5 h-5" />, name: "Shower", query: "I have an issue with my shower." },
  { icon: <Droplet className="w-5 h-5" />, name: "Sink", query: "My sink is having problems." },
  { icon: <Bath className="w-5 h-5" />, name: "Bathtub", query: "I'm having issues with my bathtub." },
  { icon: <Flame className="w-5 h-5" />, name: "Water Heater", query: "My water heater isn't working properly." },
  { icon: <Trash2 className="w-5 h-5" />, name: "Garbage Disposal", query: "My garbage disposal is malfunctioning." },
  { icon: <Droplet className="w-5 h-5" />, name: "Leaking Pipe", query: "I have a leaking pipe." },
  { icon: <Droplet className="w-5 h-5" />, name: "Low Water Pressure", query: "I'm experiencing low water pressure." },
  { icon: <Info className="w-5 h-5" />, name: "Smells / Sewer", query: "There's a bad smell coming from my plumbing." },
];

const Index = () => {
  return (
    <div className="min-h-screen bg-[#F8F9FA] font-sans text-[#1D3557]">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Wrench className="w-7 h-7 text-[#1D3557]" />
            <span className="font-inter font-bold text-xl text-[#1D3557]">
              Plumber's Helper
            </span>
          </div>
          <nav className="text-sm text-[#607D8B] hidden md:block">
            <Link to="/fixes" className="mr-4 hover:underline">Find a Real Plumber</Link>
            <Link to="/fixes" className="hover:underline">Privacy</Link>
          </nav>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        {/* Hero Section with Character on the Left */}
        <section className="grid grid-cols-1 md:grid-cols-12 items-center gap-10 mb-12">
          {/* Animated Plumber Character */}
          <motion.div 
            className="md:col-span-4 flex justify-center relative order-2 md:order-1"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="relative">
              <div className="w-44 h-44 md:w-64 md:h-64 rounded-full bg-[#E3F2FD] flex items-center justify-center">
                <motion.div
                  animate={{ 
                    rotate: [0, 15, 0, -15, 0],
                  }}
                  transition={{ 
                    repeat: Infinity, 
                    duration: 5,
                    ease: "easeInOut"
                  }}
                >
                  <Wrench className="w-24 h-24 md:w-32 md:h-32 text-[#1D3557]" />
                </motion.div>
              </div>
              
              {/* Speech Bubble */}
              <div className="absolute -top-12 -right-16 md:-right-24 bg-white rounded-2xl p-3 shadow-md after:content-[''] after:absolute after:bottom-0 after:left-6 after:w-4 after:h-4 after:bg-white after:rotate-45 after:-mb-2">
                <p className="text-sm md:text-base font-medium">Let's fix that leaky mess!</p>
              </div>
            </div>
          </motion.div>

          {/* Hero Content */}
          <motion.div
            className="md:col-span-8 order-1 md:order-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Your AI-Powered Plumbing Assistant</h2>
            <p className="mb-6 text-lg text-[#37474F]">
              Talk to our AI plumber, upload photos, and get step-by-step help — instantly.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <Link to="/chat">
                <Button 
                  className="w-full sm:w-auto text-lg py-6 px-8 bg-[#1D3557] hover:bg-[#1D3557]/90 shadow-md active:scale-[0.98] transition-all"
                >
                  <MessageSquare className="w-5 h-5 mr-2" />
                  Start Chat
                </Button>
              </Link>
              <Link to="/diagnosis">
                <Button 
                  className="w-full sm:w-auto text-lg py-6 px-8 bg-[#4FC3F7] hover:bg-[#03A9F4] text-white shadow-md active:scale-[0.98] transition-all"
                >
                  <ImageIcon className="w-5 h-5 mr-2" />
                  Visual Diagnosis
                </Button>
              </Link>
            </div>
            <div className="text-sm text-[#78909C]">Or explore quick help topics below 👇</div>
          </motion.div>
        </section>

        {/* Quick Help Buttons */}
        <motion.section
          className="mt-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <h3 className="text-xl font-semibold mb-4">🧰 Common Issues</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {problemCategories.map((category, index) => (
              <Link 
                key={index} 
                to={`/chat?problem=${encodeURIComponent(category.query)}`}
                className="bg-white rounded-xl shadow-md p-4 text-left hover:shadow-lg transition-shadow"
              >
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center">
                    {category.icon}
                  </div>
                  <span>{category.name}</span>
                </div>
              </Link>
            ))}
          </div>
          <div className="flex justify-center mt-6">
            <Link to="/fixes" className="text-blue-600 hover:text-blue-800 text-sm flex items-center gap-1 font-medium">
              See all plumbing problems <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </motion.section>

        {/* Footer */}
        <motion.footer 
          className="mt-20 border-t pt-6 text-sm text-[#90A4AE] flex justify-between items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <p>&copy; {new Date().getFullYear()} Plumber's Helper. All rights reserved.</p>
          <Wrench className="w-6 h-6 text-[#90A4AE]" />
        </motion.footer>
      </main>
    </div>
  );
};

export default Index;
