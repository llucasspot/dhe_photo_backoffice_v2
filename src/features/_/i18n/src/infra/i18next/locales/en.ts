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
        email: {
          IsEmail: 'Invalid email format',
          IsNotEmpty: 'Email is required',
        },
        firstName: {
          IsString: 'First name must be text',
          Length: 'First name must be between 2 and 50 characters',
          Matches: 'First name can only contain letters, spaces, and hyphens',
        },
        lastName: {
          IsString: 'Last name must be text',
          Length: 'Last name must be between 2 and 50 characters',
          Matches: 'Last name can only contain letters, spaces, and hyphens',
        },
        displayName: {
          IsString: 'Display name must be text',
          Length: 'Display name must be between 2 and 50 characters',
        },
        phoneNumber: {
          IsNotEmpty: 'Phone number is required',
          IsPhoneNumber: 'Invalid phone number format',
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
      countryIsoCode: 'Country Code',
      address1: 'Street Address',
      postalCode: 'Postal Code',
      city: 'City',
      validation: {
        countryIsoCode: {
          IsString: 'Country code must be text',
          Length: 'Country code must be exactly 2 characters',
          IsNotEmpty: 'Country code is required',
        },
        address1: {
          IsString: 'Address must be text',
          IsNotEmpty: 'Address is required',
          MaxLength: 'Address cannot exceed 100 characters',
        },
        postalCode: {
          IsString: 'Postal code must be text',
          IsNotEmpty: 'Postal code is required',
          IsPostalCode: 'Invalid postal code format',
        },
        city: {
          IsString: 'City must be text',
          IsNotEmpty: 'City is required',
          MaxLength: 'City name cannot exceed 50 characters',
        },
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
