import { AuthContextType } from '@/features/auth/types/auth';
import { createContext, ReactNode, useContext, useState } from 'react';
import { updateGraphQLClientToken } from '@/lib/graphqlClient';

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return !!localStorage.getItem('authToken');
  });
  
  const login = (token: string) => {
    updateGraphQLClientToken(token);
    setIsAuthenticated(true);
  };

  const logout = () => {
    updateGraphQLClientToken(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}


export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
