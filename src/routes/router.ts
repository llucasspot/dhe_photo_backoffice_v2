import { Router } from '@tanstack/react-router';
import { routeTree } from './routes';

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
  interface RouterContext {
    auth: {
      isAuthenticated: boolean;
    };
  }
}

export const router = new Router({
  routeTree,
  context: {
    auth: {
      isAuthenticated: localStorage.getItem('auth_token') !== null,
    },
  },
});