import { SchoolDto } from '../domain';
import { SchoolRow } from './school-row';

const mockSchools: SchoolDto[] = [
  {
    id: '1',
    name: 'Saint Joseph High School',
    location: 'Paris',
    type: 'private',
    studentCount: 850,
    status: 'active',
  },
  {
    id: '2',
    name: 'Lycée Victor Hugo',
    location: 'Lyon',
    type: 'public',
    studentCount: 1200,
    status: 'active',
  },
  {
    id: '3',
    name: 'International School of Marseille',
    location: 'Marseille',
    type: 'private',
    studentCount: 600,
    status: 'inactive',
  },
];

export const SchoolList = () => {
  return (
    <ul className="divide-y divide-gray-200">
      {mockSchools.map((school) => (
        <li key={school.id}>
          <SchoolRow school={school} />
        </li>
      ))}
    </ul>
  );
};