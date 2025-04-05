
import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const CTASection = () => {
  return (
    <section className="container mx-auto px-4 py-20">
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-10 md:p-16 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to transform your software with AI?</h2>
        <p className="text-xl text-white/80 max-w-2xl mx-auto mb-8">
          Connect your applications with intelligent AI agents and unlock new possibilities today.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/chat?specialty=plumber">
            <Button className="bg-white text-blue-600 hover:bg-gray-100 text-lg px-8 py-6">
              Chat with Home Fix Wizard
            </Button>
          </Link>
          <Link to="/chat?specialty=tax">
            <Button variant="outline" className="border-white text-white hover:bg-white/10 text-lg px-8 py-6">
              Consult Tax Law Attorney
            </Button>
          </Link>
          <Link to="/chat?specialty=psychiatrist">
            <Button variant="outline" className="border-white text-white hover:bg-white/10 text-lg px-8 py-6">
              Speak with Psychiatrist
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
