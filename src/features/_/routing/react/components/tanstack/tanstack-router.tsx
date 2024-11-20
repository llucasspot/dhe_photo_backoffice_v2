import { RouterProvider } from '@tanstack/react-router';

import { useService } from '#di/react';
import { useAuth } from '#features/auth/react';
import { RoutingServicePort } from '#routing/domain';
import { RoutingServiceTanstackAdapter } from '#routing/infra';

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof RoutingServiceTanstackAdapter.router;
  }
}

export function TanstackRouter() {
  const { isAuthenticated } = useAuth();
  const routingService = useService(RoutingServicePort);
  return (
    <RouterProvider
      router={RoutingServiceTanstackAdapter.router}
      context={{
        routingService,
        auth: {
          isAuthenticated,
        },
      }}
    />
  );
}
