import { useEffect } from 'react';
import { Outlet } from '@tanstack/react-router';

import { useService } from '#di/react';
import { AuthState } from '#features/auth/domain';
import { RoutingServicePort } from '#routing/domain';

export const OutletLayout = () => {
  const routingService = useService(RoutingServicePort);
  const authState = useService(AuthState);
  const authStateValue = authState.use();
  const isAuthenticated = authStateValue.currentUser;
  useEffect(() => {
    if (isAuthenticated && !isAuthenticated) {
      routingService.redirect('/home');
    }
  }, [isAuthenticated, routingService]);
  return <Outlet />;
};
