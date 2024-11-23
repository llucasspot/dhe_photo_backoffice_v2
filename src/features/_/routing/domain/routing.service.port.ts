export const routes = {
  root: '/',
  authRoot: '/auth',
  login: '/auth/login',
  register: '/auth/register',
  home: '/home',
  projects: '/projects',
  projectCreation: '/projects/create',
  projectDetail: '/projects/$projectId',
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
