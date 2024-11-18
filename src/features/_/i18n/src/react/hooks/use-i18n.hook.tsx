import { useTranslation } from 'react-i18next';

import { useService } from '#di/react';
import { I18nServicePort } from '#i18n/domain';

export const useI18n = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const i18nService = useService(I18nServicePort);
  const { t, i18n } = useTranslation();

  return {
    t,
    changeLanguage: i18n.changeLanguage.bind(i18n),
    currentLanguage: i18n.language ?? 'fr',
  };
};
