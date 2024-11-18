import { ComponentProps, PropsWithChildren } from 'react';
import { Link as TanstackLink } from '@tanstack/react-router';

import { TPath } from '#routing/domain';

type LinkProps = PropsWithChildren<{
  to: TPath;
  className?: ComponentProps<typeof TanstackLink>['className'];
  activeProps?: ComponentProps<typeof TanstackLink>['activeProps'];
  inactiveProps?: ComponentProps<typeof TanstackLink>['inactiveProps'];
}>;

export const Link = (props: LinkProps) => {
  return <TanstackLink {...props} />;
};
