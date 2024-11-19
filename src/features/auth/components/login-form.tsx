import { LoginDto } from '../domain/auth.dto';

import { Button, Form, Input } from '#components';
import { useService } from '#di/react';
import { useI18n } from '#i18n/react';
import { useAuth } from '#lib/auth';
import { RoutingServicePort } from '#routing/domain';

export const LoginForm = () => {
  const routingService = useService(RoutingServicePort);
  const { login } = useAuth();
  const { t } = useI18n();

  const onSubmit = async (data: LoginDto) => {
    console.log(data);
    login('mock_token');
    await routingService.redirect('/home');
  };

  return (
    <Form dto={LoginDto} onSubmit={onSubmit} className="space-y-6">
      <Input formKey="email" label={'auth.login.email'} type="email" />
      <Input formKey="password" label={'auth.login.password'} type="password" />
      <Button type="submit" className="w-full">
        {t('auth.login.submit')}
      </Button>
    </Form>
  );
};
