import { useEffect } from 'react';
import { useInstance } from '@mygoodstack/di-react';

import { UserInfoGetter } from '../features/auth/use-cases/getter/user-info.getter';

import { OutletLayout } from './outlet.layout';

import { useAction, useGetter } from '#action/react';
import { Sidebar } from '#components';
import { SignOutAction } from '#features/auth/use-cases';
import { useI18n } from '#i18n/react';
import { RoutingServicePort } from '#routing/domain';
import { Link } from '#routing/react';

export const RootLayout = () => {
  const { t, changeLanguage, currentLanguage } = useI18n();
  const routingService = useInstance(RoutingServicePort);

  const { data, isLoading, isError } = useGetter(UserInfoGetter);
  const isAuthenticated = data!;

  useEffect(() => {
    if (isError) {
      routingService.redirect('/auth/login');
    }
  }, [isError, routingService]);

  const signOutAction = useAction(SignOutAction);

  if (isLoading) {
    return <div>Loading...</div>;
  }

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
