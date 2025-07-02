import { KlassesI18nTranslationsKeys } from '../klasses.i18n-translations-keys';

export const frKlasses: KlassesI18nTranslationsKeys = {
  dto: {
    CreateGroupPictureBody: {
      projectId: {
        label: 'Projet',
        validation: {},
      },
      klassId: {
        label: 'Classe',
        validation: {},
      },
      photo: {
        label: 'Photo',
        validation: {},
      },
    },
    CreateKlassBody: {
      projectId: {
        label: 'Projet',
        validation: {},
      },
      klass: {
        label: 'Classe',
        validation: {},
      },
    },
    CreateKlassesBody: {
      projectId: {
        label: 'Projet',
        validation: {},
      },
      klasses: {
        label: 'Classes',
        validation: {},
      },
    },
    KlassDto: {
      projectId: {
        label: 'Projet',
        validation: {},
      },
      id: {
        label: 'Identifiant',
        validation: {},
      },
      name: {
        label: 'Nom',
        validation: {},
      },
      project: {
        label: 'Projet',
        validation: {},
      },
      students: {
        label: 'Étudiants',
        validation: {},
      },
      studentIds: {
        label: 'Étudiants',
        validation: {},
      },
      photos: {
        label: 'Photos',
        validation: {},
      },
      photoIds: {
        label: 'Photos',
        validation: {},
      },
    },
  },
  title: 'Classes',
  addClass: 'Ajouter une classe',
  detail: {
    title: 'Détails de la classe',
    subtitle: 'Voir les informations détaillées de cette classe.',
    fields: {
      name: 'Nom de la classe',
    },
    groupPhoto: {
      title: 'Photos de groupe',
      dropzone: {
        instructions: 'Déposez une photo de groupe ici',
        hint: 'Cliquez ou glissez-déposez un fichier image',
        dragActive: 'Déposez la photo ici',
      },
      list: {
        empty: 'Aucune photo de groupe pour le moment',
      },
    },
  },
  create: {
    title: 'Créer une nouvelle classe',
  },
} as const;
