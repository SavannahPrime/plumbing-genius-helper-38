
import React from 'react';
import Header from '@/components/home/Header';
import ModernHero from '@/components/home/ModernHero';
import HowItWorks from '@/components/home/HowItWorks';
import ProblemCategories from '@/components/home/ProblemCategories';
import LiveFixFeed from '@/components/home/LiveFixFeed';
import Footer from '@/components/home/Footer';
import { useActiveAgents } from '@/hooks/useActiveAgents';

const EveryFixHome = () => {
  // Initialize active agents on first load
  useActiveAgents();
  
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-1">
        <ModernHero />
        <HowItWorks />
        <ProblemCategories />
        <LiveFixFeed />
      </main>
      <Footer />
    </div>
  );
};

export default EveryFixHome;
