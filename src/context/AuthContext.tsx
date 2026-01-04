import React, { createContext, useContext, ReactNode, useState, useEffect } from 'react';

type AuthContextType = {
  token: string | null;
  role: 'buyer' | 'seller' | null;
  loading: boolean;
  login: (token: string, role: 'buyer' | 'seller') => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType>({
  token: null,
  role: null,
  loading: true,
  login: () => {},
  logout: () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);
  const [role, setRole] = useState<'buyer' | 'seller' | null>(null);
  const [loading, setLoading] = useState(true);

  // Simulate fetching token from storage
  useEffect(() => {
    const fetchToken = async () => {
      // Replace with AsyncStorage or secure store in real app
      await new Promise(res => setTimeout(res, 500));
      setLoading(false);
    };
    fetchToken();
  }, []);

  const login = (newToken: string, newRole: 'buyer' | 'seller') => {
    setToken(newToken);
    setRole(newRole);
  };

  const logout = () => {
    setToken(null);
    setRole(null);
  };

  return (
    <AuthContext.Provider value={{ token, role, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// ✅ Hook for consuming context safely
export const useAuth = () => {
  return useContext(AuthContext);
};

// Optional: export raw context for testing
export { AuthContext };
