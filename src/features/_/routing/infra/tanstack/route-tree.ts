import {
  createRootRouteWithContext,
  createRoute,
  redirect,
} from '@tanstack/react-router';

import { OAuthCallbackPage } from '../../../../auth/react/pages/oauth-callback.page.tsx';

import { AuthService } from '#features/auth/domain';
import { LoginPage, RegisterPage } from '#features/auth/react';
import { DashboardPage } from '#features/dashboard/react';
import {
  CreateProductPage,
  ProductDetailPage,
  ProductsPage,
} from '#features/products/react';
import {
  CreateProjectPage,
  KlassDetailPage,
  ProjectDetailPage,
  ProjectsPage,
} from '#features/projects/react';
import { SchoolDetailPage } from '#features/schools/react';
import { CreateSchoolPage, SchoolsPage } from '#features/schools/react';
import { SettingsPage } from '#features/settings/react';
import { OutletLayout, RootLayout } from '#layout';
import { RoutingServicePort } from '#routing/domain';

type Context = {
  authService: AuthService;
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
    if (context.authService.isAuthenticated()) {
      throw redirect({ to: '/home' });
    }
  },
});

export const signInRoute = createRoute({
  getParentRoute: () => authLayout,
  path: '/login',
  component: LoginPage,
});

export const oauthCallbackRoute = createRoute({
  getParentRoute: () => authLayout,
  path: '/oauth-callback',
  component: OAuthCallbackPage,
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
    if (!context.authService.isAuthenticated()) {
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

export const createProjectRoute = createRoute({
  getParentRoute: () => rootLayout,
  path: '/projects/create',
  component: CreateProjectPage,
});

export const projectDetailRoute = createRoute({
  getParentRoute: () => rootLayout,
  path: '/projects/$projectId',
  component: ProjectDetailPage,
});

export const klassDetailRoute = createRoute({
  getParentRoute: () => rootLayout,
  path: '/projects/$projectId/klasses/$klassId',
  component: KlassDetailPage,
});

export const productsRoute = createRoute({
  getParentRoute: () => rootLayout,
  path: '/products',
  component: ProductsPage,
});

export const createProductRoute = createRoute({
  getParentRoute: () => rootLayout,
  path: '/products/create',
  component: CreateProductPage,
});

export const productDetailRoute = createRoute({
  getParentRoute: () => rootLayout,
  path: '/products/$productId',
  component: ProductDetailPage,
});

export const schoolsRoute = createRoute({
  getParentRoute: () => rootLayout,
  path: '/schools',
  component: SchoolsPage,
});

export const createSchoolRoute = createRoute({
  getParentRoute: () => rootLayout,
  path: '/schools/create',
  component: CreateSchoolPage,
});

export const schoolDetailRoute = createRoute({
  getParentRoute: () => rootLayout,
  path: '/schools/$schoolId',
  component: SchoolDetailPage,
});

export const settingsRoute = createRoute({
  getParentRoute: () => rootLayout,
  path: '/settings',
  component: SettingsPage,
});

// ----- routeTree -----

export const routeTree = rootRoute.addChildren([
  authLayout.addChildren([signInRoute, signUpRoute, oauthCallbackRoute]),
  rootLayout.addChildren([
    dashboardRoute,
    projectsRoute,
    createProjectRoute,
    projectDetailRoute,
    klassDetailRoute,
    productsRoute,
    createProductRoute,
    productDetailRoute,
    schoolsRoute,
    createSchoolRoute,
    schoolDetailRoute,
    settingsRoute,
  ]),
]);
