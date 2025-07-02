import { useInstance } from '@mygoodstack/di-react';

import { useAction } from '#action/react';
import { form } from '#components';
import { Button, FormButton } from '#components';
import { CreateSchoolBody, SchoolDto } from '#features/schools/domain';
import { CreateSchoolAction } from '#features/schools/use-cases';
import { useI18n } from '#i18n/react';
import { RoutingServicePort } from '#routing/domain';

export const CreateSchoolPage = () => {
  const routingService = useInstance(RoutingServicePort);
  const { t } = useI18n();
  const createSchool = useAction(CreateSchoolAction);

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
        <form.Form
          formName="CreateSchoolForm"
          dto={CreateSchoolBody}
          onSubmit={onSubmit}
          className="space-y-6"
        >
          <form.InputContainer>
            <form.Label formKey="name" />
            <form.Input formKey="name" />
            <form.ErrorLabel formKey="name" />
          </form.InputContainer>

          <form.InputContainer>
            <form.Label formKey="currency" />
            <form.Select
              formKey="currency"
              options={SchoolDto.availableCurrencyOptions}
            />
            <form.ErrorLabel formKey="currency" />
          </form.InputContainer>

          <form.InputContainer>
            <form.Label formKey="city" />
            <form.Input formKey="city" />
            <form.ErrorLabel formKey="city" />
          </form.InputContainer>

          <div className="flex justify-end space-x-4">
            <Button variant="secondary" link={{ to: '/schools' }}>
              {t('common.actions.cancel')}
            </Button>
            <FormButton>{t('schools.create.form.submit')}</FormButton>
          </div>
        </form.Form>
      </div>
    </div>
  );
};
