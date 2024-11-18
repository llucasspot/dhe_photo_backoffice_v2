import { AuthProvider } from '#lib/auth';
import { Router } from '#routing/react';

export const App = () => {
  return (
    <AuthProvider>
      <Router />
    </AuthProvider>
  );
};
