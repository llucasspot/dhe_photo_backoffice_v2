import { useI18n } from '#i18n/react';

export const DashboardPage = () => {
  const { t } = useI18n();
  
  return (
    <div className="p-8">
      <div className="md:flex md:items-center md:justify-between">
        <div className="flex-1 min-w-0">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
            {t('dashboard.title')}
          </h2>
        </div>
      </div>
      <div className="mt-8">
        <div className="bg-white shadow overflow-hidden sm:rounded-lg p-6">
          <p className="text-gray-500">{t('dashboard.welcome')}</p>
        </div>
      </div>
    </div>
  );
};