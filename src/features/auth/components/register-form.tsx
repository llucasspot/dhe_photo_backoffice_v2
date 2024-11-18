import { useForm } from 'react-hook-form';

import { Button, Input } from '#components';
import { useI18n } from '#i18n/react';

interface RegisterFormData {
  email: string;
  password: string;
  confirmPassword: string;
}

export const RegisterForm = () => {
  const { t } = useI18n();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegisterFormData>();

  const onSubmit = (data: RegisterFormData) => {
    console.log(data);
  };

  const password = watch('password');

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <Input
        label={t('auth.register.email')}
        type="email"
        error={errors.email?.message}
        {...register('email', {
          required: t('auth.register.validation.emailRequired'),
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message: t('auth.register.validation.emailInvalid'),
          },
        })}
      />

      <Input
        label={t('auth.register.password')}
        type="password"
        error={errors.password?.message}
        {...register('password', {
          required: t('auth.register.validation.passwordRequired'),
          minLength: {
            value: 8,
            message: t('auth.register.validation.passwordMinLength'),
          },
        })}
      />

      <Input
        label={t('auth.register.confirmPassword')}
        type="password"
        error={errors.confirmPassword?.message}
        {...register('confirmPassword', {
          required: t('auth.register.validation.confirmPasswordRequired'),
          validate: (value) =>
            value === password ||
            t('auth.register.validation.passwordsDoNotMatch'),
        })}
      />

      <Button type="submit" className="w-full">
        {t('auth.register.submit')}
      </Button>
    </form>
  );
};
