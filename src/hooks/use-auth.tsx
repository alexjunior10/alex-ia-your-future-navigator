import { createContext, useContext, useEffect, useState, ReactNode } from "react";

export type Role = "student" | "parent" | "school" | null;

interface AuthContextType {
  role: Role;
  login: (role: Role) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [role, setRole] = useState<Role>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("alex_ia_role") as Role;
    if (saved) setRole(saved);
    setMounted(true);
  }, []);

  const login = (r: Role) => {
    setRole(r);
    localStorage.setItem("alex_ia_role", r ?? "");
  };

  const logout = () => {
    setRole(null);
    localStorage.removeItem("alex_ia_role");
  };

  if (!mounted) return null; // Avoid hydration mismatch

  return (
    <AuthContext.Provider value={{ role, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
}
