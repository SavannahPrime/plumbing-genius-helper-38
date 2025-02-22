
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
          >
            <Card className="p-12 text-center">
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 cursor-pointer hover:border-[#00AEEF] transition-colors">
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
                  <div className="flex gap-4 mt-4">
                    <Button className="bg-[#0A2540]">
                      <Camera className="w-5 h-5 mr-2" />
                      Take Photo
                    </Button>
                    <Button variant="outline">
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
