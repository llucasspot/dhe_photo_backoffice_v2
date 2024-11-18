import { SettingsI18nTranslationsKeys } from '#features/settings';

export const frSettings: SettingsI18nTranslationsKeys = {
  title: 'Paramètres',
  common: {
    save: 'Enregistrer les modifications',
  },
  personalInfo: {
    title: 'Informations personnelles',
    email: 'Adresse email',
    firstName: 'Prénom',
    lastName: 'Nom',
    displayName: "Nom d'affichage",
    phoneNumber: 'Numéro de téléphone',
    validation: {
      email: {
        IsEmail: 'Format email invalide',
        IsNotEmpty: "L'email est requis",
      },
      firstName: {
        IsString: 'Le prénom doit être du texte',
        Length: 'Le prénom doit contenir entre 2 et 50 caractères',
        Matches:
          'Le prénom ne peut contenir que des lettres, espaces et tirets',
      },
      lastName: {
        IsString: 'Le nom doit être du texte',
        Length: 'Le nom doit contenir entre 2 et 50 caractères',
        Matches: 'Le nom ne peut contenir que des lettres, espaces et tirets',
      },
      displayName: {
        IsString: "Le nom d'affichage doit être du texte",
        Length: "Le nom d'affichage doit contenir entre 2 et 50 caractères",
      },
      phoneNumber: {
        IsNotEmpty: 'Le numéro de téléphone est requis',
        IsPhoneNumber: 'Format de numéro de téléphone invalide',
      },
    },
  },
  companyInfo: {
    title: 'Informations de la société',
    companyName: 'Nom de la société',
    vatNumber: 'Numéro de TVA',
    subjectToVat: 'Assujetti à la TVA',
    validation: {
      companyNameRequired: 'Le nom de la société est requis',
    },
  },
  address: {
    title: 'Adresse',
    countryIsoCode: 'Code pays',
    address1: 'Adresse',
    postalCode: 'Code postal',
    city: 'Ville',
    validation: {
      countryIsoCode: {
        IsString: 'Le code pays doit être du texte',
        Length: 'Le code pays doit contenir exactement 2 caractères',
        IsNotEmpty: 'Le code pays est requis',
      },
      address1: {
        IsString: "L'adresse doit être du texte",
        IsNotEmpty: "L'adresse est requise",
        MaxLength: "L'adresse ne peut pas dépasser 100 caractères",
      },
      postalCode: {
        IsString: 'Le code postal doit être du texte',
        IsNotEmpty: 'Le code postal est requis',
        IsPostalCode: 'Format de code postal invalide',
      },
      city: {
        IsString: 'La ville doit être du texte',
        IsNotEmpty: 'La ville est requise',
        MaxLength: 'Le nom de la ville ne peut pas dépasser 50 caractères',
      },
    },
  },
  bankInfo: {
    title: 'Informations bancaires',
    iban: 'IBAN',
    bicNumber: 'BIC',
    validation: {
      ibanRequired: "L'IBAN est requis",
      bicRequired: 'Le BIC est requis',
    },
  },
} as const;
