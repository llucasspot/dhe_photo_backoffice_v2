import { SettingsI18nTranslationsKeys } from '../settings.i18n-translations-keys';

export const frSettings: SettingsI18nTranslationsKeys = {
  title: 'Paramètres',
  common: {
    cancel: 'Annuler',
    save: 'Enregistrer',
  },
  personalInfo: {
    form: {
      title: 'Informations personnelles',
      input: {
        email: {
          label: 'Adresse email',
          validation: {
            IsEmail: 'Format email invalide',
            IsNotEmpty: "L'email est requis",
          },
        },
        firstName: {
          label: 'Prénom',
          validation: {
            IsString: 'Le prénom doit être du texte',
            Length: 'Le prénom doit contenir entre 2 et 50 caractères',
            Matches:
              'Le prénom ne peut contenir que des lettres, espaces et tirets',
          },
        },
        lastName: {
          label: 'Nom',
          validation: {
            IsString: 'Le nom doit être du texte',
            Length: 'Le nom doit contenir entre 2 et 50 caractères',
            Matches:
              'Le nom ne peut contenir que des lettres, espaces et tirets',
          },
        },
        phoneNumber: {
          label: 'Numéro de téléphone',
          validation: {
            IsNotEmpty: 'Le numéro de téléphone est requis',
            IsPhoneNumber: 'Format de numéro de téléphone invalide',
          },
        },
      },
    },

    displayName: "Nom d'affichage",
    validation: {
      displayName: {
        IsString: "Le nom d'affichage doit être du texte",
        Length: "Le nom d'affichage doit contenir entre 2 et 50 caractères",
      },
    },
  },
  companyInfo: {
    title: 'Informations de la société',
    companyName: 'Nom de la société',
    vatNumber: 'Numéro de TVA',
    subjectToVat: 'Assujetti à la TVA',
    validation: {
      companyName: {
        IsString: 'Le nom de la société doit être du texte',
        IsNotEmpty: 'Le nom de la société est requis',
        MaxLength: 'Le nom de la société ne peut pas dépasser 100 caractères',
      },
      vatNumber: {
        IsString: 'Le numéro de TVA doit être du texte',
        Matches: 'Format de numéro de TVA invalide',
      },
      subjectToVat: {
        IsBoolean: 'Assujetti à la TVA doit être une valeur booléenne',
      },
    },
  },
  address: {
    form: {
      title: 'Adresse',
      submitButton: {
        label: 'Enregistrer',
      },
      input: {
        street: {
          label: 'Rue',
          validation: {
            IsNotEmpty: 'La rue est requise',
          },
        },
        city: {
          label: 'Ville',
          validation: {
            IsString: 'La ville doit être du texte',
            IsNotEmpty: 'La ville est requise',
            MaxLength: 'Le nom de la ville ne peut pas dépasser 50 caractères',
          },
        },
        state: {
          label: 'Region / Province',
          validation: {
            IsNotEmpty: 'La région est requise',
          },
        },
        postalCode: {
          label: 'ZIP / Code postal',
          validation: {
            IsString: 'Le code postal doit être du texte',
            IsNotEmpty: 'Le code postal est requis',
            IsPostalCode: 'Le format du code postal est invalide',
          },
        },
      },
    },
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
    },
  },
  bankInfo: {
    title: 'Informations bancaires',
    iban: 'IBAN',
    bicNumber: 'BIC',
    validation: {
      ibanRequired: "L'IBAN est requis",
      ibanInvalid: "Format d'IBAN invalide",
      bicRequired: 'Le BIC est requis',
      bicInvalid: 'Format de BIC invalide',
    },
  },
} as const;
