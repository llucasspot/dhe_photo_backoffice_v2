import { AuthProvider } from '#features/auth/react';

import { Router } from '#routing/react';

export const App = () => {
  return (
    <AuthProvider>
      <Router />
    </AuthProvider>
  );
};
