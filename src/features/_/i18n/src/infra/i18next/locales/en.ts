import { enAuth } from '#features/auth/i18n';
import { enKlasses } from '#features/klasses/i18n';
import { enProducts } from '#features/products/i18n';
import { enProjects } from '#features/projects/i18n';
import { enSchools } from '#features/schools/i18n';
import { enSettings } from '#features/settings/i18n';
import { enStudents } from '#features/students/i18n';
import { Translations } from '#i18n/domain';

export const en: Translations = {
  auth: enAuth,
  settings: enSettings,
  projects: enProjects,
  products: enProducts,
  schools: enSchools,
  students: enStudents,
  klasses: enKlasses,
  navigation: {
    dashboard: 'Dashboard',
    schools: 'Schools',
    projects: 'Projects',
    products: 'Products',
    signIn: 'Sign in',
    signUp: 'Sign up',
    signOut: 'Sign out',
    settings: 'Settings',
  },
  common: {
    actions: {
      add: 'Add',
      cancel: 'Cancel',
      select: 'Select an option',
      back: 'Back',
    },
    status: {
      active: 'Active',
      inactive: 'Inactive',
      published: 'Published',
      unpublished: 'Unpublished',
    },
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
