export type StudentsI18nTranslationsKeys = {
  title: string;
  addStudent: string;
  list: {
    error: string;
    pending: string;
    empty: string;
  };
  detail: {
    title: string;
    subtitle: string;
    error: string;
    fields: {
      name: string;
    };
  };
  create: {
    title: string;
    pending: string;
    success: string;
    error: string;
    form: {
      name: string;
      submit: string;
    };
    validation: {
      name: {
        IsString: string;
        IsNotEmpty: string;
        MaxLength: string;
      };
    };
  };
};
