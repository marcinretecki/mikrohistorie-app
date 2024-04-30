import { Session, User } from "@supabase/supabase-js";
import React, { createContext } from "react";

// Create a context
export const UserContext = createContext<User | undefined>(undefined);

interface UserProviderProps {
  children: React.ReactNode;
  session: Session;
}
export const UserProvider = ({ children, session }: UserProviderProps) => {
  return (
    <UserContext.Provider value={session.user}>{children}</UserContext.Provider>
  );
};
