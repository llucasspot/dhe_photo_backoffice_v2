import { useCreateSchool } from '../hooks';

import { Button, Form, Input, Select } from '#components';
import { useService } from '#di/react';
import {
  availableCurrencyOptions,
  CreateSchoolBody,
} from '#features/schools/domain';
import { useI18n } from '#i18n/react';
import { RoutingServicePort } from '#routing/domain';
import { Link } from '#routing/react';

export const CreateSchoolPage = () => {
  const routingService = useService(RoutingServicePort);
  const { t } = useI18n();
  const createSchool = useCreateSchool();

  const onSubmit = async (data: CreateSchoolBody) => {
    try {
      await createSchool.mutateAsync(data);
      await routingService.redirect('/schools');
    } catch (error) {
      console.log('CreateSchoolPage form error : ', error);
    }
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
          <Select
            formKey="currency"
            label="schools.create.form.currency"
            options={availableCurrencyOptions}
          />
          <Input formKey="city" label="schools.create.form.city" />
          <div className="flex justify-end space-x-4">
            <Link to="/schools">
              <Button variant="secondary" type="button">
                {t('common.actions.cancel')}
              </Button>
            </Link>
            <Button type="submit" disabled={createSchool.isPending}>
              {t('schools.create.form.submit')}
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};
