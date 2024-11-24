export const routes = {
  root: '/',
  authRoot: '/auth',
  login: '/auth/login',
  register: '/auth/register',
  home: '/home',
  products: '/products',
  productCreation: '/products/create',
  productDetail: '/products/$productId',
  projects: '/projects',
  projectCreation: '/projects/create',
  projectDetail: '/projects/$projectId',
  klassDetail: '/projects/$projectId/klasses/$klassId',
  schools: '/schools',
  schoolCreation: '/schools/create',
  schoolDetail: '/schools/$schoolId',
  settings: '/settings',
} as const;

export type Route = (typeof routes)[keyof typeof routes];

export abstract class RoutingServicePort {
  abstract redirect(
    path: Route,
    params?: Record<string, string>,
  ): Promise<void>;

  abstract usePathname(): string;
}
