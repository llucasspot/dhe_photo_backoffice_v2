import { Button, Form, Input } from '#components';
import { useService } from '#di/react';
import {
  CreateProjectBody,
  ProjectsServicePort,
  ProjectState,
} from '#features/projects/domain';
import { useI18n } from '#i18n/react';
import { RoutingServicePort } from '#routing/domain';
import { Link } from '#routing/react';

export const CreateProjectPage = () => {
  const routingService = useService(RoutingServicePort);
  const { t } = useI18n();
  const projectsService = useService(ProjectsServicePort);

  const onSubmit = async (data: CreateProjectBody) => {
    await projectsService.createProject(data);
    await routingService.redirect('/projects');
  };

  return (
    <div className="p-8">
      <div className="md:flex md:items-center md:justify-between mb-8">
        <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
          {t('projects.create.title')}
        </h2>
      </div>

      <div className="bg-white shadow rounded-lg p-6">
        <Form dto={CreateProjectBody} onSubmit={onSubmit} className="space-y-6">
          <Input formKey="name" label="projects.create.form.name" />
          <Input formKey="schoolName" label="projects.create.form.schoolName" />
          <Input formKey="lieu" label="projects.create.form.lieu" />
          <Input
            hidden
            formKey="state"
            label="projects.create.form.state"
            value={ProjectState.Unpublished}
          />
          <div className="flex justify-end space-x-4">
            <Link to="/projects">
              <Button variant="secondary" type="button">
                {t('common.actions.cancel')}
              </Button>
            </Link>
            <Button type="submit">{t('projects.create.form.submit')}</Button>
          </div>
        </Form>
      </div>
    </div>
  );
};
