import { AuthService } from '../../domain/services/auth.service';

import { Form, FormButton, Input } from '#components';
import { useService } from '#di/react';
import { LoginBody } from '#features/auth/domain';
import { useI18n } from '#i18n/react';
import { RoutingServicePort } from '#routing/domain';

export const LoginForm = () => {
  const authService = useService(AuthService);
  const routingService = useService(RoutingServicePort);
  const { t } = useI18n();

  const onSubmit = async (data: LoginBody) => {
    await authService.login(data);
    await routingService.redirect('/home');
  };

  return (
    <Form dto={LoginBody} onSubmit={onSubmit} className="space-y-6">
      <Input formKey="email" label={'auth.login.email'} type="email" />
      <Input formKey="password" label={'auth.login.password'} type="password" />
      <FormButton className="w-full">{t('auth.login.submit')}</FormButton>
    </Form>
  );
};
