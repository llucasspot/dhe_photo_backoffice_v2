import { ProjectDto } from "@domain/modules";
import { match } from 'ts-pattern';

import { ProjectRow } from './project-row';

import { useContextGetter } from '#action/react';
import { ProjectsGetter } from '#features/projects/use-cases';
import { useI18n } from '#i18n/react';

const ProjectListLoading = () => {
  const { t } = useI18n();
  const { getter } = useContextGetter(ProjectsGetter);

  return (
    <div className="p-4 text-center text-gray-500">
      {t(getter.i18nKeys.pending)}
    </div>
  );
};

const ProjectListError = ({ error }: { error: Error | null }) => {
  const { t } = useI18n();
  const { getter } = useContextGetter(ProjectsGetter);

  console.error('Project list error:', error);

  return (
    <div className="p-4 text-center text-red-500">
      {t(getter.i18nKeys.error)}
    </div>
  );
};

const ProjectListEmpty = () => {
  const { t } = useI18n();
  const { getter } = useContextGetter(ProjectsGetter);

  return (
    <div className="p-4 text-center text-gray-500">
      {t(getter.i18nKeys.empty)}
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

export const ProjectList = () => {
  const {
    queryResult: { data: projects = [], isLoading, error },
  } = useContextGetter(ProjectsGetter);

  return match({ isLoading, error, projects })
    .with({ isLoading: true }, ProjectListLoading)
    .when(({ error }) => !!error, ProjectListError)
    .with({ projects: [] }, ProjectListEmpty)
    .when(({ projects }) => projects.length, ProjectListNonEmpty)
    .run();
};
