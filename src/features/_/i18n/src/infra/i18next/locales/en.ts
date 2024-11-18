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
  settings: {
    title: 'Settings',
    common: {
      save: 'Save Changes',
    },
    personalInfo: {
      title: 'Personal Information',
      email: 'Email Address',
      firstName: 'First Name',
      lastName: 'Last Name',
      displayName: 'Display Name',
      phoneNumber: 'Phone Number',
      validation: {
        emailRequired: 'Email is required',
        emailInvalid: 'Invalid email address',
        firstNameRequired: 'First name is required',
        lastNameRequired: 'Last name is required',
        displayNameRequired: 'Display name is required',
        phoneNumber: {
          IsNotEmpty: 'Phone number is required',
          IsPhoneNumber: 'Invalid phone number',
        },
      },
    },
    companyInfo: {
      title: 'Company Information',
      companyName: 'Company Name',
      vatNumber: 'VAT Number',
      subjectToVat: 'Subject to VAT',
      validation: {
        companyNameRequired: 'Company name is required',
      },
    },
    address: {
      title: 'Address',
      countryIsoCode: 'Country',
      address1: 'Street Address',
      postalCode: 'Postal Code',
      city: 'City',
      validation: {
        countryRequired: 'Country is required',
        addressRequired: 'Street address is required',
        postalCodeRequired: 'Postal code is required',
        cityRequired: 'City is required',
      },
    },
    bankInfo: {
      title: 'Bank Information',
      iban: 'IBAN',
      bicNumber: 'BIC Number',
      validation: {
        ibanRequired: 'IBAN is required',
        bicRequired: 'BIC number is required',
      },
    },
  },
} as const;
