import { useI18n } from '#i18n/react';
import { Link } from '#routing/react';

export const Sidebar = () => {
  const { t } = useI18n();

  return (
    <div className="w-64 bg-white h-[calc(100vh-4rem)] border-r border-gray-200 fixed">
      <div className="h-full flex flex-col">
        <nav className="flex-1 px-2 py-4">
          <div className="space-y-1">
            <Link
              to="/home"
              activeProps={{
                className:
                  'group flex items-center px-3 py-2 text-sm font-medium rounded-md bg-gray-100 text-gray-900',
              }}
              inactiveProps={{
                className:
                  'group flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900',
              }}
            >
              <svg
                className="mr-3 h-6 w-6 text-gray-400 group-hover:text-gray-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                />
              </svg>
              {t('navigation.dashboard')}
            </Link>
            <Link
              to="/schools"
              activeProps={{
                className:
                  'group flex items-center px-3 py-2 text-sm font-medium rounded-md bg-gray-100 text-gray-900',
              }}
              inactiveProps={{
                className:
                  'group flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900',
              }}
            >
              <svg
                className="mr-3 h-6 w-6 text-gray-400 group-hover:text-gray-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                />
              </svg>
              {t('navigation.schools')}
            </Link>
            <Link
              to="/projects"
              activeProps={{
                className:
                  'group flex items-center px-3 py-2 text-sm font-medium rounded-md bg-gray-100 text-gray-900',
              }}
              inactiveProps={{
                className:
                  'group flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900',
              }}
            >
              <svg
                className="mr-3 h-6 w-6 text-gray-400 group-hover:text-gray-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                />
              </svg>
              {t('navigation.projects')}
            </Link>
            <Link
              to="/products"
              activeProps={{
                className:
                  'group flex items-center px-3 py-2 text-sm font-medium rounded-md bg-gray-100 text-gray-900',
              }}
              inactiveProps={{
                className:
                  'group flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900',
              }}
            >
              <svg
                className="mr-3 h-6 w-6 text-gray-400 group-hover:text-gray-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                />
              </svg>
              {t('navigation.products')}
            </Link>
            <Link
              to="/settings"
              activeProps={{
                className:
                  'group flex items-center px-3 py-2 text-sm font-medium rounded-md bg-gray-100 text-gray-900',
              }}
              inactiveProps={{
                className:
                  'group flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900',
              }}
            >
              <svg
                className="mr-3 h-6 w-6 text-gray-400 group-hover:text-gray-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              {t('navigation.settings')}
            </Link>
          </div>
        </nav>
      </div>
    </div>
  );
};
