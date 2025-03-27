
import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Scissors, Search, Camera, Upload, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import EveryFixHeader from "@/components/shared/EveryFixHeader";

const Stylist = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-pink-100">
      <EveryFixHeader 
        title="Stylist's Helper" 
        icon={<Scissors className="w-7 h-7 text-white" />} 
        colorClass="w-8 h-8 rounded-full bg-gradient-to-r from-pink-400 to-pink-600 flex items-center justify-center"
      />

      <main className="container mx-auto px-4 py-12">
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto text-center"
        >
          <h1 className="text-3xl md:text-4xl font-bold font-space-grotesk text-primary mb-4">
            Your AI Stylist Assistant 💇
          </h1>
          <p className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto">
            Get personalized hair, fashion, and beauty advice from your AI styling expert.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            <Card className="bg-white shadow-lg hover:shadow-xl transition-all duration-300">
              <CardHeader className="bg-gradient-to-r from-pink-400 to-pink-600 text-white">
                <CardTitle className="text-xl flex items-center gap-2">
                  <Search className="h-5 w-5" /> Ask the Stylist
                </CardTitle>
                <CardDescription className="text-pink-100">
                  Chat with our AI stylist about any fashion or beauty question
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <p className="mb-4 text-gray-700">
                  Get advice on hairstyles, fashion choices, makeup tips, outfit coordination, and more.
                </p>
                <div className="space-y-3 mb-6">
                  <div className="bg-pink-50 p-3 rounded-md text-sm text-gray-700">
                    "What hairstyle suits my face shape?"
                  </div>
                  <div className="bg-pink-50 p-3 rounded-md text-sm text-gray-700">
                    "How do I style curly hair?"
                  </div>
                  <div className="bg-pink-50 p-3 rounded-md text-sm text-gray-700">
                    "What colors match with this outfit?"
                  </div>
                </div>
                <Button 
                  className="w-full bg-gradient-to-r from-pink-400 to-pink-600 hover:from-pink-500 hover:to-pink-700"
                  onClick={() => navigate("/chat")}
                >
                  Chat with Stylist Assistant
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-white shadow-lg hover:shadow-xl transition-all duration-300">
              <CardHeader className="bg-gradient-to-r from-pink-400 to-pink-600 text-white">
                <CardTitle className="text-xl flex items-center gap-2">
                  <Camera className="h-5 w-5" /> Show & Style
                </CardTitle>
                <CardDescription className="text-pink-100">
                  Upload a photo to get personalized style advice
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <p className="mb-4 text-gray-700">
                  Share a photo of your hair, outfit, or makeup to get real-time advice and styling suggestions.
                </p>
                <div className="bg-pink-50 rounded-md p-4 mb-6 flex flex-col items-center justify-center">
                  <Upload className="h-10 w-10 text-pink-400 mb-2" />
                  <p className="text-sm text-gray-600 text-center">
                    Upload a photo to get personalized style recommendations
                  </p>
                </div>
                <Button 
                  className="w-full bg-gradient-to-r from-pink-400 to-pink-600 hover:from-pink-500 hover:to-pink-700"
                  onClick={() => navigate("/diagnosis")}
                >
                  Upload Photo
                </Button>
              </CardContent>
            </Card>
          </div>

          <section className="bg-white rounded-xl shadow-md p-6 mb-8">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-pink-500" /> What Stylist's Helper Can Help With
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {[
                "Hairstyle advice", 
                "Hair care tips", 
                "Fashion choices",
                "Outfit coordination",
                "Makeup guidance",
                "Color matching",
                "Style trends",
                "Accessory selection",
                "Personal grooming"
              ].map((item, i) => (
                <div key={i} className="bg-pink-50 p-3 rounded-md text-sm">
                  {item}
                </div>
              ))}
            </div>
          </section>
        </motion.section>
      </main>
    </div>
  );
};

export default Stylist;
