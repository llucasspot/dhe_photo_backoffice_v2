export type ProjectsI18nTranslationsKeys = {
  title: string;
  addProject: string;
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
      school: string;
      shotDate: string;
      orderEndDate: string;
      status: string;
      messageForClients: string;
    };
    dropzone: {
      instructions: string;
      hint: string;
      dragActive: string;
    };
    klasses: {
      title: string;
      creating: string;
      created: string;
      error: string;
    };
    products: {
      title: string;
      select: string;
      price: string;
      add: string;
      empty: string;
      adding: string;
      added: string;
      error: string;
      table: {
        product: string;
        price: string;
      };
    };
  };
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
