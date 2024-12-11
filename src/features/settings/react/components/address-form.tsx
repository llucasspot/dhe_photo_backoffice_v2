import { Form, FormButton, Input } from '#components';
import { AddressDto } from '#features/settings/domain';
import { useI18n } from '#i18n/react';

export const AddressForm = () => {
  const { t } = useI18n();

  const onSubmit = async (data: AddressDto) => {
    console.log('form data : ', data);
  };

  return (
    <Form dto={AddressDto} onSubmit={onSubmit} className="space-y-6">
      <Input
        formKey="countryIsoCode"
        label={'settings.address.countryIsoCode'}
      />
      <Input formKey="address1" label={'settings.address.address1'} />
      <Input formKey="postalCode" label={'settings.address.postalCode'} />
      <Input formKey="city" label={'settings.address.city'} />
      <FormButton>{t('settings.common.save')}</FormButton>
    </Form>
  );
};
