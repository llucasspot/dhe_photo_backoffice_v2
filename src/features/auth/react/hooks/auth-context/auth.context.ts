import { createContext } from 'react';

import { LoginDto } from '#features/auth/domain';

interface AuthContextType {
  isAuthenticated: boolean;
  login: (body: LoginDto) => Promise<string>;
  logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | null>(null);
