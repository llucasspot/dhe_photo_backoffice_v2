import { SchoolsI18nTranslationsKeys } from '../schools.i18n-translations-keys';

export const frSchools: SchoolsI18nTranslationsKeys = {
  title: 'Écoles',
  addSchool: 'Ajouter une école',
  create: {
    title: 'Créer une nouvelle école',
    form: {
      name: "Nom de l'école",
      location: 'Emplacement',
      type: "Type d'école",
      studentCount: "Nombre d'élèves",
      submit: "Créer l'école",
    },
    validation: {
      name: {
        IsString: "Le nom de l'école doit être du texte",
        IsNotEmpty: "Le nom de l'école est requis",
        MaxLength: "Le nom de l'école ne peut pas dépasser 100 caractères",
      },
      location: {
        IsString: "L'emplacement doit être du texte",
        IsNotEmpty: "L'emplacement est requis",
        MaxLength: "L'emplacement ne peut pas dépasser 100 caractères",
      },
      type: {
        IsEnum: "Type d'école invalide",
        IsNotEmpty: "Le type d'école est requis",
      },
      status: {
        IsEnum: "Statue d'école invalide",
        IsNotEmpty: "Le statue d'école est requis",
      },
      studentCount: {
        IsNumber: "Le nombre d'élèves doit être un nombre",
        Min: "Le nombre d'élèves doit être au moins 0",
        IsNotEmpty: "Le nombre d'élèves est requis",
      },
    },
  },
  list: {
    students: 'élèves',
    type: {
      public: 'publique',
      private: 'privée',
    },
    status: {
      active: 'active',
      inactive: 'inactive',
    },
  },
} as const;
