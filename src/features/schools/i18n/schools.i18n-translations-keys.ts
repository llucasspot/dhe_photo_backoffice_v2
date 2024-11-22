export type SchoolsI18nTranslationsKeys = {
  title: string;
  addSchool: string;
  create: {
    title: string;
    form: {
      name: string;
      currency: string;
      city: string;
      submit: string;
    };
    success: string;
    error: string;
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
