import { RouterProvider } from '@tanstack/react-router';

import { RoutingServiceTanstackAdapter } from '../../../infra';

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof RoutingServiceTanstackAdapter.router;
  }
}

export function TanstackRouter() {
  const basepath = import.meta.env.BASE_URL;
  console.log('base-path : ', basepath);

  return (
    <RouterProvider
      basepath={basepath}
      router={RoutingServiceTanstackAdapter.router}
    />
  );
}
