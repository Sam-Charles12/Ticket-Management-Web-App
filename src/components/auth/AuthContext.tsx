import React, { createContext, useContext, useState, ReactNode } from "react";

interface User {
  id: string;
  email: string;
  name: string;
  role: "admin" | "user";
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
  token: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

const SESSION_STORAGE_KEY = "ticketapp_session";

interface StoredSession {
  token: string;
  user: User;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    if (typeof window === "undefined") {
      return null;
    }

    try {
      const raw = window.localStorage.getItem(SESSION_STORAGE_KEY);
      if (!raw) {
        return null;
      }

      const parsed = JSON.parse(raw) as StoredSession;
      if (parsed && parsed.token && parsed.user) {
        return parsed.user;
      }
    } catch (error) {
      console.error("Failed to read stored session", error);
    }

    return null;
  });
  const [sessionToken, setSessionToken] = useState<string | null>(() => {
    if (typeof window === "undefined") {
      return null;
    }

    try {
      const raw = window.localStorage.getItem(SESSION_STORAGE_KEY);
      if (!raw) {
        return null;
      }

      const parsed = JSON.parse(raw) as StoredSession;
      if (parsed && parsed.token && parsed.user) {
        return parsed.token;
      }
    } catch (error) {
      console.error("Failed to read stored session token", error);
    }

    return null;
  });

  const persistSession = (sessionUser: User) => {
    if (typeof window === "undefined") {
      setUser(sessionUser);
      setSessionToken(`session-${Date.now()}`);
      return;
    }

    const session: StoredSession = {
      token: `session-${Date.now()}`,
      user: sessionUser,
    };

    try {
      window.localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(session));
    } catch (error) {
      console.error("Failed to persist session", error);
    }

    setUser(sessionUser);
    setSessionToken(session.token);
  };

  const clearSession = () => {
    if (typeof window !== "undefined") {
      window.localStorage.removeItem(SESSION_STORAGE_KEY);
    }
    setSessionToken(null);
    setUser(null);
  };

  const login = async (email: string, password: string): Promise<boolean> => {
    // Mock authentication - in production, this would call an API
    await new Promise((resolve) => setTimeout(resolve, 500));

    if (email && password) {
      const mockUser: User = {
        id: "1",
        email,
        name: email.split("@")[0],
        role: email.includes("admin") ? "admin" : "user",
      };
      persistSession(mockUser);
      return true;
    }
    return false;
  };

  const register = async (
    name: string,
    email: string,
    password: string
  ): Promise<boolean> => {
    // Mock registration - in production, this would call an API
    await new Promise((resolve) => setTimeout(resolve, 500));

    if (name && email && password) {
      const mockUser: User = {
        id: Date.now().toString(),
        email,
        name,
        role: "user",
      };
      persistSession(mockUser);
      return true;
    }
    return false;
  };

  const logout = () => {
    clearSession();
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        register,
        logout,
        isAuthenticated: !!user && !!sessionToken,
        token: sessionToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
