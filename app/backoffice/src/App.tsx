import { ToastContainer } from 'react-toastify';
import { containerByEnv } from '@mygoodstack/di-react';
import { DIProvider, useInstance } from '@mygoodstack/di-react';
import { Theme } from '@radix-ui/themes';
import { QueryClientProvider } from '@tanstack/react-query';

import { QueryClientGetter } from './features/QueryClientGetter';
import { ModalProvider } from './features/schools/react/components/modal/modal.provider';
import { ReactQueryDevtools } from './ReactQueryDevtools';

import { Router } from '#routing/react';

console.log('-------------------------------');
console.log('----- General information -----');
console.log('-------------------------------');
console.table({
  'Time Stamp': new Date().getTime(),
  OS: navigator['platform'],
  Browser: navigator['appCodeName'],
  Language: navigator['language'],
});

const env: keyof typeof containerByEnv =
  import.meta.env.VITE_APP_ENV ?? import.meta.env.MODE;
console.log(`env : ${env}`);

const container = containerByEnv[env];

container.consoleLog();

export const App = () => {
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
