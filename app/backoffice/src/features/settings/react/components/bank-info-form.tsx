import { BankAccountDto } from '@domain/modules';

import { form } from '#components';

export const BankInfoForm = () => {
  const onSubmit = (data: BankAccountDto) => {
    console.log('form data : ', data);
  };

  return (
    <form.Form
      formName="BankInfoForm"
      dto={BankAccountDto}
      onSubmit={onSubmit}
      className="space-y-6"
    >
      <form.Header />

      <form.InputContainer>
        <form.Label formKey="iban" />
        <form.Input formKey="iban" />
        <form.ErrorLabel formKey="iban" />
      </form.InputContainer>

      <form.InputContainer>
        <form.Label formKey="bicNumber" />
        <form.Input formKey="bicNumber" />
        <form.ErrorLabel formKey="bicNumber" />
      </form.InputContainer>

      <form.Footer />
    </form.Form>
  );
};
