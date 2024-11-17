import { ProjectDto } from '../domain';

import { ProjectRow } from './project-row.tsx';

const mockProjects: ProjectDto[] = [
  {
    id: '1',
    name: 'School Project A',
    schoolName: 'High School 1',
    lieu: 'Paris',
    etat: 'published',
  },
  {
    id: '2',
    name: 'School Project B',
    schoolName: 'High School 2',
    lieu: 'Lyon',
    etat: 'unpublished',
  },
  {
    id: '3',
    name: 'School Project C',
    schoolName: 'High School 3',
    lieu: 'Marseille',
    etat: 'published',
  },
];

export const ProjectList = () => {
  return (
    <ul className="divide-y divide-gray-200">
      {mockProjects.map((project) => (
        <li key={project.id}>
          <ProjectRow project={project} />
        </li>
      ))}
    </ul>
  );
};
