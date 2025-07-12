import { SchoolDto } from "@domain/modules";
import { match } from 'ts-pattern';

import { SchoolRow } from './school-row';

import { useContextGetter } from '#action/react';
import { SchoolsGetter } from '#features/schools/use-cases';
import { useI18n } from '#i18n/react';

const SchoolListLoading = () => {
  const { t } = useI18n();
  const { getter } = useContextGetter(SchoolsGetter);

  return (
    <div className="p-4 text-center text-gray-500">
      {t(getter.i18nKeys.pending)}
    </div>
  );
};

const SchoolListError = ({ error }: { error: Error | null }) => {
  const { t } = useI18n();
  const { getter } = useContextGetter(SchoolsGetter);

  console.error('SchoolListError list error:', error);

  return (
    <div className="p-4 text-center text-red-500">
      {t(getter.i18nKeys.error)}
    </div>
  );
};

const SchoolListEmpty = () => {
  const { t } = useI18n();
  const { getter } = useContextGetter(SchoolsGetter);

  return (
    <div className="p-4 text-center text-gray-500">
      {t(getter.i18nKeys.empty)}
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

export const SchoolList = () => {
  const { queryResult } = useContextGetter(SchoolsGetter);
  const { data: schools = [], isLoading, error } = queryResult;

  return match({ isLoading, error, schools })
    .with({ isLoading: true }, SchoolListLoading)
    .when(({ error }) => !!error, SchoolListError)
    .with({ schools: [] }, SchoolListEmpty)
    .when(({ schools }) => schools.length, SchoolListNonEmpty)
    .run();
};
