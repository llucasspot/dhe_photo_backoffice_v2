export type ProjectsI18nTranslationsKeys = {
  title: string;
  addProject: string;
  create: {
    title: string;
    form: {
      name: string;
      school: string;
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
      schoolId: {
        IsString: string;
        IsNotEmpty: string;
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
