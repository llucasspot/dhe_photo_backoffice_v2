export type TPath =
  | '/'
  | '/auth'
  | '/auth/login'
  | '/auth/register'
  | '/home'
  | '/projects'
  | '/schools';

export abstract class RoutingServicePort {
  abstract redirect(
    path: TPath,
    params?: Record<string, string>,
  ): Promise<void>;

  abstract usePathname(): string;
}
