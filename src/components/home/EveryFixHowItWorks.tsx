
import React from "react";
import { Camera, Zap, Wrench } from "lucide-react";

const EveryFixHowItWorks = () => {
  return (
    <>
      <h2 className="text-3xl font-bold mb-8 text-center bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">How It Works</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
        <div className="backdrop-blur-lg bg-white/20 border border-white/30 rounded-xl shadow-lg hover:shadow-xl transition-all p-8">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
            <Camera className="h-8 w-8 text-white" />
          </div>
          <h3 className="font-semibold text-xl mb-3 text-center text-primary">Choose Your Assistant</h3>
          <p className="text-gray-700 text-center">Select the AI assistant that matches your home challenge</p>
        </div>
        <div className="backdrop-blur-lg bg-white/20 border border-white/30 rounded-xl shadow-lg hover:shadow-xl transition-all p-8">
          <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
            <Zap className="h-8 w-8 text-white" />
          </div>
          <h3 className="font-semibold text-xl mb-3 text-center text-primary">Describe or Show</h3>
          <p className="text-gray-700 text-center">Chat or upload a photo of your problem</p>
        </div>
        <div className="backdrop-blur-lg bg-white/20 border border-white/30 rounded-xl shadow-lg hover:shadow-xl transition-all p-8">
          <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
            <Wrench className="h-8 w-8 text-white" />
          </div>
          <h3 className="font-semibold text-xl mb-3 text-center text-primary">Get Expert Guidance</h3>
          <p className="text-gray-700 text-center">Follow personalized instructions to solve your issue</p>
        </div>
      </div>
    </>
  );
};

export default EveryFixHowItWorks;
