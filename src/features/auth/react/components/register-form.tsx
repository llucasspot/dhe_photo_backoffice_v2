import { RegisterDto } from '../../domain/auth.dto';

import { Button, Form, Input } from '#components';
import { useI18n } from '#i18n/react';

export const RegisterForm = () => {
  const { t } = useI18n();

  const onSubmit = (data: RegisterDto) => {
    console.log(data);
  };

  return (
    <Form dto={RegisterDto} onSubmit={onSubmit} className="space-y-6">
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
      <Button type="submit" className="w-full">
        {t('auth.register.submit')}
      </Button>
    </Form>
  );
};
