
import React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Wrench, Zap, Leaf, Smartphone } from "lucide-react";
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
  iconColor
}: { 
  icon: React.ReactNode; 
  emoji: string; 
  title: string; 
  tagline: string; 
  path: string;
  color: string;
  hoverColor: string;
  iconColor: string;
}) => {
  return (
    <motion.div
      className={`bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all ${color}`}
      whileHover={{ y: -5 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center gap-3 mb-3">
        <div className={`w-10 h-10 rounded-full ${iconColor} flex items-center justify-center`}>
          {icon}
        </div>
        <h3 className="font-space-grotesk font-bold text-lg">{emoji} {title}</h3>
      </div>
      <p className="text-sm text-neutrals mb-4">{tagline}</p>
      <Link to={path}>
        <Button variant="outline" className={`w-full hover:${hoverColor} border-gray-200 hover:border-gray-300 transition-all duration-200`}>
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
    <section className="my-16">
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
          color="bg-blue-50 hover:bg-blue-100"
          hoverColor="bg-blue-100"
          iconColor="bg-cyan-500"
        />
        
        <ProductCard
          icon={<Wrench className="w-5 h-5 text-white" />}
          emoji="🔧"
          title="Handyman Hero"
          tagline="Fix furniture, patch walls, hang shelves — no handyman required."
          path="/handyman"
          color="bg-orange-50 hover:bg-orange-100"
          hoverColor="bg-orange-100"
          iconColor="bg-orange-500"
        />
        
        <ProductCard
          icon={<Zap className="w-5 h-5 text-white" />}
          emoji="⚡"
          title="Electrician Genius"
          tagline="Flip the switch on electrical problems — safely and smart."
          path="/electrician"
          color="bg-yellow-50 hover:bg-yellow-100"
          hoverColor="bg-yellow-100"
          iconColor="bg-yellow-500"
        />
        
        <ProductCard
          icon={<Leaf className="w-5 h-5 text-white" />}
          emoji="🌿"
          title="Landscaper Buddy"
          tagline="Your AI yard partner — from soil to sprinkler."
          path="/landscaper"
          color="bg-green-50 hover:bg-green-100"
          hoverColor="bg-green-100"
          iconColor="bg-green-600"
        />
        
        <ProductCard
          icon={<Smartphone className="w-5 h-5 text-white" />}
          emoji="📱"
          title="Gadget Fix Genie"
          tagline="Troubleshoot phones, tablets, and other electronic devices."
          path="/gadgetfixgenie"
          color="bg-purple-50 hover:bg-purple-100"
          hoverColor="bg-purple-100"
          iconColor="bg-purple-600"
        />
      </div>
    </section>
  );
};

export default OtherProducts;
