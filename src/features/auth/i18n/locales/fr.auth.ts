import { AuthI18nTranslationsKeys } from '../auth.i18n-translations-keys';

export const frAuth: AuthI18nTranslationsKeys = {
  login: {
    title: 'Connexion',
    subtitle: 'Bon retour, veuillez vous connecter à votre compte',
    oauthSeparatorLabel: 'Ou continuer avec',
    notAClientQuestion: 'Pas client chez nous ?',
    notAClientButtonLabel: 'Contactez nous ici',
    form: {
      submitButton: {
        label: 'Se connecter',
      },
      input: {
        email: {
          label: 'Email',
          validation: {
            IsEmail: 'Adresse email invalide',
            IsNotEmpty: "L'email est requis",
          },
        },
        password: {
          label: 'Mot de passe',
          validation: {
            IsString: 'Le mot de passe doit être du texte',
            Length: 'Le mot de passe doit contenir au moins 8 caractères',
            IsNotEmpty: 'Le mot de passe est requis',
          },
        },
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
