import { useParams } from '@tanstack/react-router';

import { SchoolDetail } from '../components/school-detail';

import { GetterProvider } from '#action/react';
import { SchoolGetter } from '#features/schools/use-cases';

export const SchoolDetailPage = () => {
  const { schoolId } = useParams({ from: '/schools/$schoolId' });

  return (
    <GetterProvider Getter={SchoolGetter} args={[schoolId]}>
      <SchoolDetail />
    </GetterProvider>
  );
};
