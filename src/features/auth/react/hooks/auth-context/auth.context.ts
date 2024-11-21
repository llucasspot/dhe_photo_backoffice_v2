import { createContext } from 'react';

import { LoginBody } from '#features/auth/domain';

interface AuthContextType {
  isAuthenticated: boolean;
  login: (body: LoginBody) => Promise<string>;
  logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | null>(null);
