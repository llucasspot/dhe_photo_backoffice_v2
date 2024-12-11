import { Form, FormButton, Input } from '#components';
import { RegisterBody } from '#features/auth/domain';
import { useI18n } from '#i18n/react';

export const RegisterForm = () => {
  const { t } = useI18n();

  const onSubmit = (data: RegisterBody) => {
    console.log('form data : ', data);
  };

  return (
    <Form dto={RegisterBody} onSubmit={onSubmit} className="space-y-6">
      <Input formKey="email" label={'auth.register.email'} type="email" />
      <Input
        formKey="password"
        label={'auth.register.password'}
        type="password"
      />
      <Input
        formKey="confirmPassword"
        label={'auth.register.confirmPassword'}
        type="password"
      />
      <FormButton className="w-full">{t('auth.register.submit')}</FormButton>
    </Form>
  );
};
