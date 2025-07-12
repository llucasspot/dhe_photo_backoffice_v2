import { availableCurrenciesOptions, CreateSchoolBody } from '@domain/modules';
import { useInstance } from '@mygoodstack/di-react';

import { useAction } from '#action/react';
import { form } from '#components';
import { CreateSchoolAction } from '#features/schools/use-cases';
import { RoutingServicePort } from '#routing/domain';

export const CreateSchoolForm = () => {
  const routingService = useInstance(RoutingServicePort);
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
    <form.Form
      formName="CreateSchoolForm"
      dto={CreateSchoolBody}
      onSubmit={onSubmit}
      className="space-y-6"
    >
      <form.Header />

      <form.InputContainer>
        <form.Label formKey="name" />
        <form.Input formKey="name" />
        <form.ErrorLabel formKey="name" />
      </form.InputContainer>

      <form.InputContainer>
        <form.Label formKey="currency" />
        <form.Select formKey="currency" options={availableCurrenciesOptions} />
        <form.ErrorLabel formKey="currency" />
      </form.InputContainer>

      <form.InputContainer>
        <form.Label formKey="city" />
        <form.Input formKey="city" />
        <form.ErrorLabel formKey="city" />
      </form.InputContainer>

      <form.Footer />
    </form.Form>
  );
};
