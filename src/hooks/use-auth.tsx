import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { supabase } from "../integrations/supabase/client";
import type { User, Session } from "@supabase/supabase-js";

export type Role = "student" | "parent" | "school" | null;

interface AuthContextType {
  role: Role;
  user: User | null;
  session: Session | null;
  logout: () => Promise<void>;
  showAuthModal: boolean;
  setShowAuthModal: (show: boolean) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [role, setRole] = useState<Role>(null);
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [mounted, setMounted] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);

  useEffect(() => {
    // Inicializar sesión
    supabase.auth.getSession().then(({ data: { session: sbSession } }) => {
      const isPilotMode = import.meta.env.VITE_PILOT_MODE === 'true';
      const pilotStr = window.localStorage?.getItem('pilot_session');
      
      if (isPilotMode && pilotStr) {
        try {
          const pilotData = JSON.parse(pilotStr);
          setSession({ user: pilotData } as any);
          setUser(pilotData as any);
          setRole(pilotData.user_metadata?.role as Role || "student");
          setMounted(true);
          return;
        } catch(e) {}
      }

      setSession(sbSession);
      setUser(sbSession?.user ?? null);
      setRole((sbSession?.user?.user_metadata?.role as Role) || null);
      setMounted(true);
    });

    // Escuchar cambios de autenticación
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, sbSession) => {
      const isPilotMode = import.meta.env.VITE_PILOT_MODE === 'true';
      const pilotStr = window.localStorage?.getItem('pilot_session');
      
      if (isPilotMode && pilotStr) {
        // Ignore supabase auth state changes if we are in pilot mode
        return;
      }

      setSession(sbSession);
      setUser(sbSession?.user ?? null);
      setRole((sbSession?.user?.user_metadata?.role as Role) || null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const logout = async () => {
    const isPilotMode = import.meta.env.VITE_PILOT_MODE === 'true';
    if (isPilotMode && window.localStorage?.getItem('pilot_session')) {
      window.localStorage.removeItem('pilot_session');
      setSession(null);
      setUser(null);
      setRole(null);
      window.location.href = '/';
      return;
    }
    await supabase.auth.signOut();
  };

  if (!mounted) return null; // Avoid hydration mismatch

  return (
    <AuthContext.Provider value={{ role, user, session, logout, showAuthModal, setShowAuthModal }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
}
