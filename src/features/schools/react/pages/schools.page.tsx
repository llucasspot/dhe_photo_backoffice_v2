import { SchoolList } from '../components';
import { useSchools } from '../hooks';

import { Button } from '#components';
import { useI18n } from '#i18n/react';

export const SchoolsPage = () => {
  const { t } = useI18n();
  const { data: schools = [], isLoading, error } = useSchools();

  return (
    <div className="p-8">
      <div className="md:flex md:items-center md:justify-between">
        <div className="flex-1 min-w-0">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
            {t('schools.title')}
          </h2>
        </div>
        <div className="mt-4 flex md:mt-0 md:ml-4">
          <Button link={{ to: '/schools/create' }}>
            {t('schools.addSchool')}
          </Button>
        </div>
      </div>

      <div className="mt-8 bg-white shadow overflow-hidden sm:rounded-md">
        <SchoolList schools={schools} isLoading={isLoading} error={error} />
      </div>
    </div>
  );
};
