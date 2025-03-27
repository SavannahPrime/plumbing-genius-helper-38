
import React from "react";
import { Camera, Zap, Wrench } from "lucide-react";

const EveryFixHowItWorks = () => {
  return (
    <>
      <h2 className="text-2xl font-bold mb-4">How It Works</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Camera className="h-6 w-6 text-primary" />
          </div>
          <h3 className="font-medium mb-2">Choose Your Assistant</h3>
          <p className="text-sm text-gray-600">Select the AI assistant that matches your home challenge</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Zap className="h-6 w-6 text-primary" />
          </div>
          <h3 className="font-medium mb-2">Describe or Show</h3>
          <p className="text-sm text-gray-600">Chat or upload a photo of your problem</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Wrench className="h-6 w-6 text-primary" />
          </div>
          <h3 className="font-medium mb-2">Get Expert Guidance</h3>
          <p className="text-sm text-gray-600">Follow personalized instructions to solve your issue</p>
        </div>
      </div>
    </>
  );
};

export default EveryFixHowItWorks;
