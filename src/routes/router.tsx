import { createRouter, RouterProvider } from '@tanstack/react-router';

import { context, routeTree } from './tanstack-router/routes.tsx';

const router = createRouter({ routeTree, context });

export const Router = () => {
  return <RouterProvider router={router} />;
};
