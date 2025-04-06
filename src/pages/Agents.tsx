
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
  ArrowRight
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
      bgClass: "bg-blue-50",
      colorClass: "bg-gradient-to-r from-blue-400 to-blue-600"
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
      bgClass: "bg-orange-50",
      colorClass: "bg-gradient-to-r from-orange-400 to-orange-600"
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
      bgClass: "bg-purple-50",
      colorClass: "bg-gradient-to-r from-purple-400 to-purple-600"
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
      bgClass: "bg-indigo-50",
      colorClass: "bg-gradient-to-r from-indigo-400 to-indigo-600"
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
      bgClass: "bg-teal-50",
      colorClass: "bg-gradient-to-r from-teal-400 to-teal-600"
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
      bgClass: "bg-emerald-50",
      colorClass: "bg-gradient-to-r from-emerald-400 to-emerald-600"
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
        <Card className="mb-8 border-none shadow-sm">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4 items-center">
              <div className="relative flex-grow">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search agents..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 w-full"
                />
              </div>
              
              <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                <div className="flex items-center gap-2">
                  <Filter className="h-4 w-4 text-gray-500" />
                  <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                    <SelectTrigger className="w-[180px]">
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
                  <SelectTrigger className="w-[180px]">
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
            <Card key={agent.id} className={`overflow-hidden transition-all duration-200 hover:shadow-md border border-gray-200 ${agent.bgClass}`}>
              <CardHeader className={`${agent.colorClass} text-white relative p-4`}>
                {agent.featured && (
                  <div className="absolute top-2 right-2 z-10">
                    <div className="bg-yellow-300 text-yellow-900 p-1 rounded-full flex items-center">
                      <Star className="h-3 w-3 fill-yellow-900 mr-1" />
                      <span className="text-xs font-medium">Featured</span>
                    </div>
                  </div>
                )}
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle className="text-lg font-bold">
                      {agent.avatarFallback} {agent.name}
                    </CardTitle>
                    <CardDescription className="text-white/90 mt-1 text-xs">
                      Your AI Assistant
                    </CardDescription>
                  </div>
                  <Avatar className="h-12 w-12 border-2 border-white">
                    <AvatarImage src={agent.avatarUrl} alt={agent.name} />
                    <AvatarFallback>{agent.avatarFallback}</AvatarFallback>
                  </Avatar>
                </div>
              </CardHeader>
              
              <CardContent className="p-4">
                <p className="text-gray-700 text-sm mb-3">{agent.description}</p>
                <div className="flex items-center justify-between mb-1">
                  <Badge variant={agent.pricingTier === "Free" ? "outline" : 
                         agent.pricingTier === "Standard" ? "secondary" : "default"}
                         className="rounded-full">
                    {agent.pricingTier === "Free" ? "Free" : 
                     agent.pricingTier === "Standard" ? "Standard" : "Premium"}
                  </Badge>
                  {agent.price > 0 && (
                    <div className="flex items-center text-sm font-medium">
                      <Coins className="h-3 w-3 mr-1 text-amber-500" />
                      <span>{agent.price} TXT</span>
                      <span className="mx-1 text-gray-400">|</span>
                      <span>${agent.monthlyPrice}/mo</span>
                    </div>
                  )}
                </div>
              </CardContent>
              
              <CardFooter className="p-4 pt-0">
                <Link to={`/chat?specialty=${agent.specialty}`} className="w-full">
                  <Button className="w-full group-hover:bg-primary/90 transition-colors" variant="outline">
                    Chat Now
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
