import { form } from '../../../../components/form/ui/form';

import { classNames } from '#core/react';
import { AddressDto } from '#features/settings/domain';

export const AddressForm = () => {
  const onSubmit = async (data: AddressDto) => {
    console.log('form data : ', data);
  };

  return (
    <form.Form
      i18nPrefix="settings.address"
      dto={AddressDto}
      onSubmit={onSubmit}
      className={classNames('bg-white shadow rounded-lg p-6', 'mx-auto')}
    >
      <form.Header />

      <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
        <div className="col-span-full">
          <form.Label<AddressDto> formKey="street" />
          <form.Input<AddressDto> formKey="street" type="text" />
          <form.ErrorLabel<AddressDto> formKey="street" />
        </div>

        <div className="sm:col-span-2 sm:col-start-1">
          <form.Label<AddressDto> formKey="city" />
          <form.Input<AddressDto> formKey="city" type="text" />
          <form.ErrorLabel<AddressDto> formKey="city" />
        </div>

        <div className="sm:col-span-2">
          <form.Label<AddressDto> formKey="state" />
          <form.Input<AddressDto> formKey="state" type="text" />
          <form.ErrorLabel<AddressDto> formKey="state" />
        </div>

        <div className="sm:col-span-2">
          <form.Label<AddressDto> formKey="postalCode" />
          <form.Input<AddressDto> formKey="postalCode" type="text" />
          <form.ErrorLabel<AddressDto> formKey="postalCode" />
        </div>

        <div className="sm:col-span-2"></div>
      </div>

      <form.Footer />
    </form.Form>
  );
};
