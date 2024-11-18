import { AuthI18nTranslationsKeys } from '../auth.i18n-translations-keys.ts';

export const frAuth: AuthI18nTranslationsKeys = {
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
      passwordMinLength: 'Le mot de passe doit contenir au moins 8 caractères',
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
      passwordMinLength: 'Le mot de passe doit contenir au moins 8 caractères',
      confirmPasswordRequired: 'Veuillez confirmer votre mot de passe',
      passwordsDoNotMatch: 'Les mots de passe ne correspondent pas',
    },
  },
} as const;
