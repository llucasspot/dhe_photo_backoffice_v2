/* eslint-disable react-hooks/rules-of-hooks */
import { createRouter, useLocation } from '@tanstack/react-router';

import { routeTree } from './route-tree';

import { adapter } from '#di';
import { RoutingServicePort } from '#routing/domain';

@adapter(RoutingServicePort)
export class RoutingServiceTanstackAdapter extends RoutingServicePort {
  public static readonly router = createRouter({
    routeTree,
    context: {
      routingService: undefined!,
      authService: undefined!,
    },
  });

  constructor() {
    super();
  }

  redirect(
    path: string,
    params?: Record<string, string>,
  ): Promise<void> | void {
    return RoutingServiceTanstackAdapter.router.navigate({ to: path, params });
  }

  usePathname(): string {
    const location = useLocation();
    return location.pathname;
  }
}
