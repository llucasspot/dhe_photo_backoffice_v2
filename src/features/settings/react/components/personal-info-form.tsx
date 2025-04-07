import { form } from '../../../../components/form/ui/form.tsx';

import { classNames } from '#core/react';
import { PersonalInfoDto } from '#features/settings/domain';

export const PersonalInfoForm = () => {
  const onSubmit = async (data: PersonalInfoDto) => {
    console.log('form data : ', data);
  };

  return (
    <form.Form
      i18nPrefix="settings.personalInfo"
      dto={PersonalInfoDto}
      onSubmit={onSubmit}
      className={classNames('bg-white shadow rounded-lg p-6', 'mx-auto')}
    >
      <form.Header />

      <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
        <div className="sm:col-span-4">
          <form.Label<PersonalInfoDto> formKey="firstName" />
          <form.Input<PersonalInfoDto> formKey="firstName" type="text" />
          <form.ErrorLabel<PersonalInfoDto> formKey="firstName" />
        </div>

        <div className="sm:col-span-4">
          <form.Label<PersonalInfoDto> formKey="lastName" />
          <form.Input<PersonalInfoDto> formKey="lastName" type="text" />
          <form.ErrorLabel<PersonalInfoDto> formKey="lastName" />
        </div>

        <div className="sm:col-span-4">
          <form.Label<PersonalInfoDto> formKey="email" />
          <form.Input<PersonalInfoDto> formKey="email" type="email" />
          <form.ErrorLabel<PersonalInfoDto> formKey="email" />
        </div>

        <div className="sm:col-span-4">
          <form.Label<PersonalInfoDto> formKey="phoneNumber" />
          <form.Input<PersonalInfoDto>
            formKey="phoneNumber"
            options={['US', 'CA', 'EU']}
            type="phone"
            placeholder="+1 (555) 987-6543"
          />
          <form.ErrorLabel<PersonalInfoDto> formKey="phoneNumber" />
        </div>
      </div>

      <form.Footer />
    </form.Form>
  );
};
