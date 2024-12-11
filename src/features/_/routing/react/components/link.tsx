import { ComponentProps, PropsWithChildren } from 'react';
import { Link as TanstackLink } from '@tanstack/react-router';

import { Route } from '#routing/domain';

export type LinkProps<TTPath extends Route = Route> = PropsWithChildren<{
  to: TTPath;
  params?: ExtractParams<TTPath>;
  className?: ComponentProps<typeof TanstackLink>['className'];
  activeProps?: ComponentProps<typeof TanstackLink>['activeProps'];
  inactiveProps?: ComponentProps<typeof TanstackLink>['inactiveProps'];
}>;

type ExtractParams<TPath extends string> =
  TPath extends `${string}/$${infer Param}/${infer Rest}`
    ? { [K in Param | keyof ExtractParams<`/${Rest}`>]: string }
    : TPath extends `${string}/$${infer Param}`
      ? { [K in Param]: string }
      : object;

export function Link<TTPath extends Route>(props: LinkProps<TTPath>) {
  // @ts-expect-error TanstackLink
  return <TanstackLink {...props} />;
}
