"use client";

import React, { createContext, useContext } from "react";

const UserContext = createContext<UserProviderProps["user"] | null>(null);

interface UserProviderProps {
  children: React.ReactNode;
  user: {
    email: string;
    is_active?: boolean;
    is_superuser?: boolean;
    full_name?: string | null;
    id: number;
    chatList?: unknown[] | null;
  };
}

export const UserProvider: React.FC<UserProviderProps> = ({
  children,
  user,
}) => <UserContext.Provider value={user}>{children}</UserContext.Provider>;

export const useUser = () => useContext(UserContext);
