import { useForm } from 'react-hook-form';
import { classValidatorResolver } from '@hookform/resolvers/class-validator';

import { BankInfoDto } from '../domain';

import { Button, Input } from '#components';
import { useI18n } from '#i18n/react';

export const BankInfoForm = () => {
  const { t } = useI18n();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BankInfoDto>({
    resolver: classValidatorResolver(BankInfoDto),
  });

  const onSubmit = (data: BankInfoDto) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <Input
        label={'settings.bankInfo.iban'}
        error={errors.iban?.message}
        {...register('iban')}
      />

      <Input
        label={'settings.bankInfo.bicNumber'}
        error={errors.bicNumber?.message}
        {...register('bicNumber')}
      />

      <Button type="submit">{t('settings.common.save')}</Button>
    </form>
  );
};
