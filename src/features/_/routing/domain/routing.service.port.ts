export type TPath =
  | '/'
  | '/auth'
  | '/auth/login'
  | '/auth/register'
  | '/home'
  | '/projects'
  | '/projects/create'
  | '/schools'
  | '/schools/create'
  | '/settings';

export abstract class RoutingServicePort {
  abstract redirect(
    path: TPath,
    params?: Record<string, string>,
  ): Promise<void>;

  abstract usePathname(): string;
}
