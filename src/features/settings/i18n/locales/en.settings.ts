import { SettingsI18nTranslationsKeys } from '#features/settings';

export const enSettings: SettingsI18nTranslationsKeys = {
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
} as const;
