import { SettingsI18nTranslationsKeys } from '../settings.i18n-translations-keys';

export const frSettings: SettingsI18nTranslationsKeys = {
  // iso
  dto: {
    PersonalInfoDto: {
      email: {
        label: 'Adresse email',
        validation: {
          isEmail: 'Format email invalide',
          isNotEmpty: "L'email est requis",
        },
      },
      firstName: {
        label: 'Prénom',
        validation: {
          isString: 'Le prénom doit être du texte',
          length: 'Le prénom doit contenir entre 2 et 50 caractères',
          matches:
            'Le prénom ne peut contenir que des lettres, espaces et tirets',
        },
      },
      lastName: {
        label: 'Nom',
        validation: {
          isString: 'Le nom doit être du texte',
          length: 'Le nom doit contenir entre 2 et 50 caractères',
          matches: 'Le nom ne peut contenir que des lettres, espaces et tirets',
        },
      },
      phoneNumber: {
        label: 'Numéro de téléphone',
        validation: {
          isNotEmpty: 'Le numéro de téléphone est requis',
          isPhoneNumber: 'Format de numéro de téléphone invalide',
        },
      },
      displayName: {
        label: "Nom d'affichage",
        validation: {
          isString: "Le nom d'affichage doit être du texte",
          length: "Le nom d'affichage doit contenir entre 2 et 50 caractères",
        },
      },
    },
    CompanyInfoDto: {
      companyName: {
        label: 'Nom de la société',
        validation: {
          isString: 'Le nom de la société doit être du texte',
          isNotEmpty: 'Le nom de la société est requis',
          maxLength: 'Le nom de la société ne peut pas dépasser 100 caractères',
        },
      },
      vatNumber: {
        label: 'Numéro de TVA',
        validation: {
          isString: 'Le numéro de TVA doit être du texte',
          matches: 'Format de numéro de TVA invalide',
        },
      },
      subjectToVat: {
        label: 'Assujetti à la TVA',
        validation: {
          isBoolean: 'Assujetti à la TVA doit être une valeur booléenne',
        },
      },
    },
    AddressDto: {
      street: {
        label: 'Rue',
        validation: {
          isNotEmpty: 'La rue est requise',
        },
      },
      city: {
        label: 'Ville',
        validation: {
          isString: 'La ville doit être du texte',
          isNotEmpty: 'La ville est requise',
          maxLength: 'Le nom de la ville ne peut pas dépasser 50 caractères',
        },
      },
      state: {
        label: 'Region / Province',
        validation: {
          isNotEmpty: 'La région est requise',
        },
      },
      postalCode: {
        label: 'ZIP / Code postal',
        validation: {
          isString: 'Le code postal doit être du texte',
          isNotEmpty: 'Le code postal est requis',
          isPostalCode: 'Le format du code postal est invalide',
        },
      },
      countryIsoCode: {
        label: 'Code pays',
        validation: {
          isString: 'Le code pays doit être du texte',
          length: 'Le code pays doit contenir exactement 2 caractères',
          isNotEmpty: 'Le code pays est requis',
        },
      },
      address1: {
        label: 'Adresse',
        validation: {
          isString: "L'adresse doit être du texte",
          isNotEmpty: "L'adresse est requise",
          maxLength: "L'adresse ne peut pas dépasser 100 caractères",
        },
      },
    },
    BankInfoDto: {
      iban: {
        label: 'IBAN',
        validation: {
          isNotEmpty: "L'IBAN est requis",
          isIBAN: "Format d'IBAN invalide",
        },
      },
      bicNumber: {
        label: 'BIC',
        validation: {
          isNotEmpty: 'Le BIC est requis',
          matches: 'Format de BIC invalide',
        },
      },
      id: {
        label: 'Identifiant',
        validation: {},
      },
    },
  },
  form: {
    AddressForm: {
      title: 'Adresse',
      subtitle: undefined,
      button: {
        submit: {
          label: 'Enregistrer',
        },
        reset: {
          label: 'Annuler',
        },
      },
    },
    BankInfoForm: {
      title: 'Compte bancaire',
      subtitle: undefined,
      button: {
        submit: {
          label: 'Enregistrer',
        },
        reset: {
          label: 'Annuler',
        },
      },
    },
    CompanyInfoForm: {
      title: 'Informations de la société',
      subtitle: undefined,
      button: {
        submit: {
          label: 'Enregistrer',
        },
        reset: {
          label: 'Annuler',
        },
      },
    },
    PersonalInfoForm: {
      title: 'Informations personnelles',
      subtitle: undefined,
      button: {
        submit: {
          label: 'Enregistrer',
        },
        reset: {
          label: 'Annuler',
        },
      },
    },
  },
  action: {},
  getter: {},
  // other
  title: 'Paramètres',
  common: {
    cancel: 'Annuler',
    save: 'Enregistrer',
  },
  personalInfo: {
    form: {
      title: 'Informations personnelles',
      button: {
        submit: {
          label: 'Enregistrer',
        },
        reset: {
          label: 'Annuler',
        },
      },
    },
  },
  companyInfo: {
    form: {
      title: 'Informations de la société',
      button: {
        submit: {
          label: 'Enregistrer',
        },
        reset: {
          label: 'Annuler',
        },
      },
    },
  },
  address: {
    form: {
      title: 'Adresse',
      button: {
        submit: {
          label: 'Enregistrer',
        },
        reset: {
          label: 'Annuler',
        },
      },
    },
    postalCode: 'Code postal',
    city: 'Ville',
  },
  bankInfo: {
    form: {
      title: 'Informations bancaires',
      button: {
        submit: {
          label: 'Enregistrer',
        },
        reset: {
          label: 'Annuler',
        },
      },
    },
  },
} as const;
