import { useEffect } from 'react';

import { OutletLayout } from './outlet.layout';

import { useAction } from '#action/react';
import { Sidebar } from '#components';
import { useService } from '#di/react';
import { AuthState } from '#features/auth/domain';
import { AuthProviderPort } from '#features/auth/domain';
import { SignOutAction } from '#features/auth/use-cases';
import { useI18n } from '#i18n/react';
import { RoutingServicePort } from '#routing/domain';
import { Link } from '#routing/react';
import { StorageService } from '#storage/domain';

export const RootLayout = () => {
  const authProviderPort = useService(AuthProviderPort);
  const routingService = useService(RoutingServicePort);
  const storageService = useService(StorageService);

  const authState = useService(AuthState);
  const authStateValue = authState.use();
  const isAuthenticated = authStateValue.currentUser;

  const signOutAction = useAction(SignOutAction);

  useEffect(() => {
    authProviderPort.getUserInfo().then((info) => {
      authState.set({ currentUser: info });
    });
  }, [authProviderPort, authState, storageService]);

  useEffect(() => {
    if (isAuthenticated && !isAuthenticated) {
      routingService.redirect('/auth/login');
    }
  }, [isAuthenticated, routingService]);

  const { t, changeLanguage, currentLanguage } = useI18n();

  const handleLogout = async () => {
    await signOutAction.mutateAsync();
    await routingService.redirect('/auth/login');
  };

  const toggleLanguage = async () => {
    const newLang = currentLanguage === 'en' ? 'fr' : 'en';
    await changeLanguage(newLang);
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
                {t('navigation.dashboard')}
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={toggleLanguage}
                className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-gray-900"
              >
                {currentLanguage.toUpperCase()}
              </button>
              {isAuthenticated ? (
                <button
                  onClick={handleLogout}
                  className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-gray-900"
                >
                  {t('navigation.signOut')}
                </button>
              ) : (
                <>
                  <Link
                    to="/auth/login"
                    className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-gray-900"
                  >
                    {t('navigation.signIn')}
                  </Link>
                  <Link
                    to="/auth/register"
                    className="ml-4 px-3 py-2 rounded-md text-sm font-medium bg-blue-600 text-white hover:bg-blue-700"
                  >
                    {t('navigation.signUp')}
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>
      <div className="flex pt-16">
        <Sidebar />
        <div className="flex-1 pl-64">
          <OutletLayout />
        </div>
      </div>
    </div>
  );
};
