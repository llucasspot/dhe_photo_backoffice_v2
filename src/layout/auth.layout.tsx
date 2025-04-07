import { Outlet } from '@tanstack/react-router';

import { useService } from '#di/react';
import { AuthState } from '#features/auth/domain';
import { RoutingServicePort } from '#routing/domain';
import { useStateValue } from '#state/react';

export const AuthLayout = () => {
  const routingService = useService(RoutingServicePort);
  const authState = useStateValue(AuthState);
  if (authState.currentUser) {
    routingService.redirect('/home');
  }
  return <Outlet />;
};
