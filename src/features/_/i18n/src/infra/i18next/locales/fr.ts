import { Translations } from '#i18n/domain';

export const fr: Translations = {
  auth: {
    login: {
      title: 'Bon retour',
      subtitle: 'Veuillez vous connecter à votre compte',
      email: 'Email',
      password: 'Mot de passe',
      submit: 'Se connecter',
      validation: {
        emailRequired: "L'email est requis",
        emailInvalid: 'Adresse email invalide',
        passwordRequired: 'Le mot de passe est requis',
        passwordMinLength:
          'Le mot de passe doit contenir au moins 8 caractères',
      },
    },
    register: {
      title: 'Créer un compte',
      subtitle: 'Inscrivez-vous pour commencer',
      email: 'Email',
      password: 'Mot de passe',
      confirmPassword: 'Confirmer le mot de passe',
      submit: "S'inscrire",
      validation: {
        emailRequired: "L'email est requis",
        emailInvalid: 'Adresse email invalide',
        passwordRequired: 'Le mot de passe est requis',
        passwordMinLength:
          'Le mot de passe doit contenir au moins 8 caractères',
        confirmPasswordRequired: 'Veuillez confirmer votre mot de passe',
        passwordsDoNotMatch: 'Les mots de passe ne correspondent pas',
      },
    },
  },
  navigation: {
    dashboard: 'Tableau de bord',
    schools: 'Écoles',
    projects: 'Projets',
    signIn: 'Se connecter',
    signUp: "S'inscrire",
    signOut: 'Se déconnecter',
    settings: 'Paramètres',
  },
  common: {
    actions: {
      add: 'Ajouter',
    },
    status: {
      active: 'Actif',
      inactive: 'Inactif',
      published: 'Publié',
      unpublished: 'Non publié',
    },
  },
  schools: {
    title: 'Écoles',
    addSchool: 'Ajouter une école',
    list: {
      students: 'élèves',
      type: {
        public: 'publique',
        private: 'privée',
      },
    },
  },
  projects: {
    title: 'Projets',
    addProject: 'Ajouter un projet',
  },
  dashboard: {
    title: 'Tableau de bord',
    welcome: 'Bienvenue sur votre tableau de bord !',
  },
  home: {
    title: 'Bienvenue sur Notre Application',
    subtitle:
      'Commencez par créer un compte ou connectez-vous si vous en avez déjà un.',
  },
  settings: {
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
        emailRequired: "L'email est requis",
        emailInvalid: 'Adresse email invalide',
        firstNameRequired: 'Le prénom est requis',
        lastNameRequired: 'Le nom est requis',
        displayNameRequired: "Le nom d'affichage est requis",
        phoneNumber: {
          IsNotEmpty: 'Le numéro de téléphone est requis',
          IsPhoneNumber: 'Le numéro de téléphone est invalide',
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
      countryIsoCode: 'Pays',
      address1: 'Adresse',
      postalCode: 'Code postal',
      city: 'Ville',
      validation: {
        countryRequired: 'Le pays est requis',
        addressRequired: "L'adresse est requise",
        postalCodeRequired: 'Le code postal est requis',
        cityRequired: 'La ville est requise',
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
  },
} as const;
