import { ToastContainer } from 'react-toastify';
import { Theme } from '@radix-ui/themes';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import { useService } from '#di/react';
import { Router } from '#routing/react';

export const App = () => {
  const queryClient = useService(QueryClient);
  return (
    <Theme>
      <QueryClientProvider client={queryClient}>
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
      </QueryClientProvider>
    </Theme>
  );
};
