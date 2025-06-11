import { useEffect } from 'react';
import { Outlet } from '@tanstack/react-router';

import { UserInfoGetter } from '../features/auth/use-cases/getter/user-info.getter';

import { useGetter } from '#action/react';
import { useService } from '#di/react';
import { RoutingServicePort } from '#routing/domain';

export const AuthLayout = () => {
  const routingService = useService(RoutingServicePort);
  const { data, isLoading } = useGetter(UserInfoGetter);

  useEffect(() => {
    if (data) {
      routingService.redirect('/home');
    }
  }, [data, routingService]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return <Outlet />;
};
