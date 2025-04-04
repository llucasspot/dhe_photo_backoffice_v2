export type AuthI18nTranslationsKeys = {
  login: {
    title: string;
    subtitle: string;
    oauthSeparatorLabel: string;
    notAClientQuestion: string;
    notAClientButtonLabel: string;
    form: {
      submitButton: {
        label: string;
      };
      input: {
        email: {
          label: string;
          validation: {
            IsEmail: string;
            IsNotEmpty: string;
          };
        };
        password: {
          label: string;
          validation: {
            IsString: string;
            Length: string;
            IsNotEmpty: string;
          };
        };
      };
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
      email: {
        IsEmail: string;
        IsNotEmpty: string;
      };
      password: {
        IsString: string;
        Length: string;
        IsNotEmpty: string;
      };
      confirmPassword: {
        IsString: string;
        IsNotEmpty: string;
        Matches: string;
      };
    };
  };
};
