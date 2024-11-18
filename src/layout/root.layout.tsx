import { OutletLayout } from './outlet.layout.tsx';

import { Sidebar } from '#components';
import { useService } from '#di/react';
import { useAuth } from '#lib/auth';
import { RoutingServicePort } from '#routing/domain';
import { Link } from '#routing/react';

export const RootLayout = () => {
  const routingService = useService(RoutingServicePort);
  const { isAuthenticated, logout } = useAuth();

  const handleLogout = async () => {
    logout();
    await routingService.redirect('/auth/login');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm fixed top-0 left-0 right-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <Link
                to="/home"
                className="flex items-center px-2 py-2 text-gray-700 hover:text-gray-900"
              >
                Dashboard
              </Link>
            </div>
            <div className="flex items-center">
              {isAuthenticated ? (
                <button
                  onClick={handleLogout}
                  className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-gray-900"
                >
                  Sign out
                </button>
              ) : (
                <>
                  <Link
                    to="/auth/login"
                    className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-gray-900"
                  >
                    Sign in
                  </Link>
                  <Link
                    to="/auth/register"
                    className="ml-4 px-3 py-2 rounded-md text-sm font-medium bg-blue-600 text-white hover:bg-blue-700"
                  >
                    Sign up
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>
      <div className="flex pt-16">
        {isAuthenticated && <Sidebar />}
        <div className={`flex-1 ${isAuthenticated ? 'pl-64' : ''}`}>
          <OutletLayout />
        </div>
      </div>
    </div>
  );
};
