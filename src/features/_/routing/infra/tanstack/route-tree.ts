import {
  createRootRouteWithContext,
  createRoute,
} from '@tanstack/react-router';

import { AuthLayout } from '../../../../../layout/auth.layout.tsx';
import { OAuthCallbackPage } from '../../../../auth/react/pages/oauth-callback.page.tsx';

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
import {
  CreateSchoolPage,
  SchoolDetailPage,
  SchoolsPage,
} from '#features/schools/react';
import { SettingsPage } from '#features/settings/react';
import { OutletLayout, RootLayout } from '#layout';
import { RoutingServicePort } from '#routing/domain';

type Context = {
  routingService: RoutingServicePort;
};

export const rootRoute = createRootRouteWithContext<Context>()({
  component: OutletLayout,
});

// ----- authLayout -----

export const authLayout = createRoute({
  getParentRoute: () => rootRoute,
  path: '/auth',
  component: AuthLayout,
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
