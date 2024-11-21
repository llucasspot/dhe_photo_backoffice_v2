import { ReactNode, useCallback, useState } from 'react';

import { AuthContext } from './auth.context';

import { useService } from '#di/react';
import { AuthProviderPort, LoginBody } from '#features/auth/domain';

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const authProvider = useService(AuthProviderPort);
  const [isAuthenticated, setIsAuthenticated] = useState(() =>
    authProvider.isAuthenticated(),
  );

  const login = useCallback(
    async (body: LoginBody) => {
      const token = await authProvider.login(body);
      setIsAuthenticated(true);
      return token;
    },
    [authProvider],
  );

  const logout = useCallback(async () => {
    await authProvider.logout();
    setIsAuthenticated(false);
  }, [authProvider]);

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
