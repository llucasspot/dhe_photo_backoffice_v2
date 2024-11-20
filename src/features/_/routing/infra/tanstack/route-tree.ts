import {
  createRootRouteWithContext,
  createRoute,
  redirect,
} from '@tanstack/react-router';

import { LoginPage, RegisterPage } from '#features/auth/react';
import { DashboardPage } from '#features/dashboard/react';
import { ProjectsPage } from '#features/projects/react';
import { SchoolsPage } from '#features/schools/react';
import { SettingsPage } from '#features/settings/react';
import { OutletLayout, RootLayout } from '#layout';
import { RoutingServicePort } from '#routing/domain';

type Context = {
  auth: {
    isAuthenticated: boolean;
  };
  routingService: RoutingServicePort;
};

export const rootRoute = createRootRouteWithContext<Context>()({
  component: OutletLayout,
});

// ----- authLayout -----

export const authLayout = createRoute({
  getParentRoute: () => rootRoute,
  path: '/auth',
  component: OutletLayout,
  beforeLoad: ({ context }) => {
    if (context.auth.isAuthenticated) {
      throw redirect({ to: '/home' });
    }
  },
});

export const signInRoute = createRoute({
  getParentRoute: () => authLayout,
  path: '/login',
  component: LoginPage,
});

export const signUpRoute = createRoute({
  getParentRoute: () => authLayout,
  path: '/register',
  component: RegisterPage,
});

// ----- rootLayout -----

export const rootLayout = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: RootLayout,
  beforeLoad: ({ context }) => {
    if (!context.auth.isAuthenticated) {
      throw redirect({ to: '/auth/login' });
    }
  },
});

export const dashboardRoute = createRoute({
  getParentRoute: () => rootLayout,
  path: '/home',
  component: DashboardPage,
});

export const projectsRoute = createRoute({
  getParentRoute: () => rootLayout,
  path: '/projects',
  component: ProjectsPage,
});

export const schoolsRoute = createRoute({
  getParentRoute: () => rootLayout,
  path: '/schools',
  component: SchoolsPage,
});

export const settingsRoute = createRoute({
  getParentRoute: () => rootLayout,
  path: '/settings',
  component: SettingsPage,
});

// ----- routeTree -----

export const routeTree = rootRoute.addChildren([
  authLayout.addChildren([signInRoute, signUpRoute]),
  rootLayout.addChildren([
    dashboardRoute,
    projectsRoute,
    schoolsRoute,
    settingsRoute,
  ]),
]);
