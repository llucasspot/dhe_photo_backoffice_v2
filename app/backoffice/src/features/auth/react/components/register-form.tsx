import { form } from '#components';
import { RegisterBody } from '#features/auth/domain';

export const RegisterForm = () => {
  const onSubmit = (data: RegisterBody) => {
    console.log('form data : ', data);
  };

  return (
    <form.Form
      formName="RegisterForm"
      dto={RegisterBody}
      onSubmit={onSubmit}
      className="space-y-6"
    >
      <form.InputContainer>
        <form.Label formKey="email" />
        <form.Input formKey="email" type="email" />
        <form.ErrorLabel formKey="email" />
      </form.InputContainer>

      <form.InputContainer>
        <form.Label formKey="password" />
        <form.Input formKey="password" type="password" />
        <form.ErrorLabel formKey="password" />
      </form.InputContainer>

      <form.InputContainer>
        <form.Label formKey="confirmPassword" />
        <form.Input formKey="confirmPassword" type="password" />
        <form.ErrorLabel formKey="password" />
      </form.InputContainer>
      <form.SubmitButton className="w-full" />
    </form.Form>
  );
};
