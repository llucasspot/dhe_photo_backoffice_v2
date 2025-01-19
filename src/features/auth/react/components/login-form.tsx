import { useAction } from '#action/react';
import { Form, FormButton, Input } from '#components';
import { useService } from '#di/react';
import { LoginBody } from '#features/auth/domain';
import { SignInAction } from '#features/auth/use-cases';
import { useI18n } from '#i18n/react';
import { RoutingServicePort } from '#routing/domain';

export const LoginForm = () => {
  const routingService = useService(RoutingServicePort);
  const { t } = useI18n();
  const signInAction = useAction(SignInAction);

  const onSubmit = async (data: LoginBody) => {
    await signInAction.mutateAsync(data);
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
