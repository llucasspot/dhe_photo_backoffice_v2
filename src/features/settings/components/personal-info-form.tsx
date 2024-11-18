import { useForm } from 'react-hook-form';
import { classValidatorResolver } from '@hookform/resolvers/class-validator';

import { PersonalInfoDto } from '../domain';

import { Button, Input } from '#components';
import { useI18n } from '#i18n/react';

export const PersonalInfoForm = () => {
  const { t } = useI18n();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PersonalInfoDto>({
    resolver: classValidatorResolver(PersonalInfoDto),
  });

  const onSubmit = async (data: PersonalInfoDto) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <Input
        label={'settings.personalInfo.email'}
        type="email"
        error={errors.email?.message}
        {...register('email')}
      />

      <Input
        label={'settings.personalInfo.firstName'}
        error={errors.firstName?.message}
        {...register('firstName')}
      />

      <Input
        label={'settings.personalInfo.lastName'}
        error={errors.lastName?.message}
        {...register('lastName')}
      />

      <Input
        label={'settings.personalInfo.displayName'}
        error={errors.displayName?.message}
        {...register('displayName')}
      />

      <Input
        label={'settings.personalInfo.phoneNumber'}
        error={errors.phoneNumber?.message}
        {...register('phoneNumber')}
      />

      <Button type="submit">{t('settings.common.save')}</Button>
    </form>
  );
};
