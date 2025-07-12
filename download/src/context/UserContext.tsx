'use client';

import React, { createContext, useState, ReactNode } from 'react';
import type { User, SwapRequest } from '@/lib/types';
import { mockUsers, mockSwaps } from '@/lib/data';

interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  swaps: SwapRequest[];
  setSwaps: (swaps: SwapRequest[]) => void;
}

export const UserContext = createContext<UserContextType>({
  user: null,
  setUser: () => {},
  swaps: [],
  setSwaps: () => {},
});

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(mockUsers[0]);
  const [swaps, setSwaps] = useState<SwapRequest[]>(mockSwaps);

  return (
    <UserContext.Provider value={{ user, setUser, swaps, setSwaps }}>
      {children}
    </UserContext.Provider>
  );
};
