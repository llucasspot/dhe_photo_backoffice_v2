import { ToastContainer } from 'react-toastify';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import 'react-toastify/dist/ReactToastify.css';

import { useService } from '#di/react';
import { AuthProvider } from '#features/auth/react';
import { Router } from '#routing/react';

export const App = () => {
  const queryClient = useService(QueryClient);
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Router />
        <ToastContainer />
      </AuthProvider>
    </QueryClientProvider>
  );
};
