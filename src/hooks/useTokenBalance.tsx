
import { useState, useEffect } from 'react';
import { useLocalStorage } from './useLocalStorage';
import { TokenBalance } from '@/types/global';

const DEFAULT_BALANCE: TokenBalance = {
  available: 500,
  used: 0,
  subscription: {
    level: 'free',
    tokens: 500,
    expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
  }
};

export const useTokenBalance = () => {
  const [balance, setBalance] = useLocalStorage<TokenBalance>('tokenBalance', DEFAULT_BALANCE);
  const [isLoading, setIsLoading] = useState(false);

  // Simulate token usage when using the AI agent
  const useTokens = (amount: number) => {
    if (balance.available < amount) {
      return false;
    }
    
    setBalance({
      ...balance,
      available: balance.available - amount,
      used: balance.used + amount
    });
    
    return true;
  };

  // Add tokens to the balance
  const addTokens = (amount: number) => {
    setBalance({
      ...balance,
      available: balance.available + amount,
      subscription: {
        ...balance.subscription,
        tokens: balance.subscription.tokens + amount
      }
    });
  };

  // Update subscription level
  const updateSubscription = (level: 'free' | 'basic' | 'premium' | 'enterprise', tokenAmount: number) => {
    setBalance({
      available: tokenAmount,
      used: 0,
      subscription: {
        level,
        tokens: tokenAmount,
        expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
      }
    });
  };

  return {
    balance,
    isLoading,
    useTokens,
    addTokens,
    updateSubscription
  };
};
