import { SchoolDto } from '../domain';

import { useI18n } from '#i18n/react';
import { Link } from '#routing/react';

interface SchoolRowProps {
  school: SchoolDto;
}

export const SchoolRow = ({ school }: SchoolRowProps) => {
  const { t } = useI18n();

  return (
    <Link to="/schools" className="block px-6 py-4 hover:bg-gray-50">
      <div className="flex items-center justify-between">
        <div className="min-w-0 flex-1">
          <div className="flex items-center space-x-3">
            <div className="flex-shrink-0">
              <div
                className={`w-3 h-3 rounded-full ${
                  school.status === 'active' ? 'bg-green-400' : 'bg-gray-400'
                }`}
              />
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-900">
                {school.name}
              </h3>
              <p className="text-sm text-gray-500">
                {t(`schools.list.type.${school.type}`)} • {school.location} •{' '}
                {school.studentCount} {t('schools.list.students')}
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
      </div>
    </Link>
  );
};
