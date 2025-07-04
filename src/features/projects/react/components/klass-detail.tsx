import { useInstance } from '@mygoodstack/di-react';
import { match } from 'ts-pattern';

import { FolderDropzone, KlassPictureDropzoneHandlerService } from './index.ts';

import { useAction, useContextGetter } from '#action/react';
import { BlobViewer } from '#components';
import { KlassDto } from '#features/klasses/domain';
import {
  CreateGroupPictureFromFilesAction,
  KlassGetter,
} from '#features/projects/use-cases';
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
  const { getter } = useContextGetter(KlassGetter);

  console.error('Klass detail error:', error);

  return (
    <div className="p-8">
      <div className="text-red-500">{t(getter.i18nKeys.error)}</div>
    </div>
  );
};

const KlassDetailContent = ({
  klass,
}: {
  klass: Omit<KlassDto, 'project'>;
}) => {
  const { t } = useI18n();
  const klassPictureDropzoneHandlerService = useInstance(
    KlassPictureDropzoneHandlerService,
  );
  const createGroupPictureFromFiles = useAction(
    CreateGroupPictureFromFilesAction,
  );
  const klassId = klass.id;
  const projectId = klass.projectId;

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

      <div className="mb-8">
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          {t('klasses.detail.groupPhoto.title')}
        </h3>
        <FolderDropzone
          labels={{
            instructions: 'klasses.detail.groupPhoto.dropzone.instructions',
            hint: 'klasses.detail.groupPhoto.dropzone.hint',
            dragActive: 'klasses.detail.groupPhoto.dropzone.dragActive',
          }}
          fileValidator={(file) =>
            klassPictureDropzoneHandlerService.fileValidator(file)
          }
          onDrop={async ({ acceptedFiles, rejectedFiles }) => {
            await createGroupPictureFromFiles.mutateAsync({
              projectId,
              klassId,
              acceptedFiles,
              rejectedFiles,
            });
          }}
        />
        <div className="mt-4">
          <p className="text-sm text-gray-500">
            {t('klasses.detail.groupPhoto.list.empty')}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-6">
            {klass.photos.map((picture) => (
              <div
                key={picture.id}
                className="bg-white p-4 rounded-lg shadow-sm border border-gray-200"
              >
                <div className="grid grid-cols-2 gap-2">
                  <div
                    key={picture.id}
                    className="aspect-square bg-gray-100 rounded-md flex items-center justify-center"
                  >
                    <BlobViewer pictureId={picture.id} />
                  </div>
                </div>
              </div>
            ))}
          </div>
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
                {student.photos.map((picture) => (
                  <div
                    key={picture.id}
                    className="aspect-square bg-gray-100 rounded-md flex items-center justify-center"
                  >
                    <BlobViewer pictureId={picture.id} />
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

export const KlassDetail = () => {
  const {
    queryResult: { data: klass, isLoading, error },
  } = useContextGetter(KlassGetter);

  return match({ klass, isLoading, error })
    .with({ isLoading: true }, KlassDetailLoading)
    .when(({ error }) => !!error, KlassDetailError)
    .when(
      ({ klass }) => !!klass,
      ({ klass }) => <KlassDetailContent klass={klass!} />,
    )
    .run();
};
