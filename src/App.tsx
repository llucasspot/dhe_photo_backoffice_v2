import { ToastContainer } from 'react-toastify';
import { containerByEnv } from '@mygoodstack/di-core';
import { DIProvider, useInstance } from '@mygoodstack/di-react';
import { Theme } from '@radix-ui/themes';
import { QueryClientProvider } from '@tanstack/react-query';

import { QueryClientGetter } from './features/QueryClientGetter';
import { ModalProvider } from './features/schools/react/components/modal/modal.provider';
import { ReactQueryDevtools } from './ReactQueryDevtools';

import { Router } from '#routing/react';

export const App = () => {
  const nodeEnv = process.env.NODE_ENV as keyof typeof containerByEnv;
  console.log(`process.env.NODE_ENV : ${nodeEnv}`);

  const container = containerByEnv[nodeEnv];
  return (
    <DIProvider container={container}>
      <AppContent />
    </DIProvider>
  );
};

const AppContent = () => {
  const queryClientGetter = useInstance(QueryClientGetter);
  return (
    <Theme>
      <QueryClientProvider client={queryClientGetter.get()}>
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
