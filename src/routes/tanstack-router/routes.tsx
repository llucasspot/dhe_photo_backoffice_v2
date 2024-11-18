import { createRouter } from '@tanstack/react-router';

import { routeTree } from './route-tree.ts';

export const router = createRouter({
  routeTree,
  context: {
    auth: {
      isAuthenticated: undefined!,
    },
  },
});

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}
