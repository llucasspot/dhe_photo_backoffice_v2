import { rootRoute } from './routes.tsx';

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof rootRoute;
  }
}
