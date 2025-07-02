import { RegisterForm } from '../components';

import { useI18n } from '#i18n/react';

export const RegisterPage = () => {
  const { t } = useI18n();

  return (
    <div className="flex items-center justify-center p-8">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            {t('form.RegisterForm.title')}
          </h1>
          <p className="text-gray-500 mt-2">
            {t('form.RegisterForm.subtitle')}
          </p>
        </div>
        <RegisterForm />
      </div>
    </div>
  );
};
