import { Button, Form, Input } from '#components';
import { PersonalInfoDto } from '#features/settings/domain';
import { useI18n } from '#i18n/react';

export const PersonalInfoForm = () => {
  const { t } = useI18n();

  const onSubmit = async (data: PersonalInfoDto) => {
    console.log('form data : ', data);
  };

  return (
    <Form dto={PersonalInfoDto} onSubmit={onSubmit} className="space-y-6">
      <Input formKey="email" label="settings.personalInfo.email" type="email" />
      <Input formKey="firstName" label="settings.personalInfo.firstName" />
      <Input formKey="lastName" label="settings.personalInfo.lastName" />
      <Input formKey="displayName" label="settings.personalInfo.displayName" />
      <Input formKey="phoneNumber" label="settings.personalInfo.phoneNumber" />
      <Button type="submit">{t('settings.common.save')}</Button>
    </Form>
  );
};
