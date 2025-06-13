import { SchoolsI18nTranslationsKeys } from '../schools.i18n-translations-keys';

export const frSchools: SchoolsI18nTranslationsKeys = {
  title: 'Écoles',
  addSchool: 'Ajouter une école',
  list: {
    error: 'Erreur lors du chargement des écoles.',
    pending: 'Chargement des écoles....',
    empty: 'Aucune école trouvée.',
  },
  detail: {
    title: "Informations de l'école",
    subtitle: 'Informations générales sur cette école',
    error: "Erreur lors du chargement des détails de l'école.",
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
      fields: {
        iban: 'IBAN',
        bic: 'BIC/SWIFT',
        isDefault: 'Définir comme compte par défaut',
        isDefaultHelp: 'Ce compte sera utilisé par défaut pour les paiements',
      },
      formDescription: 'Renseignez les informations bancaires de ce compte',
      validation: {
        required: 'Ce champ est requis',
        invalidIban: 'IBAN invalide',
        invalidBic: 'BIC/SWIFT invalide',
      },
    },
  },
  create: {
    title: 'Créer une nouvelle école',
    pending: "Création de l'école en cours...",
    success: 'École créée avec succès !',
    error: "Échec de la création de l'école. Veuillez réessayer.",
    form: {
      name: "Nom de l'école",
      currency: 'Devise',
      city: 'Ville',
      submit: "Créer l'école",
    },
    validation: {
      name: {
        IsString: "Le nom de l'école doit être du texte",
        IsNotEmpty: "Le nom de l'école est requis",
        MaxLength: "Le nom de l'école ne peut pas dépasser 100 caractères",
      },
      currency: {
        IsEnum: 'La devise doit être EUR',
        IsNotEmpty: 'La devise est requise',
      },
      city: {
        IsString: 'La ville doit être du texte',
        IsNotEmpty: 'La ville est requise',
        MaxLength: 'Le nom de la ville ne peut pas dépasser 100 caractères',
      },
    },
  },
} as const;
