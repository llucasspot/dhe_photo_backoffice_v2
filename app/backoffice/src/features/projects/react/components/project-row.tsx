import { SchoolProjectDto } from '@domain/modules';

import { useI18n } from '#i18n/react';
import { Link } from '#routing/react';

interface ProjectRowProps {
  project: SchoolProjectDto;
}

export const ProjectRow = ({ project }: ProjectRowProps) => {
  const { t } = useI18n();
  const projectId = project.id;

  const school = project.school;

  return (
    <Link
      to="/projects/$projectId"
      params={{ projectId }}
      className="flex px-6 py-4 hover:bg-gray-50 items-center justify-between"
    >
      <div className="min-w-0 flex-1">
        <div className="flex items-center space-x-3">
          <div className="flex-shrink-0">
            <div
              className={`w-3 h-3 rounded-full ${
                project.state === 'published' ? 'bg-green-400' : 'bg-gray-400'
              }`}
            />
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-900">
              {project.name}
            </h3>
            <p className="text-sm text-gray-500">
              {school ? school.name : '// TODO unknown'} •{' '}
              {t(`common.status.${project.state}`)}
            </p>
          </div>
        </div>
      </div>
      <div>
        <svg
          className="h-5 w-5 text-gray-400"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
            clipRule="evenodd"
          />
        </svg>
      </div>
    </Link>
  );
};
