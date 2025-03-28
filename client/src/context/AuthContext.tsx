import { createContext, useState, useEffect, ReactNode } from 'react';
import axios from 'axios';
import { getApiUrl } from '@/lib/utils';
import { getAuthenticatedUser } from '@/services/authService';

type UserCredentials = {
  id: string;
  name: string;
  email: string;
};

type AuthContextType = {
  userCredentials: UserCredentials | null;
  setUserCredentials: React.Dispatch<
    React.SetStateAction<UserCredentials | null>
  >;
  logout: () => void;
};

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [userCredentials, setUserCredentials] =
    useState<UserCredentials | null>(null);

  // Load user from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUserCredentials(JSON.parse(storedUser));
    } else {
      fetchUser();
    }
  }, []);

  const fetchUser = async () => {
    try {
      const data = await getAuthenticatedUser();
      setUserCredentials(data);
    } catch (error) {
      console.error('Error fetching user:', error);
      setUserCredentials(null);
    }
  };

  const logout = async () => {
    await axios.post(`${getApiUrl()}/users/logout`);
    localStorage.removeItem('user');
    setUserCredentials(null);
  };

  return (
    <AuthContext.Provider
      value={{ userCredentials, setUserCredentials, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
