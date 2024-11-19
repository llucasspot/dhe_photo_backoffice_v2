import { AuthI18nTranslationsKeys } from '../auth.i18n-translations-keys.ts';

export const enAuth: AuthI18nTranslationsKeys = {
  login: {
    title: 'Welcome back',
    subtitle: 'Please sign in to your account',
    email: 'Email',
    password: 'Password',
    submit: 'Sign In',
    validation: {
      email: {
        IsEmail: 'Invalid email address',
        IsNotEmpty: 'Email is required',
      },
      password: {
        IsString: 'Password must be text',
        Length: 'Password must be at least 8 characters',
        IsNotEmpty: 'Password is required',
      },
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
      email: {
        IsEmail: 'Invalid email address',
        IsNotEmpty: 'Email is required',
      },
      password: {
        IsString: 'Password must be text',
        Length: 'Password must be at least 8 characters',
        IsNotEmpty: 'Password is required',
      },
      confirmPassword: {
        IsString: 'Confirm password must be text',
        IsNotEmpty: 'Please confirm your password',
        Matches: 'Passwords do not match',
      },
    },
  },
} as const;
