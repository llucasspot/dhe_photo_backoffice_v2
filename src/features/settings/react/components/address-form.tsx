import { form } from '#components';
import { AddressDto } from '#features/settings/domain';

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
          <form.Label<AddressDto> formKey="street" />
          <form.Input<AddressDto> formKey="street" type="text" />
          <form.ErrorLabel<AddressDto> formKey="street" />
        </form.InputContainer>

        <form.InputContainer className="sm:col-span-2 sm:col-start-1">
          <form.Label<AddressDto> formKey="city" />
          <form.Input<AddressDto> formKey="city" type="text" />
          <form.ErrorLabel<AddressDto> formKey="city" />
        </form.InputContainer>

        <form.InputContainer className="sm:col-span-2">
          <form.Label<AddressDto> formKey="state" />
          <form.Input<AddressDto> formKey="state" type="text" />
          <form.ErrorLabel<AddressDto> formKey="state" />
        </form.InputContainer>

        <form.InputContainer className="sm:col-span-2">
          <form.Label<AddressDto> formKey="postalCode" />
          <form.Input<AddressDto> formKey="postalCode" type="text" />
          <form.ErrorLabel<AddressDto> formKey="postalCode" />
        </form.InputContainer>
      </div>

      <form.Footer />
    </form.Form>
  );
};
