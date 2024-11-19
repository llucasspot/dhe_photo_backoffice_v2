import { useForm } from 'react-hook-form';
import { classValidatorResolver } from '@hookform/resolvers/class-validator';

import { RegisterDto } from '../domain/auth.dto';

import { Button, Input } from '#components';
import { useI18n } from '#i18n/react';

export const RegisterForm = () => {
  const { t } = useI18n();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterDto>({
    resolver: classValidatorResolver(RegisterDto),
  });

  const onSubmit = (data: RegisterDto) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <Input
        label={'auth.register.email'}
        type="email"
        error={errors.email?.message}
        {...register('email')}
      />

      <Input
        label={'auth.register.password'}
        type="password"
        error={errors.password?.message}
        {...register('password')}
      />

      <Input
        label={'auth.register.confirmPassword'}
        type="password"
        error={errors.confirmPassword?.message}
        {...register('confirmPassword')}
      />

      <Button type="submit" className="w-full">
        {t('auth.register.submit')}
      </Button>
    </form>
  );
};
