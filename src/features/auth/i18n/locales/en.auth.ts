import { AuthI18nTranslationsKeys } from '../auth.i18n-translations-keys.ts';

export const enAuth: AuthI18nTranslationsKeys = {
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
} as const;
