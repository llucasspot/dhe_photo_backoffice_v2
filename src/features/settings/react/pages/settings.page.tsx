import {
  AddressForm,
  BankInfoForm,
  CompanyInfoForm,
  PersonalInfoForm,
} from '../components';

import { useI18n } from '#i18n/react';

export const SettingsPage = () => {
  const { t } = useI18n();

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-8">
        {t('settings.title')}
      </h1>

      <div className="space-y-8">
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-6">
            {t('settings.personalInfo.title')}
          </h2>
          <PersonalInfoForm />
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-6">
            {t('settings.companyInfo.title')}
          </h2>
          <CompanyInfoForm />
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-6">
            {t('settings.address.title')}
          </h2>
          <AddressForm />
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-6">
            {t('settings.bankInfo.title')}
          </h2>
          <BankInfoForm />
        </div>
      </div>
    </div>
  );
};
