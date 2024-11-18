import { RouterProvider } from '@tanstack/react-router';

import { router } from './routes.tsx';

export function TanstackRouter() {
  return (
    <RouterProvider
      router={router}
      context={{
        auth: {
          isAuthenticated: localStorage.getItem('auth_token') !== null,
        },
      }}
    />
  );
}
