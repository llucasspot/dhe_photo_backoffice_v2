export type SchoolsI18nTranslationsKeys = {
  title: string;
  addSchool: string;
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
      currency: string;
      city: string;
    };
  };
  create: {
    title: string;
    pending: string;
    success: string;
    error: string;
    form: {
      name: string;
      currency: string;
      city: string;
      submit: string;
    };
    validation: {
      name: {
        IsString: string;
        IsNotEmpty: string;
        MaxLength: string;
      };
      currency: {
        IsEnum: string;
        IsNotEmpty: string;
      };
      city: {
        IsString: string;
        IsNotEmpty: string;
        MaxLength: string;
      };
    };
  };
};
