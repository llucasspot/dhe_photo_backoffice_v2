import { useForm } from 'react-hook-form';
import { classValidatorResolver } from '@hookform/resolvers/class-validator';

import { LoginDto } from '../domain/auth.dto';

import { Button, Input } from '#components';
import { useService } from '#di/react';
import { useI18n } from '#i18n/react';
import { useAuth } from '#lib/auth';
import { RoutingServicePort } from '#routing/domain';

export const LoginForm = () => {
  const routingService = useService(RoutingServicePort);
  const { login } = useAuth();
  const { t } = useI18n();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginDto>({
    resolver: classValidatorResolver(LoginDto),
  });

  const onSubmit = async (data: LoginDto) => {
    console.log(data);
    login('mock_token');
    await routingService.redirect('/home');
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <Input
        label={'auth.login.email'}
        type="email"
        error={errors.email?.message}
        {...register('email')}
      />

      <Input
        label={'auth.login.password'}
        type="password"
        error={errors.password?.message}
        {...register('password')}
      />

      <Button type="submit" className="w-full">
        {t('auth.login.submit')}
      </Button>
    </form>
  );
};
