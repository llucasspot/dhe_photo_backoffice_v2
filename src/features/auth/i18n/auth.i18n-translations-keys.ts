export type AuthI18nTranslationsKeys = {
  login: {
    title: string;
    subtitle: string;
    email: string;
    password: string;
    submit: string;
    validation: {
      emailRequired: string;
      emailInvalid: string;
      passwordRequired: string;
      passwordMinLength: string;
    };
  };
  register: {
    title: string;
    subtitle: string;
    email: string;
    password: string;
    confirmPassword: string;
    submit: string;
    validation: {
      emailRequired: string;
      emailInvalid: string;
      passwordRequired: string;
      passwordMinLength: string;
      confirmPasswordRequired: string;
      passwordsDoNotMatch: string;
    };
  };
};
