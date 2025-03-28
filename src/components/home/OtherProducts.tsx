
import React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Wrench, Zap, Leaf, Smartphone, Paintbrush, LifeBuoy, User } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const ProductCard = ({ 
  icon, 
  emoji, 
  title, 
  tagline, 
  path, 
  color,
  hoverColor,
  iconColor,
  buttonTextColor
}: { 
  icon: React.ReactNode; 
  emoji: string; 
  title: string; 
  tagline: string; 
  path: string;
  color: string;
  hoverColor: string;
  iconColor: string;
  buttonTextColor?: string;
}) => {
  return (
    <motion.div
      className={`p-6 rounded-xl backdrop-blur-md border border-white/20 shadow-xl hover:shadow-2xl transition-all ${color}`}
      whileHover={{ y: -8, scale: 1.02 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center gap-3 mb-3">
        <div className={`w-12 h-12 rounded-full ${iconColor} flex items-center justify-center shadow-lg`}>
          {icon}
        </div>
        <h3 className="font-space-grotesk font-bold text-lg">{emoji} {title}</h3>
      </div>
      <p className="text-sm text-neutrals mb-6">{tagline}</p>
      <Link to={path}>
        <Button variant="outline" className={`w-full hover:${hoverColor} border-white/30 hover:border-white/50 backdrop-blur-sm shadow-md hover:shadow-lg transition-all duration-300 ${buttonTextColor || ''}`}>
          Explore
        </Button>
      </Link>
    </motion.div>
  );
};

interface OtherProductsProps {
  title?: string;
}

const OtherProducts: React.FC<OtherProductsProps> = ({ title = "Other Products" }) => {
  return (
    <section className="my-16 relative">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-100/60 to-blue-50/60 rounded-3xl -z-10 blur-xl"></div>
      
      <div className="text-center mb-10">
        <h2 className="text-2xl md:text-3xl font-bold font-space-grotesk mb-4">{title}</h2>
        <p className="text-neutrals">Discover our suite of AI-powered home assistants</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        <ProductCard
          icon={<Sparkles className="w-5 h-5 text-white" />}
          emoji="🧼"
          title="Cleaning Genius"
          tagline="The AI that knows how to clean anything — without Googling."
          path="/cleaning"
          color="bg-cyan-100/80"
          hoverColor="bg-cyan-200/90"
          iconColor="bg-gradient-to-br from-cyan-400 to-cyan-600"
          buttonTextColor="text-cyan-700 hover:text-cyan-800"
        />
        
        <ProductCard
          icon={<Wrench className="w-5 h-5 text-white" />}
          emoji="🔧"
          title="Handyman Hero"
          tagline="Fix furniture, patch walls, hang shelves — no handyman required."
          path="/handyman"
          color="bg-amber-100/80"
          hoverColor="bg-amber-200/90"
          iconColor="bg-gradient-to-br from-amber-400 to-amber-600"
          buttonTextColor="text-amber-700 hover:text-amber-800"
        />
        
        <ProductCard
          icon={<Zap className="w-5 h-5 text-white" />}
          emoji="⚡"
          title="Electrician Genius"
          tagline="Flip the switch on electrical problems — safely and smart."
          path="/electrician"
          color="bg-gradient-to-r from-yellow-400 to-yellow-200/90"
          hoverColor="bg-yellow-200/90"
          iconColor="bg-gradient-to-br from-yellow-400 to-yellow-600"
          buttonTextColor="text-yellow-700 hover:text-yellow-800"
        />
        
        <ProductCard
          icon={<Leaf className="w-5 h-5 text-white" />}
          emoji="🌿"
          title="Landscaper Buddy"
          tagline="Your AI yard partner — from soil to sprinkler."
          path="/landscaper"
          color="bg-green-100/80"
          hoverColor="bg-green-200/90"
          iconColor="bg-gradient-to-br from-green-400 to-green-600"
          buttonTextColor="text-green-700 hover:text-green-800"
        />
        
        <ProductCard
          icon={<Smartphone className="w-5 h-5 text-white" />}
          emoji="📱"
          title="Gadget Fix Genie"
          tagline="Troubleshoot phones, tablets, and other electronic devices."
          path="/gadgetfixgenie"
          color="bg-indigo-100/80"
          hoverColor="bg-indigo-200/90"
          iconColor="bg-gradient-to-br from-indigo-400 to-indigo-600"
          buttonTextColor="text-indigo-700 hover:text-indigo-800"
        />

        <ProductCard
          icon={<Paintbrush className="w-5 h-5 text-white" />}
          emoji="🎨"
          title="Painting Helper"
          tagline="Your AI painting assistant for interior and exterior projects."
          path="/painter"
          color="bg-purple-100/80"
          hoverColor="bg-purple-200/90"
          iconColor="bg-gradient-to-br from-purple-400 to-purple-600"
          buttonTextColor="text-purple-700 hover:text-purple-800"
        />

        <ProductCard
          icon={<LifeBuoy className="w-5 h-5 text-white" />}
          emoji="🏊"
          title="Pool Assistant"
          tagline="Keep your pool crystal clear with expert maintenance advice."
          path="/pool"
          color="bg-blue-100/80"
          hoverColor="bg-blue-200/90"
          iconColor="bg-gradient-to-br from-blue-400 to-blue-600"
          buttonTextColor="text-blue-700 hover:text-blue-800"
        />

        <ProductCard
          icon={<User className="w-5 h-5 text-white" />}
          emoji="✨"
          title="Marie's Helper"
          tagline="Decluttering expert to help spark joy in your living spaces."
          path="/declutter"
          color="bg-pink-100/80"
          hoverColor="bg-pink-200/90"
          iconColor="bg-gradient-to-br from-pink-400 to-pink-600"
          buttonTextColor="text-pink-700 hover:text-pink-800"
        />
      </div>
    </section>
  );
};

export default OtherProducts;
