import { form } from '#components';
import { PersonalInfoDto } from '#features/settings/domain';

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
          <form.Label<PersonalInfoDto> formKey="firstName" />
          <form.Input<PersonalInfoDto> formKey="firstName" type="text" />
          <form.ErrorLabel<PersonalInfoDto> formKey="firstName" />
        </form.InputContainer>

        <form.InputContainer className="sm:col-span-4">
          <form.Label<PersonalInfoDto> formKey="lastName" />
          <form.Input<PersonalInfoDto> formKey="lastName" type="text" />
          <form.ErrorLabel<PersonalInfoDto> formKey="lastName" />
        </form.InputContainer>

        <form.InputContainer className="sm:col-span-4">
          <form.Label<PersonalInfoDto> formKey="email" />
          <form.Input<PersonalInfoDto> formKey="email" type="email" />
          <form.ErrorLabel<PersonalInfoDto> formKey="email" />
        </form.InputContainer>

        <form.InputContainer className="sm:col-span-4">
          <form.Label<PersonalInfoDto> formKey="phoneNumber" />
          <form.Input<PersonalInfoDto>
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
