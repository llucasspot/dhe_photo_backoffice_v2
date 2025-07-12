import { AddressDto } from '@domain/modules';

import { form } from '#components';

export const AddressForm = () => {
  const onSubmit = async (data: AddressDto) => {
    console.log('form data : ', data);
  };

  return (
    <form.Form
      formName="AddressForm"
      dto={AddressDto}
      onSubmit={onSubmit}
      className="space-y-6"
    >
      <form.Header />

      <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
        <form.InputContainer className="col-span-full">
          <form.Label formKey="street" />
          <form.Input formKey="street" type="text" />
          <form.ErrorLabel formKey="street" />
        </form.InputContainer>

        <form.InputContainer className="sm:col-span-2 sm:col-start-1">
          <form.Label formKey="city" />
          <form.Input formKey="city" type="text" />
          <form.ErrorLabel formKey="city" />
        </form.InputContainer>

        <form.InputContainer className="sm:col-span-2">
          <form.Label formKey="state" />
          <form.Input formKey="state" type="text" />
          <form.ErrorLabel formKey="state" />
        </form.InputContainer>

        <form.InputContainer className="sm:col-span-2">
          <form.Label formKey="postalCode" />
          <form.Input formKey="postalCode" type="text" />
          <form.ErrorLabel formKey="postalCode" />
        </form.InputContainer>
      </div>

      <form.Footer />
    </form.Form>
  );
};
