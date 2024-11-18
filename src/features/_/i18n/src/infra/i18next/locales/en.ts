import { Translations } from '#i18n/domain';

export const en: Translations = {
  auth: {
    login: {
      title: 'Welcome back',
      subtitle: 'Please sign in to your account',
      email: 'Email',
      password: 'Password',
      submit: 'Sign In',
      validation: {
        emailRequired: 'Email is required',
        emailInvalid: 'Invalid email address',
        passwordRequired: 'Password is required',
        passwordMinLength: 'Password must be at least 8 characters',
      },
    },
    register: {
      title: 'Create an account',
      subtitle: 'Sign up to get started',
      email: 'Email',
      password: 'Password',
      confirmPassword: 'Confirm Password',
      submit: 'Sign Up',
      validation: {
        emailRequired: 'Email is required',
        emailInvalid: 'Invalid email address',
        passwordRequired: 'Password is required',
        passwordMinLength: 'Password must be at least 8 characters',
        confirmPasswordRequired: 'Please confirm your password',
        passwordsDoNotMatch: 'Passwords do not match',
      },
    },
  },
  navigation: {
    dashboard: 'Dashboard',
    schools: 'Schools',
    projects: 'Projects',
    signIn: 'Sign in',
    signUp: 'Sign up',
    signOut: 'Sign out',
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
    subtitle: 'Get started by signing up for an account or sign in if you already have one.',
  },
};