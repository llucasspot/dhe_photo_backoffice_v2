import { useParams } from '@tanstack/react-router';

import { GetterProvider } from '#action/react';
import { ProjectDetail } from '#features/projects/react';
import { ProjectGetter } from '#features/projects/use-cases';

export const ProjectDetailPage = () => {
  const { projectId } = useParams({ from: '/projects/$projectId' });

  return (
    <GetterProvider Getter={ProjectGetter} args={[projectId]}>
      <ProjectDetail />
    </GetterProvider>
  );
};
