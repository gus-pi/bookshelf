import { UserCredentials } from './../lib/types';
import { createContext } from 'react';

type AuthContextType = {
  userCredentials: UserCredentials | null;
  setUserCredentials: React.Dispatch<
    React.SetStateAction<UserCredentials | null>
  >;
};

export const AuthContext = createContext<AuthContextType | null>(null);
