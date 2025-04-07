import { RouterProvider } from '@tanstack/react-router';

import { RoutingServiceTanstackAdapter } from '../../../infra';

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof RoutingServiceTanstackAdapter.router;
  }
}

export function TanstackRouter() {
  // TODO import.meta.env
  const basepath = import.meta.env.VITE_BASE_PATH ?? '/';
  console.log('base-path : ', basepath);

  return (
    <RouterProvider
      basepath={basepath}
      router={RoutingServiceTanstackAdapter.router}
    />
  );
}
