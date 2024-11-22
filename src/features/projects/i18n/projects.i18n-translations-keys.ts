export type ProjectsI18nTranslationsKeys = {
  title: string;
  addProject: string;
  create: {
    title: string;
    form: {
      name: string;
      schoolName: string;
      lieu: string;
      submit: string;
      state: string;
    };
    validation: {
      name: {
        IsString: string;
        IsNotEmpty: string;
        MaxLength: string;
      };
      schoolName: {
        IsString: string;
        IsNotEmpty: string;
        MaxLength: string;
      };
      lieu: {
        IsString: string;
        IsNotEmpty: string;
        MaxLength: string;
      };
      state: {
        IsEnum: string;
        IsNotEmpty: string;
      };
    };
  };
};
