
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Camera, Upload } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Diagnosis = () => {
  return (
    <div className="min-h-screen bg-[#F5F5F5]">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center">
          <Link to="/" className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <ArrowLeft className="w-6 h-6 text-[#0A2540]" />
          </Link>
          <div className="ml-4">
            <h1 className="font-inter font-bold text-[22px] text-[#0A2540]">
              Visual Diagnosis
            </h1>
            <p className="font-roboto text-[16px] text-gray-600">
              Upload a photo, and our AI will analyze the issue.
            </p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col md:flex-row gap-8 items-center"
          >
            {/* Plumber Character */}
            <motion.div 
              className="w-full md:w-1/3"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <img 
                src="/lovable-uploads/8b852c7f-6b8c-40ef-9d7a-b38e45699b56.png" 
                alt="Friendly Plumber" 
                className="w-full max-w-[250px] mx-auto md:mx-0"
              />
              <div className="bg-white p-4 rounded-lg mt-4 shadow-sm">
                <p className="font-inter font-medium text-center md:text-left">
                  "Hi there! Share a photo of your plumbing issue, and I'll help diagnose the problem."
                </p>
              </div>
            </motion.div>

            {/* Upload Card */}
            <Card className="p-8 text-center w-full md:w-2/3">
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 cursor-pointer hover:border-[#00AEEF] transition-colors">
                <div className="flex flex-col items-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-[#00AEEF]/10 flex items-center justify-center">
                    <Camera className="w-8 h-8 text-[#00AEEF]" />
                  </div>
                  <h3 className="font-inter font-semibold text-xl text-gray-900">
                    Tap to Upload a Photo
                  </h3>
                  <p className="text-gray-600 max-w-sm">
                    Take a clear photo of the plumbing issue, and our AI will analyze it for you.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 mt-4 w-full max-w-xs mx-auto">
                    <Button className="bg-[#0A2540] w-full">
                      <Camera className="w-5 h-5 mr-2" />
                      Take Photo
                    </Button>
                    <Button variant="outline" className="w-full">
                      <Upload className="w-5 h-5 mr-2" />
                      Upload Image
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default Diagnosis;
