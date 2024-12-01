import { useParams } from '@tanstack/react-router';
import { match } from 'ts-pattern';

import { FolderDropzone, KlassDropzoneHandlerService } from '../components';
import { ProjectProducts } from '../components/products/project-products';
import { useCreateKlassesFromFiles, useProject } from '../hooks';

import { useService } from '#di/react';
import { KlassGrid } from '#features/klasses/react';
import { ProjectDto } from '#features/projects/domain';
import { useI18n } from '#i18n/react';
import { Link } from '#routing/react';

const ProjectDetailLoading = () => (
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

const ProjectDetailError = ({ error }: { error: Error | null }) => {
  const { t } = useI18n();
  console.error('Project detail error:', error);
  return (
    <div className="p-8">
      <div className="text-red-500">{t('projects.detail.error')}</div>
    </div>
  );
};

const ProjectDetailContent = ({ project }: { project: ProjectDto }) => {
  const { t } = useI18n();
  const folderDropzoneService = useService(KlassDropzoneHandlerService);
  const createKlassesFromFiles = useCreateKlassesFromFiles();

  const projectId = project.id;
  const school = project.school;

  return (
    <div className="p-8">
      <div className="md:flex md:items-center md:justify-between mb-8">
        <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
          {project.name}
        </h2>
        <div className="mt-4 flex md:mt-0 md:ml-4">
          <Link to="/projects">
            <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
              {t('common.actions.back')}
            </button>
          </Link>
        </div>
      </div>

      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            {t('projects.detail.title')}
          </h3>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">
            {t('projects.detail.subtitle')}
          </p>
        </div>
        <div className="border-t border-gray-200">
          <dl>
            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">
                {t('projects.detail.fields.name')}
              </dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {project.name}
              </dd>
            </div>
            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">
                {t('projects.detail.fields.school')}
              </dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {school ? school.name : '// TODO unknown'}
              </dd>
            </div>
            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">
                {t('projects.detail.fields.shotDate')}
              </dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {new Date(project.shotDate).toLocaleDateString()}
              </dd>
            </div>
            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">
                {t('projects.detail.fields.orderEndDate')}
              </dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {new Date(project.orderEndDate).toLocaleDateString()}
              </dd>
            </div>
            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">
                {t('projects.detail.fields.status')}
              </dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                <span
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    project.state === 'published'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  {t(`common.status.${project.state}`)}
                </span>
              </dd>
            </div>
            {project.messageForClients && (
              <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">
                  {t('projects.detail.fields.messageForClients')}
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {project.messageForClients}
                </dd>
              </div>
            )}
          </dl>
        </div>
      </div>

      <ProjectProducts project={project} />

      <div className="mt-8">
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          {t('klasses.title')}
        </h3>
        <FolderDropzone
          labels={{
            instructions: 'projects.detail.dropzone.instructions',
            hint: 'projects.detail.dropzone.hint',
            dragActive: 'projects.detail.dropzone.dragActive',
          }}
          fileValidator={(file) => {
            return folderDropzoneService.fileValidator(file);
          }}
          onDrop={async ({ acceptedFiles, rejectedFiles }) => {
            await createKlassesFromFiles.mutateAsync({
              projectId,
              acceptedFiles,
              rejectedFiles,
            });
          }}
        />
        <KlassGrid klasses={project.klasses} />
      </div>
    </div>
  );
};

export const ProjectDetailPage = () => {
  const { projectId } = useParams({ from: '/projects/$projectId' });
  const { data: project, isLoading, error } = useProject(projectId);

  return match({ project, isLoading, error })
    .with({ isLoading: true }, ProjectDetailLoading)
    .when(({ error }) => !!error, ProjectDetailError)
    .when(
      ({ project }) => !!project,
      ({ project }) => <ProjectDetailContent project={project!} />,
    )
    .run();
};
