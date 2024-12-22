import { RouterProvider } from '@tanstack/react-router';

import { RoutingServiceTanstackAdapter } from '../../../infra';

import { useService } from '#di/react';
import { AuthService } from '#features/auth/domain';
import { RoutingServicePort } from '#routing/domain';

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof RoutingServiceTanstackAdapter.router;
  }
}

export function TanstackRouter() {
  const authService = useService(AuthService);
  const routingService = useService(RoutingServicePort);
  return (
    <RouterProvider
      router={RoutingServiceTanstackAdapter.router}
      context={{
        routingService,
        authService,
      }}
    />
  );
}
