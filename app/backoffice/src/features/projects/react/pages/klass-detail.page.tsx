import { useParams } from '@tanstack/react-router';

import { GetterProvider } from '#action/react';
import { KlassDetail } from '#features/projects/react';
import { KlassGetter } from '#features/projects/use-cases';

export const KlassDetailPage = () => {
  const { klassId, projectId } = useParams({
    from: '/projects/$projectId/klasses/$klassId',
  });

  return (
    <GetterProvider Getter={KlassGetter} args={[{ klassId, projectId }]}>
      <KlassDetail />
    </GetterProvider>
  );
};
