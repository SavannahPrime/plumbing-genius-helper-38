
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { TokenBalance } from '@/types/global';
import { Coins, BarChart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

interface TokenBalanceDisplayProps {
  balance?: TokenBalance;
  showDetails?: boolean;
  className?: string;
}

const TokenBalanceDisplay: React.FC<TokenBalanceDisplayProps> = ({ 
  balance = {
    available: 1000,
    used: 500,
    subscription: {
      level: 'free',
      tokens: 1500,
      expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
    }
  }, 
  showDetails = true,
  className = ''
}) => {
  const navigate = useNavigate();
  const totalTokens = balance.subscription.tokens;
  const usedPercentage = Math.round((balance.used / totalTokens) * 100);
  const expiryDate = new Date(balance.subscription.expiresAt);
  
  const handleAddTokens = () => {
    navigate('/subscription?action=addTokens');
  };

  return (
    <Card className={`shadow-sm ${className}`}>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center gap-2">
          <Coins className="h-5 w-5 text-amber-500" />
          Token Balance
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">
              {balance.available} tokens available
            </span>
            <span className="text-sm font-medium">
              {usedPercentage}% used
            </span>
          </div>
          <Progress value={usedPercentage} className="h-2" />
        </div>
        
        {showDetails && (
          <>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div>
                <p className="text-muted-foreground">Subscription</p>
                <p className="font-medium capitalize">{balance.subscription.level}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Expires</p>
                <p className="font-medium">{expiryDate.toLocaleDateString()}</p>
              </div>
            </div>
            
            <Button 
              onClick={handleAddTokens} 
              variant="outline" 
              size="sm" 
              className="w-full"
            >
              Add More Tokens
            </Button>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default TokenBalanceDisplay;
