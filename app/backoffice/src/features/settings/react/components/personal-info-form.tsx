import { PersonalInfoDto } from '@domain/modules';

import { form } from '#components';

export const PersonalInfoForm = () => {
  const onSubmit = async (data: PersonalInfoDto) => {
    console.log('form data : ', data);
  };

  return (
    <form.Form
      formName="PersonalInfoForm"
      dto={PersonalInfoDto}
      onSubmit={onSubmit}
      className="space-y-6"
    >
      <form.Header />

      <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
        <form.InputContainer className="sm:col-span-4">
          <form.Label formKey="firstName" />
          <form.Input formKey="firstName" type="text" />
          <form.ErrorLabel formKey="firstName" />
        </form.InputContainer>

        <form.InputContainer className="sm:col-span-4">
          <form.Label formKey="lastName" />
          <form.Input formKey="lastName" type="text" />
          <form.ErrorLabel formKey="lastName" />
        </form.InputContainer>

        <form.InputContainer className="sm:col-span-4">
          <form.Label formKey="email" />
          <form.Input formKey="email" type="email" />
          <form.ErrorLabel formKey="email" />
        </form.InputContainer>

        <form.InputContainer className="sm:col-span-4">
          <form.Label formKey="phoneNumber" />
          <form.Input
            formKey="phoneNumber"
            options={['US', 'CA', 'EU']}
            type="phone"
            placeholder="+1 (555) 987-6543"
          />
          <form.ErrorLabel<PersonalInfoDto> formKey="phoneNumber" />
        </form.InputContainer>
      </div>

      <form.Footer />
    </form.Form>
  );
};
