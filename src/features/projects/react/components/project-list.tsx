import { match } from 'ts-pattern';

import { ProjectRow } from './project-row';

import { ProjectDto } from '#features/projects/domain';
import { useI18n } from '#i18n/react';

const ProjectListLoading = () => {
  const { t } = useI18n();
  return (
    <div className="p-4 text-center text-gray-500">
      {t('projects.list.pending')}
    </div>
  );
};

const ProjectListError = ({ error }: { error: Error | null }) => {
  const { t } = useI18n();
  console.error('Project list error:', error);
  return (
    <div className="p-4 text-center text-red-500">
      {t('projects.list.error')}
    </div>
  );
};

const ProjectListEmpty = () => {
  const { t } = useI18n();
  return (
    <div className="p-4 text-center text-gray-500">
      {t('projects.list.empty')}
    </div>
  );
};

const ProjectListNonEmpty = ({ projects }: { projects: ProjectDto[] }) => {
  return (
    <ul className="divide-y divide-gray-200">
      {projects.map((project) => (
        <li key={project.id}>
          <ProjectRow project={project} />
        </li>
      ))}
    </ul>
  );
};

export const ProjectList = ({
  projects,
  isLoading,
  error,
}: {
  projects: ProjectDto[];
  isLoading: boolean;
  error: Error | null;
}) => {
  return match({ isLoading, error, projects })
    .with({ isLoading: true }, ProjectListLoading)
    .when(({ error }) => !!error, ProjectListError)
    .with({ projects: [] }, ProjectListEmpty)
    .when(({ projects }) => projects.length, ProjectListNonEmpty)
    .run();
};
