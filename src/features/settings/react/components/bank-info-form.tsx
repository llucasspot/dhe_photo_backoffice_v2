import { Button, Form, Input } from '#components';
import { BankInfoDto } from '#features/settings/domain';
import { useI18n } from '#i18n/react';

export const BankInfoForm = () => {
  const { t } = useI18n();

  const onSubmit = (data: BankInfoDto) => {
    console.log('form data : ', data);
  };

  return (
    <Form dto={BankInfoDto} onSubmit={onSubmit} className="space-y-6">
      <Input formKey="iban" label={'settings.bankInfo.iban'} />
      <Input formKey="bicNumber" label={'settings.bankInfo.bicNumber'} />
      <Button type="submit">{t('settings.common.save')}</Button>
    </Form>
  );
};
