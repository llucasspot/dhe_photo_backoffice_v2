import { match } from 'ts-pattern';

import { SchoolRow } from './school-row';

import { SchoolDto } from '#features/schools/domain';
import { useI18n } from '#i18n/react';

const SchoolListLoading = () => {
  const { t } = useI18n();
  return (
    <div className="p-4 text-center text-gray-500">
      {t('schools.list.empty')}
    </div>
  );
};

const SchoolListError = ({ error }: { error: Error | null }) => {
  const { t } = useI18n();
  console.log(error);
  return (
    <div className="p-4 text-center text-red-500">
      {t('schools.list.empty')}
    </div>
  );
};

const SchoolListEmpty = () => {
  const { t } = useI18n();
  return (
    <div className="p-4 text-center text-gray-500">
      {t('schools.list.empty')}
    </div>
  );
};

const SchoolListNonEmpty = ({ schools }: { schools: SchoolDto[] }) => {
  return (
    <ul className="divide-y divide-gray-200">
      {schools.map((school) => (
        <li key={school.id}>
          <SchoolRow school={school} />
        </li>
      ))}
    </ul>
  );
};

export const SchoolList = ({
  schools,
  isLoading,
  error,
}: {
  schools: SchoolDto[];
  isLoading: boolean;
  error: Error | null;
}) => {
  return match({ isLoading, error, schools })
    .with({ isLoading: true }, SchoolListLoading)
    .when(({ error }) => !!error, SchoolListError)
    .with({ schools: [] }, SchoolListEmpty)
    .when(({ schools }) => schools.length, SchoolListNonEmpty)
    .run();
};
