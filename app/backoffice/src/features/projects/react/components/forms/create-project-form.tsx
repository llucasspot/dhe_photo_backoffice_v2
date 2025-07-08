import { useInstance } from '@mygoodstack/di-react';

import { useAction, useGetter } from '#action/react';
import { form } from '#components';
import { CreateProjectBody } from '#features/projects/domain';
import { CreateProjectAction } from '#features/projects/use-cases';
import { SchoolsGetter } from '#features/schools/use-cases';
import { RoutingServicePort } from '#routing/domain';

export const CreateProjectForm = () => {
  const routingService = useInstance(RoutingServicePort);
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
    <form.Form
      formName="CreateProjectForm"
      dto={CreateProjectBody}
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
        <form.Label formKey="schoolId" />
        <form.Select formKey="schoolId" options={schoolOptions} />
        <form.ErrorLabel formKey="schoolId" />
      </form.InputContainer>

      <form.InputContainer>
        <form.Label formKey="shotDate" />
        <form.Input formKey="shotDate" type="date" />
        <form.ErrorLabel formKey="shotDate" />
      </form.InputContainer>

      <form.InputContainer>
        <form.Label formKey="shotDate" />
        <form.Input formKey="shotDate" type="date" />
        <form.ErrorLabel formKey="shotDate" />
      </form.InputContainer>

      <form.InputContainer>
        <form.Label formKey="orderEndDate" />
        <form.Input formKey="orderEndDate" type="date" />
        <form.ErrorLabel formKey="orderEndDate" />
      </form.InputContainer>

      <form.InputContainer>
        <form.Label formKey="messageForClients" />
        <form.Input formKey="messageForClients" type="text" />
        <form.ErrorLabel formKey="messageForClients" />
      </form.InputContainer>

      <form.Footer />
    </form.Form>
  );
};
