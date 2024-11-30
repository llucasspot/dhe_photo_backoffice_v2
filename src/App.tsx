import { ToastContainer } from 'react-toastify';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import { useService } from '#di/react';
import { AuthProvider } from '#features/auth/react';
import { Router } from '#routing/react';

// Make utils available in the console
declare global {
  interface Window {
    services: object;
  }
}

export const App = () => {
  // start - export services on browser
  window.services = {};
  // end - export services on browser

  const queryClient = useService(QueryClient);
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Router />
        <ToastContainer
          style={{ zIndex: 10000 }}
          position="bottom-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        <ReactQueryDevtools initialIsOpen={false} />
      </AuthProvider>
    </QueryClientProvider>
  );
};
