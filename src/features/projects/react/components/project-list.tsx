import { match } from 'ts-pattern';

import { ProjectRow } from './project-row';

import { ProjectDto } from '#features/projects/domain';

const ProjectListLoading = () => (
  <div className="p-4 text-center text-gray-500">Loading projects...</div>
);

const ProjectListError = ({ error }: { error: Error | null }) => {
  console.log(error);
  return (
    <div className="p-4 text-center text-red-500">Error loading projects</div>
  );
};

const ProjectListEmpty = () => (
  <div className="p-4 text-center text-gray-500">No projects found.</div>
);

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
    .when(({ error }) => error !== null, ProjectListError)
    .with({ projects: [] }, ProjectListEmpty)
    .when(({ projects }) => projects.length, ProjectListNonEmpty)
    .run();
};
