import { useForm } from 'react-hook-form';

import { PersonalInfoDto } from '../domain';

import { Button, Input } from '#components';
import { useI18n } from '#i18n/react';

export const PersonalInfoForm = () => {
  const { t } = useI18n();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PersonalInfoDto>();

  const onSubmit = (data: PersonalInfoDto) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <Input
        label={t('settings.personalInfo.email')}
        type="email"
        error={errors.email?.message}
        {...register('email', {
          required: t('settings.personalInfo.validation.emailRequired'),
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message: t('settings.personalInfo.validation.emailInvalid'),
          },
        })}
      />

      <Input
        label={t('settings.personalInfo.firstName')}
        error={errors.firstName?.message}
        {...register('firstName', {
          required: t('settings.personalInfo.validation.firstNameRequired'),
        })}
      />

      <Input
        label={t('settings.personalInfo.lastName')}
        error={errors.lastName?.message}
        {...register('lastName', {
          required: t('settings.personalInfo.validation.lastNameRequired'),
        })}
      />

      <Input
        label={t('settings.personalInfo.displayName')}
        error={errors.displayName?.message}
        {...register('displayName', {
          required: t('settings.personalInfo.validation.displayNameRequired'),
        })}
      />

      <Input
        label={t('settings.personalInfo.phoneNumber')}
        error={errors.phoneNumber?.message}
        {...register('phoneNumber', {
          required: t('settings.personalInfo.validation.phoneNumberRequired'),
        })}
      />

      <Button type="submit">{t('settings.common.save')}</Button>
    </form>
  );
};
