import { useForm } from 'react-hook-form';

import { AddressDto } from '../domain';

import { Button, Input } from '#components';
import { useI18n } from '#i18n/react';

export const AddressForm = () => {
  const { t } = useI18n();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AddressDto>();

  const onSubmit = (data: AddressDto) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <Input
        label={t('settings.address.countryIsoCode')}
        error={errors.countryIsoCode?.message}
        {...register('countryIsoCode', {
          required: t('settings.address.validation.countryRequired'),
        })}
      />

      <Input
        label={t('settings.address.address1')}
        error={errors.address1?.message}
        {...register('address1', {
          required: t('settings.address.validation.addressRequired'),
        })}
      />

      <Input
        label={t('settings.address.postalCode')}
        error={errors.postalCode?.message}
        {...register('postalCode', {
          required: t('settings.address.validation.postalCodeRequired'),
        })}
      />

      <Input
        label={t('settings.address.city')}
        error={errors.city?.message}
        {...register('city', {
          required: t('settings.address.validation.cityRequired'),
        })}
      />

      <Button type="submit">{t('settings.common.save')}</Button>
    </form>
  );
};
