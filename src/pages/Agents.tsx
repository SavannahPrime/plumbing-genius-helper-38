import React, { useState, useMemo } from "react";
import { PageLayout } from "@/components/shared/PageLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { useAgentSpecialtyResolver } from "@/hooks/useAgentSpecialtyResolver";
import EveryFixHeader from "@/components/shared/EveryFixHeader";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { 
  Coins, 
  Star, 
  Search, 
  Filter,
  ArrowRight,
  Sparkles,
  MessageSquare,
  Check,
  Shield
} from "lucide-react";
import { specializedAgents } from "@/services/specializedAgentService";
import { ELEVEN_LABS_AGENT_IDS } from "@/constants/elevenlabs";
import { Link } from "react-router-dom";

// Define pricing tiers
type PricingTier = "Free" | "Standard" | "Premium";

// Define agent type with pricing information
interface Agent {
  id: string;
  name: string;
  description: string;
  specialty: string;
  category: string;
  pricingTier: PricingTier;
  price: number; // Price in TXT tokens
  monthlyPrice: number; // Price in USD
  avatarUrl: string;
  avatarFallback: string;
  featured: boolean;
  bgClass: string;
  colorClass: string;
  rating?: number;
  benefits?: string[];
}

const Agents = () => {
  const specialty = useAgentSpecialtyResolver();
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [pricingFilter, setPricingFilter] = useState<string>("all");
  
  // Agent data with pricing tiers and categories
  const agents: Agent[] = [
    {
      id: ELEVEN_LABS_AGENT_IDS.plumber,
      name: "Home Fix Wizard",
      description: "Your AI home repair expert. Fix leaks, clogs, and more without calling a contractor.",
      specialty: "plumber",
      category: "Home Repair",
      pricingTier: "Free",
      price: 0,
      monthlyPrice: 0,
      avatarUrl: "/lovable-uploads/1d4662ea-cc69-4e4f-9c18-078726ebe91e.png",
      avatarFallback: "🔧",
      featured: true,
      bgClass: "bg-gradient-to-br from-blue-50/80 to-blue-100/90",
      colorClass: "bg-gradient-to-r from-blue-500 to-blue-600",
      rating: 4.9,
      benefits: ["Step-by-step instructions", "Photo analysis", "Voice guidance"]
    },
    {
      id: ELEVEN_LABS_AGENT_IDS.handyman,
      name: "Handyman Hero",
      description: "Fix furniture, patch walls, hang shelves — no handyman required.",
      specialty: "handyman",
      category: "Home Repair",
      pricingTier: "Free",
      price: 0,
      monthlyPrice: 0,
      avatarUrl: "/lovable-uploads/c8ef72aa-6bbc-4cde-a827-e42f3bc112a0.png",
      avatarFallback: "🔨",
      featured: false,
      bgClass: "bg-gradient-to-br from-orange-50/80 to-orange-100/90",
      colorClass: "bg-gradient-to-r from-orange-500 to-orange-600",
      rating: 4.7,
      benefits: ["Assembly instructions", "Repair guidance", "Tool recommendations"]
    },
    {
      id: ELEVEN_LABS_AGENT_IDS.gadget,
      name: "Gadget Fix Genie",
      description: "Troubleshoot phones, tablets, routers, remotes and other electronic devices.",
      specialty: "gadget",
      category: "Tech",
      pricingTier: "Free",
      price: 0,
      monthlyPrice: 0,
      avatarUrl: "/lovable-uploads/8b852c7f-6b8c-40ef-9d7a-b38e45699b56.png",
      avatarFallback: "📱",
      featured: false,
      bgClass: "bg-gradient-to-br from-purple-50/80 to-purple-100/90",
      colorClass: "bg-gradient-to-r from-purple-500 to-purple-600",
      rating: 4.8,
      benefits: ["Device troubleshooting", "Software solutions", "Hardware diagnostics"]
    },
    {
      id: ELEVEN_LABS_AGENT_IDS.tax,
      name: "Tax Law Attorney",
      description: "Expert AI tax advice and legal guidance for complex financial situations.",
      specialty: "tax",
      category: "Legal",
      pricingTier: "Premium",
      price: 350,
      monthlyPrice: 3.99,
      avatarUrl: "/lovable-uploads/c8ef72aa-6bbc-4cde-a827-e42f3bc112a0.png",
      avatarFallback: "⚖️",
      featured: true,
      bgClass: "bg-gradient-to-br from-indigo-50/80 to-indigo-100/90",
      colorClass: "bg-gradient-to-r from-indigo-500 to-indigo-600",
      rating: 4.9,
      benefits: ["Tax law expertise", "Financial guidance", "Legal document review"]
    },
    {
      id: ELEVEN_LABS_AGENT_IDS.psychiatrist,
      name: "Confidential Psychiatrist",
      description: "Private AI mental health consultation and guidance for emotional well-being.",
      specialty: "psychiatrist",
      category: "Health",
      pricingTier: "Premium",
      price: 350,
      monthlyPrice: 3.99,
      avatarUrl: "/lovable-uploads/8b852c7f-6b8c-40ef-9d7a-b38e45699b56.png",
      avatarFallback: "🧠",
      featured: true,
      bgClass: "bg-gradient-to-br from-teal-50/80 to-teal-100/90",
      colorClass: "bg-gradient-to-r from-teal-500 to-teal-600",
      rating: 4.8,
      benefits: ["Mental health support", "Coping strategies", "Personalized guidance"]
    },
    {
      id: ELEVEN_LABS_AGENT_IDS.financial,
      name: "Financial Advisor",
      description: "Professional AI investment planning and financial guidance tailored to your goals.",
      specialty: "financial",
      category: "Finance",
      pricingTier: "Premium",
      price: 350,
      monthlyPrice: 3.99,
      avatarUrl: "/lovable-uploads/1d4662ea-cc69-4e4f-9c18-078726ebe91e.png",
      avatarFallback: "💼",
      featured: true,
      bgClass: "bg-gradient-to-br from-emerald-50/80 to-emerald-100/90",
      colorClass: "bg-gradient-to-r from-emerald-500 to-emerald-600",
      rating: 4.9,
      benefits: ["Investment strategies", "Retirement planning", "Debt management"]
    },
    {
      id: ELEVEN_LABS_AGENT_IDS.wellness,
      name: "Wellness Coach",
      description: "Personalized AI health and wellness guidance for a balanced lifestyle.",
      specialty: "wellness",
      category: "Health",
      pricingTier: "Standard",
      price: 175,
      monthlyPrice: 1.99,
      avatarUrl: "/lovable-uploads/8b852c7f-6b8c-40ef-9d7a-b38e45699b56.png",
      avatarFallback: "❤️",
      featured: false,
      bgClass: "bg-rose-50",
      colorClass: "bg-gradient-to-r from-rose-400 to-rose-600"
    },
    {
      id: ELEVEN_LABS_AGENT_IDS.legal,
      name: "Legal Consultant",
      description: "General AI legal advice for everyday matters and common legal questions.",
      specialty: "legal",
      category: "Legal",
      pricingTier: "Standard",
      price: 175,
      monthlyPrice: 1.99,
      avatarUrl: "/lovable-uploads/c8ef72aa-6bbc-4cde-a827-e42f3bc112a0.png",
      avatarFallback: "📄",
      featured: false,
      bgClass: "bg-stone-50",
      colorClass: "bg-gradient-to-r from-stone-400 to-stone-600"
    },
    {
      id: ELEVEN_LABS_AGENT_IDS.career,
      name: "Career Coach",
      description: "Strategic guidance for career development, job searching, and professional growth.",
      specialty: "career",
      category: "Career",
      pricingTier: "Standard",
      price: 175,
      monthlyPrice: 1.99,
      avatarUrl: "/lovable-uploads/8b852c7f-6b8c-40ef-9d7a-b38e45699b56.png",
      avatarFallback: "🎓",
      featured: false,
      bgClass: "bg-cyan-50",
      colorClass: "bg-gradient-to-r from-blue-500 to-cyan-500"
    },
    {
      id: ELEVEN_LABS_AGENT_IDS.relationship,
      name: "Relationship Coach",
      description: "Guidance for healthy relationships, communication skills, and conflict resolution.",
      specialty: "relationship",
      category: "Personal",
      pricingTier: "Standard",
      price: 175,
      monthlyPrice: 1.99,
      avatarUrl: "/lovable-uploads/8b852c7f-6b8c-40ef-9d7a-b38e45699b56.png",
      avatarFallback: "💕",
      featured: false,
      bgClass: "bg-pink-50",
      colorClass: "bg-gradient-to-r from-pink-400 to-pink-500"
    },
    {
      id: ELEVEN_LABS_AGENT_IDS.nutrition,
      name: "Nutrition Coach",
      description: "Expert advice on balanced eating, meal planning, and nutritional science.",
      specialty: "nutrition",
      category: "Health",
      pricingTier: "Standard",
      price: 175,
      monthlyPrice: 1.99,
      avatarUrl: "/lovable-uploads/1d4662ea-cc69-4e4f-9c18-078726ebe91e.png",
      avatarFallback: "🥗",
      featured: false,
      bgClass: "bg-green-50",
      colorClass: "bg-gradient-to-r from-green-400 to-green-500"
    },
    {
      id: ELEVEN_LABS_AGENT_IDS.electrician,
      name: "Electrician Genius",
      description: "Flip the switch on electrical problems — safely and smart.",
      specialty: "electrician",
      category: "Home Repair",
      pricingTier: "Free",
      price: 0,
      monthlyPrice: 0,
      avatarUrl: "/lovable-uploads/3be27937-18fe-451e-a339-37459edc18bb.png",
      avatarFallback: "⚡",
      featured: false,
      bgClass: "bg-yellow-50",
      colorClass: "bg-gradient-to-r from-yellow-400 to-yellow-600"
    }
  ];
  
  // Extract unique categories
  const categories = ["all", ...new Set(agents.map(agent => agent.category))];
  
  // Filter agents based on search, category and pricing
  const filteredAgents = useMemo(() => {
    return agents.filter(agent => {
      const matchesSearch = agent.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            agent.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = categoryFilter === "all" || agent.category === categoryFilter;
      const matchesPricing = pricingFilter === "all" || agent.pricingTier === pricingFilter;
      
      return matchesSearch && matchesCategory && matchesPricing;
    });
  }, [agents, searchQuery, categoryFilter, pricingFilter]);
  
  return (
    <PageLayout>
      <EveryFixHeader 
        title="AI Agent Directory"
        subtitle="Browse our collection of specialized AI agents for every need"
      />
      
      <div className="container mx-auto px-4 py-8">
        <Card className="mb-8 border-none shadow-lg bg-white/90 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4 items-center">
              <div className="relative flex-grow">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search agents..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 w-full bg-gray-50 border-gray-200"
                />
              </div>
              
              <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                <div className="flex items-center gap-2">
                  <Filter className="h-4 w-4 text-gray-500" />
                  <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                    <SelectTrigger className="w-[180px] bg-gray-50 border-gray-200">
                      <SelectValue placeholder="Category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map(category => (
                        <SelectItem key={category} value={category}>
                          {category === "all" ? "All Categories" : category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <Select value={pricingFilter} onValueChange={setPricingFilter}>
                  <SelectTrigger className="w-[180px] bg-gray-50 border-gray-200">
                    <SelectValue placeholder="Pricing" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Pricing</SelectItem>
                    <SelectItem value="Free">Free</SelectItem>
                    <SelectItem value="Standard">Standard (175 TXT)</SelectItem>
                    <SelectItem value="Premium">Premium (350 TXT)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAgents.map((agent) => (
            <Card 
              key={agent.id} 
              className={`overflow-hidden transition-all duration-300 hover:shadow-xl border-none shadow-md hover:-translate-y-1 ${agent.bgClass}`}
            >
              <CardHeader className={`${agent.colorClass} text-white relative p-6`}>
                {agent.featured && (
                  <div className="absolute top-3 right-3 z-10">
                    <div className="bg-yellow-300 text-yellow-900 px-2 py-1 rounded-full flex items-center shadow-lg">
                      <Sparkles className="h-3 w-3 fill-yellow-900 mr-1" />
                      <span className="text-xs font-semibold">Featured</span>
                    </div>
                  </div>
                )}
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle className="text-xl font-bold">
                      {agent.name}
                    </CardTitle>
                    <CardDescription className="text-white/90 mt-1 text-sm font-medium">
                      <span className="mr-2">{agent.avatarFallback}</span> {agent.category} Specialist
                    </CardDescription>
                  </div>
                  <Avatar className="h-16 w-16 border-2 border-white shadow-lg">
                    <AvatarImage src={agent.avatarUrl} alt={agent.name} />
                    <AvatarFallback>{agent.avatarFallback}</AvatarFallback>
                  </Avatar>
                </div>
                
                {agent.rating && (
                  <div className="flex items-center mt-2">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={`h-4 w-4 ${i < Math.floor(agent.rating) ? "fill-yellow-300 text-yellow-300" : "text-white/30"}`} 
                        />
                      ))}
                    </div>
                    <span className="ml-2 text-sm font-medium">{agent.rating}</span>
                  </div>
                )}
              </CardHeader>
              
              <CardContent className="p-6">
                <p className="text-gray-700 text-sm mb-5">{agent.description}</p>
                
                {agent.benefits && agent.benefits.length > 0 && (
                  <div className="mb-5">
                    <h4 className="text-sm font-semibold text-gray-700 mb-2">Key Benefits:</h4>
                    <ul className="space-y-1.5">
                      {agent.benefits.map((benefit, index) => (
                        <li key={index} className="flex items-start text-sm">
                          <Check className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-600">{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                
                <div className="flex items-center justify-between">
                  <Badge 
                    variant={agent.pricingTier === "Free" ? "outline" : 
                          agent.pricingTier === "Standard" ? "secondary" : "default"}
                    className={`rounded-full font-medium ${
                      agent.pricingTier === "Premium" ? "bg-gradient-to-r from-blue-600 to-indigo-600" :
                      agent.pricingTier === "Standard" ? "bg-gradient-to-r from-purple-500 to-purple-600" : 
                      "border-blue-300 text-blue-600"
                    }`}
                  >
                    {agent.pricingTier === "Free" ? "Free" : 
                    agent.pricingTier === "Standard" ? "Standard" : "Premium"}
                  </Badge>
                  
                  {agent.price > 0 && (
                    <div className="flex items-center text-sm font-medium bg-amber-50 px-2 py-1 rounded-full">
                      <Coins className="h-3 w-3 mr-1 text-amber-500" />
                      <span className="text-amber-700">{agent.price} TXT</span>
                    </div>
                  )}
                </div>
                
                {agent.price > 0 && (
                  <div className="mt-2 text-xs text-right text-gray-500">
                    ${agent.monthlyPrice}/month
                  </div>
                )}
              </CardContent>
              
              <CardFooter className="p-5 pt-0">
                <Link to={`/chat?specialty=${agent.specialty}`} className="w-full">
                  <Button 
                    className={`w-full group hover:shadow-md ${
                      agent.pricingTier === "Premium" ? "bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700" :
                      agent.pricingTier === "Standard" ? "bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700" :
                      "bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700"
                    }`}
                  >
                    <MessageSquare className="mr-2 h-4 w-4" /> 
                    Start Chatting
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
        
        {filteredAgents.length === 0 && (
          <div className="text-center py-10">
            <p className="text-gray-500">No agents found matching your filters.</p>
            <Button 
              variant="link" 
              onClick={() => {
                setSearchQuery('');
                setCategoryFilter('all');
                setPricingFilter('all');
              }}
            >
              Clear all filters
            </Button>
          </div>
        )}
      </div>
    </PageLayout>
  );
};

export default Agents;
