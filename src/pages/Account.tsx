
import React from "react";
import { PageLayout } from "@/components/shared/PageLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import EveryFixHeader from "@/components/shared/EveryFixHeader";
import { Badge } from "@/components/ui/badge";
import { 
  Coins, 
  CreditCard, 
  Settings, 
  History,
  MessageSquare,
  Bell
} from "lucide-react";

const Account = () => {
  // Placeholder data - in a real app, this would come from a state or API
  const tokenBalance = 500;
  const subscriptionStatus = "Active";
  const subscriptionPlan = "Pro";
  
  return (
    <PageLayout>
      <EveryFixHeader 
        title="My Account"
        subtitle="Manage your profile, subscriptions and settings"
      />
      
      <div className="container mx-auto px-4 py-8 space-y-6">
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Token Balance</CardTitle>
              <Badge variant="outline" className="bg-green-50">
                {subscriptionStatus} - {subscriptionPlan}
              </Badge>
            </div>
            <CardDescription>
              Your current tokens for using AI services
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2 text-2xl font-bold">
              <Coins className="h-6 w-6 text-yellow-500" />
              <span>{tokenBalance} Tokens</span>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" size="sm">
              <History className="mr-2 h-4 w-4" />
              Usage History
            </Button>
            <Button>
              <CreditCard className="mr-2 h-4 w-4" />
              Buy Tokens
            </Button>
          </CardFooter>
        </Card>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Settings className="mr-2 h-5 w-5" />
                Settings
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Configure your account preferences, notification settings, and privacy options
              </p>
            </CardContent>
            <CardFooter>
              <Button variant="secondary" size="sm">Manage Settings</Button>
            </CardFooter>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Bell className="mr-2 h-5 w-5" />
                Notifications
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Control how and when you receive updates from Connect.Software
              </p>
            </CardContent>
            <CardFooter>
              <Button variant="secondary" size="sm">Manage Notifications</Button>
            </CardFooter>
          </Card>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <MessageSquare className="mr-2 h-5 w-5" />
              Recent Conversations
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              View your recent interactions with our AI agents
            </p>
            <div className="border rounded-md p-4 mt-4 text-center text-muted-foreground">
              No recent conversations
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" size="sm">View All Conversations</Button>
          </CardFooter>
        </Card>
      </div>
    </PageLayout>
  );
};

export default Account;
