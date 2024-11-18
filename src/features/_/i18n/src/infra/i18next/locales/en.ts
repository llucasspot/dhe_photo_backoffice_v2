import { enAuth } from '#features/auth/i18n';
import { enSettings } from '#features/settings/i18n';
import { Translations } from '#i18n/domain';

export const en: Translations = {
  auth: enAuth,
  settings: enSettings,
  navigation: {
    dashboard: 'Dashboard',
    schools: 'Schools',
    projects: 'Projects',
    signIn: 'Sign in',
    signUp: 'Sign up',
    signOut: 'Sign out',
    settings: 'Settings',
  },
  common: {
    actions: {
      add: 'Add',
    },
    status: {
      active: 'Active',
      inactive: 'Inactive',
      published: 'Published',
      unpublished: 'Unpublished',
    },
  },
  schools: {
    title: 'Schools',
    addSchool: 'Add School',
    list: {
      students: 'students',
      type: {
        public: 'public',
        private: 'private',
      },
    },
  },
  projects: {
    title: 'Projects',
    addProject: 'Add Project',
  },
  dashboard: {
    title: 'Dashboard',
    welcome: 'Welcome to your dashboard!',
  },
  home: {
    title: 'Welcome to Our App',
    subtitle:
      'Get started by signing up for an account or sign in if you already have one.',
  },
} as const;
