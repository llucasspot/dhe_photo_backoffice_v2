import { AuthI18nTranslationsKeys } from '#features/auth/i18n';
import { ProductsI18nTranslationsKeys } from '#features/products/i18n';
import { ProjectsI18nTranslationsKeys } from '#features/projects/i18n';
import { SchoolsI18nTranslationsKeys } from '#features/schools/i18n';
import { SettingsI18nTranslationsKeys } from '#features/settings/i18n';

export type Translations = {
  auth: AuthI18nTranslationsKeys;
  settings: SettingsI18nTranslationsKeys;
  projects: ProjectsI18nTranslationsKeys;
  products: ProductsI18nTranslationsKeys;
  schools: SchoolsI18nTranslationsKeys;
  navigation: {
    dashboard: string;
    schools: string;
    projects: string;
    products: string;
    signIn: string;
    signUp: string;
    signOut: string;
    settings: string;
  };
  common: {
    actions: {
      add: string;
      cancel: string;
      select: string;
      back: string;
    };
    status: {
      active: string;
      inactive: string;
      published: string;
      unpublished: string;
    };
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
