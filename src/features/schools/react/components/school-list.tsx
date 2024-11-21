import { match } from 'ts-pattern';

import { SchoolRow } from './school-row';

import { SchoolDto } from '#features/schools/domain';

const SchoolListLoading = () => (
  <div className="p-4 text-center text-gray-500">Loading schools...</div>
);

const SchoolListError = ({ error }: { error: Error | null }) => {
  console.log(error);
  return (
    <div className="p-4 text-center text-red-500">Error loading schools</div>
  );
};

const SchoolListEmpty = () => (
  <div className="p-4 text-center text-gray-500">No schools found.</div>
);

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
    .when(({ error }) => error !== null, SchoolListError)
    .with({ schools: [] }, SchoolListEmpty)
    .when(({ schools }) => schools.length, SchoolListNonEmpty)
    .run();
};
