import { useForm } from 'react-hook-form';

import { Button, Input } from '#components';
import { useService } from '#di/react';
import { useI18n } from '#i18n/react';
import { useAuth } from '#lib/auth';
import { RoutingServicePort } from '#routing/domain';

interface LoginFormData {
  email: string;
  password: string;
}

export const LoginForm = () => {
  const routingService = useService(RoutingServicePort);
  const { login } = useAuth();
  const { t } = useI18n();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>();

  const onSubmit = async (data: LoginFormData) => {
    console.log(data);
    login('mock_token');
    await routingService.redirect('/home');
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <Input
        label={t('auth.login.email')}
        type="email"
        error={errors.email?.message}
        {...register('email', {
          required: t('auth.login.validation.emailRequired'),
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message: t('auth.login.validation.emailInvalid'),
          },
        })}
      />

      <Input
        label={t('auth.login.password')}
        type="password"
        error={errors.password?.message}
        {...register('password', {
          required: t('auth.login.validation.passwordRequired'),
          minLength: {
            value: 8,
            message: t('auth.login.validation.passwordMinLength'),
          },
        })}
      />

      <Button type="submit" className="w-full">
        {t('auth.login.submit')}
      </Button>
    </form>
  );
};