
import React from "react";
import { PageLayout } from "@/components/shared/PageLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAgentSpecialtyResolver } from "@/hooks/useAgentSpecialtyResolver";
import EveryFixHeader from "@/components/shared/EveryFixHeader";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

const Answers = () => {
  const specialty = useAgentSpecialtyResolver();
  
  return (
    <PageLayout>
      <EveryFixHeader 
        title="Answer Directory"
        subtitle="Search through our knowledge base of answers"
      />
      
      <div className="container mx-auto px-4 py-8">
        <div className="relative mb-6">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search knowledge base..." 
            className="pl-10" 
          />
        </div>
        
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Directory of Answers</CardTitle>
            <CardDescription>
              Find solutions to common questions across all specialties
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p>
              This page will provide access to a searchable database of answers from all our AI agents,
              organized by categories and specialties.
            </p>
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  );
};

export default Answers;
