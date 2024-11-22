import { Button, Form, Input } from '#components';
import { useService } from '#di/react';
import {
  CreateSchoolBody,
  SchoolsServicePort,
  SchoolStatus,
  SchoolType,
} from '#features/schools/domain';
import { useI18n } from '#i18n/react';
import { RoutingServicePort } from '#routing/domain';
import { Link } from '#routing/react';

export const CreateSchoolPage = () => {
  const routingService = useService(RoutingServicePort);
  const { t } = useI18n();
  const schoolsService = useService(SchoolsServicePort);

  const onSubmit = async (data: CreateSchoolBody) => {
    await schoolsService.createSchools(data);
    await routingService.redirect('/schools');
  };

  return (
    <div className="p-8">
      <div className="md:flex md:items-center md:justify-between mb-8">
        <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
          {t('schools.create.title')}
        </h2>
      </div>

      <div className="bg-white shadow rounded-lg p-6">
        <Form dto={CreateSchoolBody} onSubmit={onSubmit} className="space-y-6">
          <Input formKey="name" label="schools.create.form.name" />
          <Input formKey="location" label="schools.create.form.location" />
          <select
            name="type"
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
          >
            <option value={SchoolType.Public}>
              {t('schools.list.type.public')}
            </option>
            <option value={SchoolType.Private}>
              {t('schools.list.type.private')}
            </option>
          </select>
          <select
            name="status"
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
          >
            <option value={SchoolStatus.Active}>
              {t('schools.list.status.active')}
            </option>
            <option value={SchoolStatus.Inactive}>
              {t('schools.list.status.inactive')}
            </option>
          </select>
          <Input
            formKey="studentCount"
            label="schools.create.form.studentCount"
            type="number"
            min="0"
          />
          <div className="flex justify-end space-x-4">
            <Link to="/schools">
              <Button variant="secondary" type="button">
                {t('common.actions.cancel')}
              </Button>
            </Link>
            <Button type="submit">{t('schools.create.form.submit')}</Button>
          </div>
        </Form>
      </div>
    </div>
  );
};
