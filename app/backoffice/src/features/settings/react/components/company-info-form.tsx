import { CheckboxInput, form } from '#components';
import { CompanyInfoDto } from '#features/settings/domain';

export const CompanyInfoForm = () => {
  const onSubmit = (data: CompanyInfoDto) => {
    console.log('form data : ', data);
  };

  return (
    <form.Form
      formName="CompanyInfoForm"
      dto={CompanyInfoDto}
      onSubmit={onSubmit}
      className="space-y-6"
    >
      <form.Title />
      <form.InputContainer>
        <form.Label formKey="companyName" />
        <form.Input formKey="companyName" />
        <form.ErrorLabel formKey="email" />
      </form.InputContainer>
      <form.InputContainer>
        <form.Label formKey="vatNumber" />
        <form.Input formKey="vatNumber" type="number" />
        <form.ErrorLabel formKey="vatNumber" />
      </form.InputContainer>
      <CheckboxInput
        formKey="subjectToVat"
        label={'settings.companyInfo.form.input.subjectToVat.label'}
      />
      <form.Footer />
    </form.Form>
  );
};
