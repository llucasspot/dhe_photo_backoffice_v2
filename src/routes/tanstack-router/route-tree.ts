import {
  createRootRouteWithContext,
  createRoute,
} from '@tanstack/react-router';

import { OutletLayout } from '../../layout/outlet.layout.tsx';
import { RootLayout } from '../../layout/root.layout.tsx';

import { LoginPage, RegisterPage } from '#features/auth';
import { DashboardPage } from '#features/dashboard';
import { ProjectsPage } from '#features/projects';
import { SchoolsPage } from '#features/schools';

type Context = {
  auth: {
    isAuthenticated: boolean;
  };
};

export const rootRoute = createRootRouteWithContext<Context>()({
  component: OutletLayout,
});

export const authLayout = createRoute({
  getParentRoute: () => rootRoute,
  path: '/auth',
  component: OutletLayout,
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

export const rootLayout = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: RootLayout,
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

export const routeTree = rootRoute.addChildren([
  authLayout.addChildren([signInRoute, signUpRoute]),
  rootLayout.addChildren([dashboardRoute, projectsRoute, schoolsRoute]),
]);
