import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface WearableContextType {
  isConnected: boolean;
  isConnecting: boolean;
  connectWearable: () => void;
  disconnectWearable: () => void;
  setConnecting: (connecting: boolean) => void;
}

const WearableContext = createContext<WearableContextType | undefined>(undefined);

interface WearableProviderProps {
  children: ReactNode;
}

export const WearableProvider = ({ children }: WearableProviderProps) => {
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);

  // Load connection status from localStorage on mount
  useEffect(() => {
    const savedStatus = localStorage.getItem("aeromind_wearable_connected");
    setIsConnected(savedStatus === "true");
  }, []);

  const connectWearable = () => {
    setIsConnecting(true);
    setIsConnected(false);
    
    // Simulate connection delay
    setTimeout(() => {
      setIsConnecting(false);
      setIsConnected(true);
      localStorage.setItem("aeromind_wearable_connected", "true");
    }, 2500);
  };

  const disconnectWearable = () => {
    setIsConnected(false);
    localStorage.setItem("aeromind_wearable_connected", "false");
  };

  const setConnecting = (connecting: boolean) => {
    setIsConnecting(connecting);
  };

  const value: WearableContextType = {
    isConnected,
    isConnecting,
    connectWearable,
    disconnectWearable,
    setConnecting,
  };

  return (
    <WearableContext.Provider value={value}>
      {children}
    </WearableContext.Provider>
  );
};

export const useWearable = () => {
  const context = useContext(WearableContext);
  if (context === undefined) {
    throw new Error('useWearable must be used within a WearableProvider');
  }
  return context;
};
