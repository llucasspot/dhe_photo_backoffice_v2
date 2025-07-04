import { AuthI18nTranslationsKeys } from '../auth.i18n-translations-keys.ts';

export const frAuth: AuthI18nTranslationsKeys = {
  // iso
  dto: {
    LoginBody: {
      email: {
        label: 'Email',
        validation: {
          isEmail: 'Adresse email invalide',
          isNotEmpty: "L'email est requis",
        },
      },
      password: {
        label: 'Mot de passe',
        validation: {
          isString: 'Le mot de passe doit être du texte',
          length: 'Le mot de passe doit contenir au moins 8 caractères',
          isNotEmpty: 'Le mot de passe est requis',
        },
      },
    },
    RegisterBody: {
      email: {
        label: 'Email',
        validation: {
          isEmail: 'Adresse email invalide',
          isNotEmpty: "L'email est requis",
        },
      },
      password: {
        label: 'Mot de passe',
        validation: {
          isString: 'Le mot de passe doit être du texte',
          length: 'Le mot de passe doit contenir au moins 8 caractères',
          isNotEmpty: 'Le mot de passe est requis',
        },
      },
      confirmPassword: {
        label: 'Confirmer le mot de passe',
        validation: {
          isString: 'La confirmation du mot de passe doit être du texte',
          isNotEmpty: 'Veuillez confirmer votre mot de passe',
          matches: 'Les mots de passe ne correspondent pas',
        },
      },
    },
  },
  form: {
    SignInForm: {
      title: 'Créer un compte',
      subtitle: 'Bon retour, veuillez vous connecter à votre compte',
      button: {
        submit: {
          label: "S'inscrire",
        },
        reset: {
          label: 'Annuler',
        },
      },
    },
    RegisterForm: {
      title: 'Créer un compte',
      subtitle: 'Inscrivez-vous pour commencer',
      button: {
        submit: {
          label: "S'inscrire",
        },
        reset: {
          label: 'Annuler',
        },
      },
    },
  },
  action: {
    AuthenticateAction: {
      success: {
        label: 'Authentification réussie !',
      },
      pending: {
        label: 'Authentification en cours...',
      },
      error: {
        label: "Erreur lors de l'authentification.",
      },
    },
    SignInAction: {
      success: {
        label: 'Connexion réussie !',
      },
      pending: {
        label: 'Connexion en cours...',
      },
      error: {
        label: 'Erreur lors de la connexion.',
      },
    },
    SignOutAction: {
      success: {
        label: 'Déconnexion réussie',
      },
      pending: {
        label: 'Déconnexion en cours...',
      },
      error: {
        label: 'Erreur lors de la déconnexion.',
      },
    },
    SignUpAction: {
      success: {
        label: 'Compte créé avec succès !',
      },
      pending: {
        label: 'Création du compte en cours...',
      },
      error: {
        label: 'Erreur lors de la création du compte.',
      },
    },
  },
  getter: {
    UserInfoGetter: {
      success: {
        label: 'Données utilisateur chargées avec succès !',
      },
      pending: {
        label: 'Chargement des données utilisateur en cours...',
      },
      error: {
        label: 'Erreur lors du chargement des données utilisateur.',
      },
      empty: {
        label: 'Aucune donnée utilisateur trouvée.',
      },
    },
  },
  // other
  login: {
    oauthSeparatorLabel: 'Ou continuer avec',
    notAClientQuestion: 'Pas client chez nous ?',
    notAClientButtonLabel: 'Contactez nous ici',
    form: {
      title: 'Connexion',
      button: {
        submit: {
          label: 'Se connecter',
        },
        reset: {
          label: 'Annuler',
        },
      },
    },
  },
} as const;
