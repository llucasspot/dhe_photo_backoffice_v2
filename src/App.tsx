import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { useService } from '#di/react';
import { AuthProvider } from '#features/auth/react';
import { Router } from '#routing/react';

export const App = () => {
  const queryClient = useService(QueryClient);
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Router />
      </AuthProvider>
    </QueryClientProvider>
  );
};
