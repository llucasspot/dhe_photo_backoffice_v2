import { AuthI18nTranslationsKeys } from '#features/auth/i18n';
import { SettingsI18nTranslationsKeys } from '#features/settings/i18n';

export type Translations = {
  auth: AuthI18nTranslationsKeys;
  settings: SettingsI18nTranslationsKeys;
  navigation: {
    dashboard: string;
    schools: string;
    projects: string;
    signIn: string;
    signUp: string;
    signOut: string;
    settings: string;
  };
  common: {
    actions: {
      add: string;
    };
    status: {
      active: string;
      inactive: string;
      published: string;
      unpublished: string;
    };
  };
  schools: {
    title: string;
    addSchool: string;
    list: {
      students: string;
      type: {
        public: string;
        private: string;
      };
    };
  };
  projects: {
    title: string;
    addProject: string;
  };
  dashboard: {
    title: string;
    welcome: string;
  };
  home: {
    title: string;
    subtitle: string;
  };
};
