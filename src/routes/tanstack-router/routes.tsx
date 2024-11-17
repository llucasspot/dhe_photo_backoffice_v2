import {
  createRootRouteWithContext,
  createRoute,
  redirect,
  Route,
} from '@tanstack/react-router';

import { RootLayout } from '../../layout/root.layout.tsx';

import { LoginPage, RegisterPage } from '#features/auth';
import { DashboardPage } from '#features/dashboard';
import { ProjectsPage } from '#features/projects';
import { SchoolsPage } from '#features/schools';

export const context = {
  auth: {
    isAuthenticated: localStorage.getItem('auth_token') !== null,
  },
};

export const rootRoute = createRootRouteWithContext<typeof context>()({
  component: RootLayout,
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: DashboardPage,
  beforeLoad: ({ context }) => {
    if (!context.auth.isAuthenticated) {
      throw redirect({
        to: '/login',
      });
    }
  },
});

const projectsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/projects',
  component: ProjectsPage,
  beforeLoad: ({ context }) => {
    if (!context.auth.isAuthenticated) {
      throw redirect({
        to: '/login',
      });
    }
  },
});

const schoolsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/schools',
  component: SchoolsPage,
  beforeLoad: ({ context }) => {
    if (!context.auth.isAuthenticated) {
      throw redirect({
        to: '/login',
      });
    }
  },
});

const loginRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/login',
  component: LoginPage,
});

const registerRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/register',
  component: RegisterPage,
});

export const routeTree = rootRoute.addChildren([
  indexRoute,
  projectsRoute,
  schoolsRoute,
  loginRoute,
  registerRoute,
]);