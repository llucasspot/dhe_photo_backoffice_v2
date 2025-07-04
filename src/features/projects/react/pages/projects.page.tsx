import { ProjectList } from '../components';

import { GetterProvider } from '#action/react';
import { Button } from '#components';
import { ProjectsGetter } from '#features/projects/use-cases';
import { useI18n } from '#i18n/react';

export const ProjectsPage = () => {
  const { t } = useI18n();

  return (
    <div className="p-8">
      <div className="md:flex md:items-center md:justify-between">
        <div className="flex-1 min-w-0">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
            {t('projects.title')}
          </h2>
        </div>
        <div className="mt-4 flex md:mt-0 md:ml-4">
          <Button link={{ to: '/projects/create' }}>
            {t('projects.addProject')}
          </Button>
        </div>
      </div>

      <div className="mt-8 bg-white shadow overflow-hidden sm:rounded-md">
        <GetterProvider Getter={ProjectsGetter}>
          <ProjectList />
        </GetterProvider>
      </div>
    </div>
  );
};
