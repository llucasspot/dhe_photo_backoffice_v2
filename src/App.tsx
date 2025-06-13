import { ToastContainer } from 'react-toastify';
import { Theme } from '@radix-ui/themes';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { ModalProvider } from './features/schools/react/components/modal/modal.provider';
import { ReactQueryDevtools } from './ReactQueryDevtools';

import { useService } from '#di/react';
import { Router } from '#routing/react';

export const App = () => {
  const queryClient = useService(QueryClient);
  return (
    <Theme>
      <QueryClientProvider client={queryClient}>
        <ModalProvider>
          <Router />
        </ModalProvider>
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
