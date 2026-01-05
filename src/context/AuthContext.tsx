import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type User = {
  firstName: string;
  lastName: string;
  email: string;
};

type AuthContextType = {
  token: string | null;
  role: 'buyer' | 'seller' | null;
  user: User | null;
  loading: boolean;
  login: (token: string, role: 'buyer' | 'seller', user: User) => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);
  const [role, setRole] = useState<'buyer' | 'seller' | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Load user session from AsyncStorage on app start
  useEffect(() => {
    const loadSession = async () => {
      try {
        const storedToken = await AsyncStorage.getItem('token');
        const storedRole = await AsyncStorage.getItem('role');
        const storedUser = await AsyncStorage.getItem('user');

        if (storedToken && storedRole && storedUser) {
          setToken(storedToken);
          setRole(storedRole as 'buyer' | 'seller');
          setUser(JSON.parse(storedUser));
        }
      } catch (error) {
        console.log('Failed to load user session:', error);
      } finally {
        setLoading(false);
      }
    };

    loadSession();
  }, []);

  // Login function: save token, role, and user to state & AsyncStorage
  const login = async (newToken: string, newRole: 'buyer' | 'seller', userData: User) => {
    try {
      setToken(newToken);
      setRole(newRole);
      setUser(userData);

      await AsyncStorage.setItem('token', newToken);
      await AsyncStorage.setItem('role', newRole);
      await AsyncStorage.setItem('user', JSON.stringify(userData));
    } catch (error) {
      console.log('Login error:', error);
    }
  };

  // Logout function: clear all state & AsyncStorage
  const logout = async () => {
    try {
      setToken(null);
      setRole(null);
      setUser(null);
      await AsyncStorage.multiRemove(['token', 'role', 'user']);
    } catch (error) {
      console.log('Logout error:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ token, role, user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// ✅ Hook for consuming the auth context
export const useAuth = () => useContext(AuthContext);
export { AuthContext };
