import { useForm } from 'react-hook-form';
import { classValidatorResolver } from '@hookform/resolvers/class-validator';

import { CompanyInfoDto } from '../domain';

import { Button, Input } from '#components';
import { useI18n } from '#i18n/react';

export const CompanyInfoForm = () => {
  const { t } = useI18n();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CompanyInfoDto>({
    resolver: classValidatorResolver(CompanyInfoDto),
  });

  const onSubmit = (data: CompanyInfoDto) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <Input
        label={'settings.companyInfo.companyName'}
        error={errors.companyName?.message}
        {...register('companyName')}
      />

      <Input
        label={'settings.companyInfo.vatNumber'}
        error={errors.vatNumber?.message}
        {...register('vatNumber')}
      />

      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          {...register('subjectToVat')}
        />
        <label className="text-sm text-gray-700">
          {t('settings.companyInfo.subjectToVat')}
        </label>
      </div>

      <Button type="submit">{t('settings.common.save')}</Button>
    </form>
  );
};
