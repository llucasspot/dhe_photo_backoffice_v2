import { CompanyInfoDto } from '../domain';

import { Button, CheckboxInput, Form, Input } from '#components';
import { useI18n } from '#i18n/react';

export const CompanyInfoForm = () => {
  const { t } = useI18n();

  const onSubmit = (data: CompanyInfoDto) => {
    console.log(data);
  };

  return (
    <Form dto={CompanyInfoDto} onSubmit={onSubmit} className="space-y-6">
      <Input formKey="companyName" label={'settings.companyInfo.companyName'} />
      <Input formKey="vatNumber" label={'settings.companyInfo.vatNumber'} />
      <CheckboxInput
        formKey="subjectToVat"
        label={'settings.companyInfo.subjectToVat'}
      />
      <Button type="submit">{t('settings.common.save')}</Button>
    </Form>
  );
};
