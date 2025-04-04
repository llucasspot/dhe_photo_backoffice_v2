import { useTranslation } from 'react-i18next';

import { useService } from '#di/react';
import { I18nServicePort } from '#i18n/domain';

export const useI18n = () => {
  // const i18nService = useService(I18nServicePort);
  // const [currentLanguage, setCurrentLanguage] = useState(
  //     i18nService.getCurrentLanguage(),
  // );
  //
  // useEffect(() => {
  //     setCurrentLanguage(i18nService.getCurrentLanguage());
  // }, [i18nService]);

  // const t = useCallback(
  //   (key: string, options?: Record<string, unknown>) => {
  //     return i18nService.translate(key, options);
  //   },
  //   [i18nService],
  // );

  // const changeLanguage = useCallback(
  //   async (lang: string) => {
  //     await i18nService.changeLanguage(lang);
  //     setCurrentLanguage(i18nService.getCurrentLanguage());
  //   },
  //   [i18nService],
  // );

  useService(I18nServicePort);
  const {
    t,
    i18n: { changeLanguage, language: currentLanguage, languages },
  } = useTranslation();

  return {
    t: (key?: string) => {
      if (key) {
        return t(key);
      }
      return key;
    },
    changeLanguage,
    currentLanguage,
    languages,
  };
};
