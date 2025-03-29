
import React from "react";
import { PageLayout } from "@/components/shared/PageLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAgentSpecialtyResolver } from "@/hooks/useAgentSpecialtyResolver";
import EveryFixHeader from "@/components/shared/EveryFixHeader";

const Agents = () => {
  const specialty = useAgentSpecialtyResolver();
  
  return (
    <PageLayout>
      <EveryFixHeader 
        title="Available Agents"
        subtitle="Find and activate AI agents specialized in different domains"
      />
      
      <div className="container mx-auto px-4 py-8">
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Connect to AI Agents</CardTitle>
            <CardDescription>
              Browse through our collection of specialized AI agents
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p>
              This page will show the list of all available agents you can connect with, along with their 
              subscription status, capabilities, and token consumption rates.
            </p>
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  );
};

export default Agents;
