/* eslint-disable react-hooks/rules-of-hooks */
import { createRouter, useLocation } from '@tanstack/react-router';

import { routeTree } from './route-tree.ts';

import { singleton } from '#di';
import { RoutingServicePort } from '#routing/domain';

@singleton()
export class RoutingServiceTanstackAdapter extends RoutingServicePort {
  public static readonly router = createRouter({
    routeTree,
    context: {
      routingService: undefined!,
      auth: {
        isAuthenticated: undefined!,
      },
    },
  });

  constructor() {
    super();
  }

  redirect(path: string, params?: Record<string, string>): Promise<void> {
    return RoutingServiceTanstackAdapter.router.navigate({ to: path, params });
  }

  usePathname(): string {
    const location = useLocation();
    return location.pathname;
  }
}
