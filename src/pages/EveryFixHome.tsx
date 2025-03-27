
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Wrench, Leaf, Sparkles, Zap } from "lucide-react";
import { motion } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

const EveryFixHome = () => {
  const products = [
    {
      name: "Plumber's Helper",
      description: "Your AI plumbing expert. Fix leaks, clogs, and more without calling a plumber.",
      icon: <Wrench className="h-6 w-6 text-white" />,
      emoji: "🔧",
      path: "/plumber",
      color: "bg-gradient-to-r from-blue-400 to-blue-600",
      avatar: "/lovable-uploads/1d4662ea-cc69-4e4f-9c18-078726ebe91e.png",
      avatarFallback: "🔧",
      bgClass: "bg-blue-50"
    },
    {
      name: "Cleaning Genius",
      description: "The AI that knows how to clean anything — without Googling.",
      icon: <Sparkles className="h-6 w-6 text-white" />,
      emoji: "🧼",
      path: "/cleaning",
      color: "bg-gradient-to-r from-blue-400 to-blue-500",
      avatar: "/lovable-uploads/8b852c7f-6b8c-40ef-9d7a-b38e45699b56.png",
      avatarFallback: "🧼",
      bgClass: "bg-blue-50"
    },
    {
      name: "Handyman Hero",
      description: "Fix furniture, patch walls, hang shelves — no handyman required.",
      icon: <Wrench className="h-6 w-6 text-white" />,
      emoji: "🔧",
      path: "/handyman",
      color: "bg-gradient-to-r from-orange-400 to-orange-600",
      avatar: "/lovable-uploads/c8ef72aa-6bbc-4cde-a827-e42f3bc112a0.png",
      avatarFallback: "🔨",
      bgClass: "bg-orange-50"
    },
    {
      name: "Electrician Genius",
      description: "Flip the switch on electrical problems — safely and smart.",
      icon: <Zap className="h-6 w-6 text-white" />,
      emoji: "⚡",
      path: "/electrician",
      color: "bg-gradient-to-r from-yellow-400 to-yellow-600",
      avatar: "/lovable-uploads/3be27937-18fe-451e-a339-37459edc18bb.png",
      avatarFallback: "⚡",
      bgClass: "bg-yellow-50"
    },
    {
      name: "Landscaper Buddy",
      description: "Your AI yard partner — from soil to sprinkler.",
      icon: <Leaf className="h-6 w-6 text-white" />,
      emoji: "🌿",
      path: "/landscaper",
      color: "bg-gradient-to-r from-green-400 to-green-600",
      avatar: "/lovable-uploads/3be27937-18fe-451e-a339-37459edc18bb.png",
      avatarFallback: "🌿",
      bgClass: "bg-green-50"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-center">
            <div className="text-center">
              <h1 className="text-3xl md:text-4xl font-bold font-space-grotesk text-primary mb-2">
                EveryFixAI
              </h1>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Your personal AI assistants for every home challenge — from plumbing and electrical to cleaning and landscaping.
              </p>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {products.map((product, index) => (
            <motion.div
              key={product.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link to={product.path} className="block h-full no-underline">
                <Card className={`h-full shadow-md hover:shadow-lg transition-all ${product.bgClass} cursor-pointer`}>
                  <CardHeader className={`${product.color} text-white rounded-t-xl`}>
                    <div className="flex justify-between items-center">
                      <div>
                        <CardTitle className="text-xl font-bold">
                          {product.emoji} {product.name}
                        </CardTitle>
                        <CardDescription className="text-white/90 mt-1">
                          Your AI Assistant
                        </CardDescription>
                      </div>
                      <Avatar className="h-12 w-12 border-2 border-white">
                        <AvatarImage src={product.avatar} alt={product.name} />
                        <AvatarFallback className="text-xl">{product.avatarFallback}</AvatarFallback>
                      </Avatar>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <p className="text-gray-700">{product.description}</p>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full" variant="outline">
                      Explore {product.name}
                    </Button>
                  </CardFooter>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-4">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-xl">1</span>
              </div>
              <h3 className="font-medium mb-2">Choose Your Assistant</h3>
              <p className="text-sm text-gray-600">Select the AI assistant that matches your home challenge</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-xl">2</span>
              </div>
              <h3 className="font-medium mb-2">Describe or Show</h3>
              <p className="text-sm text-gray-600">Chat or upload a photo of your problem</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-xl">3</span>
              </div>
              <h3 className="font-medium mb-2">Get Expert Guidance</h3>
              <p className="text-sm text-gray-600">Follow personalized instructions to solve your issue</p>
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-white border-t py-8">
        <div className="container mx-auto px-4 text-center text-sm text-gray-500">
          <p>© 2023 EveryFixAI. All AI assistants are here to help you tackle home projects with confidence.</p>
          <p className="mt-2">For emergencies or complex issues, always consult a professional.</p>
        </div>
      </footer>
    </div>
  );
};

export default EveryFixHome;
