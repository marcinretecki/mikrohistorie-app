import { Session } from "@supabase/supabase-js";
import { useState, useEffect, ReactNode } from "react";

import { SessionContext } from "../hooks/useSession";

import { typedClient } from "@/lib/supabase";

export const SessionProvider = ({ children }: { children: ReactNode }) => {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    typedClient.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const { data: listener } = typedClient.auth.onAuthStateChange(
      (_event, newSession) => {
        setSession(newSession);
      },
    );

    return () => {
      listener?.subscription.unsubscribe();
    };
  }, []);

  return (
    <SessionContext.Provider value={session}>
      {children}
    </SessionContext.Provider>
  );
};
