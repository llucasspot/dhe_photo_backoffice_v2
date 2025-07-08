import { SchoolsI18nTranslationsKeys } from '../schools.i18n-translations-keys';

export const frSchools: SchoolsI18nTranslationsKeys = {
  // iso
  dto: {
    AddSchoolBankAccountBody: {
      iban: {
        label: 'IBAN',
        validation: {
          isNotEmpty: 'Ce champ est requis',
          isIBAN: 'IBAN invalide',
        },
      },
      bic: {
        label: 'BIC/SWIFT',
        validation: {
          isNotEmpty: 'Ce champ est requis',
          matches: 'BIC/SWIFT invalide',
        },
      },
    },
    CreateSchoolBody: {
      name: {
        label: "Nom de l'école",
        validation: {
          isString: "Le nom de l'école doit être du texte",
          isNotEmpty: "Le nom de l'école est requis",
          maxLength: "Le nom de l'école ne peut pas dépasser 100 caractères",
        },
      },
      currency: {
        label: 'Devise',
        validation: {
          isEnum: 'La devise doit être EUR',
          isNotEmpty: 'La devise est requise',
        },
      },
      city: {
        label: 'Ville',
        validation: {
          isString: 'La ville doit être du texte',
          isNotEmpty: 'La ville est requise',
          maxLength: 'Le nom de la ville ne peut pas dépasser 100 caractères',
        },
      },
    },
  },
  form: {
    CreateSchoolForm: {
      title: "Création de l'école",
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
  action: {
    AddSchoolBankAccountAction: {
      success: {
        label: 'Compte bancaire ajouté avec succès !',
      },
      pending: {
        label: 'Ajout du compte bancaire en cours...',
      },
      error: {
        label: "Erreur lors de l'ajout du compte bancaire.",
      },
    },
    CreateSchoolAction: {
      success: {
        label: 'École créée avec succès !',
      },
      pending: {
        label: "Création de l'école en cours...",
      },
      error: {
        label: "Erreur lors de la création de l'école. Veuillez réessayer.",
      },
    },
  },
  getter: {
    SchoolGetter: {
      success: {
        label: 'École chargée avec succès !',
      },
      pending: {
        label: "Chargement de l'école en cours...",
      },
      error: {
        label: "Erreur lors du chargement de l'école.",
      },
      empty: {
        label: 'École non trouvée.',
      },
    },
    SchoolBankAccountsGetter: {
      success: {
        label: 'Comptes bancaires chargés avec succès !',
      },
      pending: {
        label: 'Chargement des comptes bancaires en cours...',
      },
      error: {
        label: 'Erreur lors du chargement des comptes bancaires.',
      },
      empty: {
        label: 'Aucun compte bancaire trouvé.',
      },
    },
    SchoolsGetter: {
      success: {
        label: 'Écoles chargées avec succès !',
      },
      pending: {
        label: 'Chargement des écoles en cours...',
      },
      error: {
        label: 'Erreur lors du chargement des écoles.',
      },
      empty: {
        label: 'Aucune école trouvée.',
      },
    },
  },
  // other
  title: 'Écoles',
  addSchool: 'Ajouter une école',
  detail: {
    title: "Informations de l'école",
    subtitle: 'Informations générales sur cette école',
    fields: {
      name: "Nom de l'école",
      currency: 'Devise',
      city: 'Ville',
    },
    bankAccounts: {
      title: 'Comptes bancaires',
      add: 'Ajouter un compte',
      editTitle: 'Modifier le compte bancaire',
      default: 'Par défaut',
      empty: {
        title: 'Aucun compte bancaire',
        description: 'Ajoutez un compte bancaire pour cette école',
      },
      formDescription: 'Renseignez les informations bancaires de ce compte',
    },
  },
  create: {
    title: 'Créer une nouvelle école',
    form: {
      submit: "Créer l'école",
    },
  },
} as const;
