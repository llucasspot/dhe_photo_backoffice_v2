import { AuthI18nTranslationsKeys } from '../auth.i18n-translations-keys.ts';

export const frAuth: AuthI18nTranslationsKeys = {
  login: {
    title: 'Bon retour',
    subtitle: 'Veuillez vous connecter à votre compte',
    email: 'Email',
    password: 'Mot de passe',
    submit: 'Se connecter',
    validation: {
      email: {
        IsEmail: 'Adresse email invalide',
        IsNotEmpty: "L'email est requis",
      },
      password: {
        IsString: 'Le mot de passe doit être du texte',
        Length: 'Le mot de passe doit contenir au moins 8 caractères',
        IsNotEmpty: 'Le mot de passe est requis',
      },
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
      email: {
        IsEmail: 'Adresse email invalide',
        IsNotEmpty: "L'email est requis",
      },
      password: {
        IsString: 'Le mot de passe doit être du texte',
        Length: 'Le mot de passe doit contenir au moins 8 caractères',
        IsNotEmpty: 'Le mot de passe est requis',
      },
      confirmPassword: {
        IsString: 'La confirmation du mot de passe doit être du texte',
        IsNotEmpty: 'Veuillez confirmer votre mot de passe',
        Matches: 'Les mots de passe ne correspondent pas',
      },
    },
  },
} as const;
