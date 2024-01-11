
import React, { createContext, useContext, ReactNode, useState, Dispatch, SetStateAction } from 'react';

interface WebSocketContextValue {
  testWs: null | WebSocket;
  setTestWs: Dispatch<SetStateAction<null | WebSocket>>;
}

interface WebSocketContextProps {
  children: ReactNode;
}

const WebSocketContext = createContext<WebSocketContextValue | undefined>(undefined);

export const WebSocketProvider: React.FC<WebSocketContextProps> = ({ children }) => {
  const [testWs, setTestWs] = useState<null | WebSocket>(null);

  const contextValue: WebSocketContextValue = {
    testWs,
    setTestWs,
  };

  return (
    <WebSocketContext.Provider value={contextValue}>
      {children}
    </WebSocketContext.Provider>
  );
};

export const useWebSocket = (): WebSocketContextValue => {
  const context = useContext(WebSocketContext);
  if (!context) {
    throw new Error('useWebSocket must be used within a WebSocketProvider');
  }
  return context;
};