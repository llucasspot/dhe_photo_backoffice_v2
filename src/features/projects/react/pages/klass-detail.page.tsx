import { useParams } from '@tanstack/react-router';
import { match } from 'ts-pattern';

import { useKlass } from '../hooks';

import { KlassDto } from '#features/klasses/domain';
import { useI18n } from '#i18n/react';
import { Link } from '#routing/react';

const KlassDetailLoading = () => (
  <div className="p-8">
    <div className="animate-pulse space-y-4">
      <div className="h-8 bg-gray-200 rounded w-1/4"></div>
      <div className="space-y-3">
        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
      </div>
    </div>
  </div>
);

const KlassDetailError = ({ error }: { error: Error | null }) => {
  const { t } = useI18n();
  console.error('Klass detail error:', error);
  return (
    <div className="p-8">
      <div className="text-red-500">{t('klasses.detail.error')}</div>
    </div>
  );
};

const KlassDetailContent = ({
  klass,
}: {
  klass: Omit<KlassDto, 'project'>;
}) => {
  const { t } = useI18n();

  return (
    <div className="p-8">
      <div className="md:flex md:items-center md:justify-between mb-8">
        <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
          {klass.name}
        </h2>
        <div className="mt-4 flex md:mt-0 md:ml-4">
          <Link
            to="/projects/$projectId"
            params={{ projectId: klass.projectId }}
          >
            <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
              {t('common.actions.back')}
            </button>
          </Link>
        </div>
      </div>

      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-6">
          {klass.students.map((student) => (
            <div
              key={student.id}
              className="bg-white p-4 rounded-lg shadow-sm border border-gray-200"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-900">
                  {student.code}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {student.photoIds.map((photoId) => (
                  <div
                    key={photoId}
                    className="aspect-square bg-gray-100 rounded-md flex items-center justify-center"
                  >
                    <span className="text-xs text-gray-500">
                      Photo {photoId}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export const KlassDetailPage = () => {
  const { klassId } = useParams({
    from: '/projects/$projectId/klasses/$klassId',
  });
  const { data: klass, isLoading, error } = useKlass(klassId);

  return match({ klass, isLoading, error })
    .with({ isLoading: true }, KlassDetailLoading)
    .when(({ error }) => !!error, KlassDetailError)
    .when(
      ({ klass }) => !!klass,
      ({ klass }) => <KlassDetailContent klass={klass!} />,
    )
    .run();
};
