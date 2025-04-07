import { CheckboxInput, Form, FormButton, Input } from '#components';
import { CompanyInfoDto } from '#features/settings/domain';
import { useI18n } from '#i18n/react';

export const CompanyInfoForm = () => {
  const { t } = useI18n();

  const onSubmit = (data: CompanyInfoDto) => {
    console.log('form data : ', data);
  };

  return (
    <Form
      i18nPrefix="settings.companyInfo"
      dto={CompanyInfoDto}
      onSubmit={onSubmit}
      className="space-y-6"
    >
      <Input formKey="companyName" label={'settings.companyInfo.companyName'} />
      <Input formKey="vatNumber" label={'settings.companyInfo.vatNumber'} />
      <CheckboxInput
        formKey="subjectToVat"
        label={'settings.companyInfo.subjectToVat'}
      />
      <FormButton type="submit">{t('settings.common.save')}</FormButton>
    </Form>
  );
};
