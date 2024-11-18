import { useForm } from 'react-hook-form';
import { classValidatorResolver } from '@hookform/resolvers/class-validator';

import { AddressDto } from '../domain';

import { Button, Input } from '#components';
import { useI18n } from '#i18n/react';

export const AddressForm = () => {
  const { t } = useI18n();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AddressDto>({
    resolver: classValidatorResolver(AddressDto),
  });

  const onSubmit = async (data: AddressDto) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <Input
        label={'settings.address.countryIsoCode'}
        error={errors.countryIsoCode?.message}
        {...register('countryIsoCode')}
      />

      <Input
        label={'settings.address.address1'}
        error={errors.address1?.message}
        {...register('address1')}
      />

      <Input
        label={'settings.address.postalCode'}
        error={errors.postalCode?.message}
        {...register('postalCode')}
      />

      <Input
        label={'settings.address.city'}
        error={errors.city?.message}
        {...register('city')}
      />

      <Button type="submit">{t('settings.common.save')}</Button>
    </form>
  );
};
