import { ToastContainer } from 'react-toastify';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import { AuthProviderMockAdapter } from './features/auth/infra/providers';

import 'react-toastify/dist/ReactToastify.css';

import { useService } from '#di/react';
import { AuthProvider } from '#features/auth/react';
import { ProductsServiceMockAdapter } from '#features/products/infra';
import { ProjectsServiceMockAdapter } from '#features/projects/infra';
import { SchoolsServiceMockAdapter } from '#features/schools/infra';
import { StudentsServiceMockAdapter } from '#features/students/infra';
import { Router } from '#routing/react';

// Make utils available in the console
declare global {
  interface Window {
    services: {
      authProviderMockAdapter: AuthProviderMockAdapter;
      projectsServiceMockAdapter: ProjectsServiceMockAdapter;
      schoolsServiceMockAdapter: SchoolsServiceMockAdapter;
      productsServiceMockAdapter: ProductsServiceMockAdapter;
      studentsServiceMockAdapter: StudentsServiceMockAdapter;
    };
  }
}

export const App = () => {
  // start - export services on browser
  const authProviderMockAdapter = useService(AuthProviderMockAdapter);
  const projectsServiceMockAdapter = useService(ProjectsServiceMockAdapter);
  const schoolsServiceMockAdapter = useService(SchoolsServiceMockAdapter);
  const productsServiceMockAdapter = useService(ProductsServiceMockAdapter);
  const studentsServiceMockAdapter = useService(StudentsServiceMockAdapter);
  const services = {
    authProviderMockAdapter,
    projectsServiceMockAdapter,
    schoolsServiceMockAdapter,
    productsServiceMockAdapter,
    studentsServiceMockAdapter,
  };
  window.services = services;
  // end - export services on browser

  const queryClient = useService(QueryClient);
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Router />
        <ToastContainer
          style={{ zIndex: 10000 }}
          position="bottom-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        <ReactQueryDevtools initialIsOpen={false} />
      </AuthProvider>
    </QueryClientProvider>
  );
};
