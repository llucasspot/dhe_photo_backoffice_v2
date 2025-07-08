import { ReactQueryDevtools as Devtools } from '../node_modules/@tanstack/react-query-devtools/src/ReactQueryDevtools';
import { ReactQueryDevtoolsPanel as DevtoolsPanel } from '../node_modules/@tanstack/react-query-devtools/src/ReactQueryDevtoolsPanel';

export const ReactQueryDevtools: typeof Devtools = ![
  'mock',
  'development',
].includes(import.meta.env.VITE_APP_ENV as string)
  ? function () {
      return null;
    }
  : Devtools;

export const ReactQueryDevtoolsPanel: typeof DevtoolsPanel = ![
  'mock',
  'development',
].includes(import.meta.env.VITE_APP_ENV as string)
  ? function () {
      return null;
    }
  : DevtoolsPanel;
