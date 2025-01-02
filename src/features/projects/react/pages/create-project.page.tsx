import { useAction, useGetter } from '#action/react';
import { Button, Form, FormButton, Input, Select } from '#components';
import { useService } from '#di/react';
import { CreateProjectBody } from '#features/projects/domain';
import { CreateProjectAction } from '#features/projects/use-cases';
import { SchoolsGetter } from '#features/schools/use-cases';
import { useI18n } from '#i18n/react';
import { RoutingServicePort } from '#routing/domain';

export const CreateProjectPage = () => {
  const routingService = useService(RoutingServicePort);
  const { t } = useI18n();
  const createProject = useAction(CreateProjectAction);

  const { data: schools = [] } = useGetter(SchoolsGetter);
  const schoolOptions = schools.map((school) => ({
    value: school.id,
    label: school.name,
  }));

  const onSubmit = async (data: CreateProjectBody) => {
    try {
      await createProject.mutateAsync(data);
      await routingService.redirect('/projects');
    } catch (error) {
      console.log('CreateProjectPage form error : ', error);
    }
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
          <Select
            formKey="schoolId"
            label="projects.create.form.school"
            options={schoolOptions}
          />
          <Input
            formKey="shotDate"
            label="projects.create.form.shotDate"
            type="date"
          />
          <Input
            formKey="orderEndDate"
            label="projects.create.form.orderEndDate"
            type="date"
          />
          <Input
            formKey="messageForClients"
            label="projects.create.form.messageForClients"
            type="text"
          />
          <div className="flex justify-end space-x-4">
            <Button
              variant="secondary"
              link={{
                to: '/projects',
              }}
            >
              {t('common.actions.cancel')}
            </Button>
            <FormButton>{t('projects.create.form.submit')}</FormButton>
          </div>
        </Form>
      </div>
    </div>
  );
};
