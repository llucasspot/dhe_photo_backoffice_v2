import { RouterProvider } from '@tanstack/react-router';

import { useService } from '#di/react';
import { RoutingServicePort } from '#routing/domain';
import { RoutingServiceTanstackAdapter } from '#routing/infra';

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof RoutingServiceTanstackAdapter.router;
  }
}

export function TanstackRouter() {
  const routingService = useService(RoutingServicePort);
  return (
    <RouterProvider
      router={RoutingServiceTanstackAdapter.router}
      context={{
        routingService,
        auth: {
          isAuthenticated: localStorage.getItem('auth_token') !== null,
        },
      }}
    />
  );
}
