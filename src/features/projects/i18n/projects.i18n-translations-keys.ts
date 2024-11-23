export type ProjectsI18nTranslationsKeys = {
  title: string;
  addProject: string;
  create: {
    title: string;
    pending: string;
    success: string;
    error: string;
    form: {
      name: string;
      school: string;
      shotDate: string;
      orderEndDate: string;
      messageForClients: string;
      state: string;
      submit: string;
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
      shotDate: {
        IsDate: string;
        IsNotEmpty: string;
      };
      orderEndDate: {
        IsDate: string;
        IsNotEmpty: string;
      };
      messageForClients: {
        IsString: string;
        MaxLength: string;
      };
      state: {
        IsEnum: string;
        IsNotEmpty: string;
      };
    };
  };
};
