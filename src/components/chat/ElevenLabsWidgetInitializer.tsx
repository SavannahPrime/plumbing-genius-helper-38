
import React, { useEffect } from 'react';
import { useElevenLabsWidget } from '@/hooks/useElevenLabsWidget';

const ElevenLabsWidgetInitializer: React.FC = () => {
  const { isInitialized } = useElevenLabsWidget();

  useEffect(() => {
    // Log initialization status
    console.log('ElevenLabs widget initialization status:', isInitialized);
  }, [isInitialized]);

  // This is a utility component that doesn't render anything visible
  return null;
};

export default ElevenLabsWidgetInitializer;
