export type ProductsI18nTranslationsKeys = {
  title: string;
  addProduct: string;
  list: {
    error: string;
    pending: string;
    empty: string;
  };
  detail: {
    title: string;
    subtitle: string;
    fields: {
      name: string;
      description: string;
      longSize: string;
      shortSize: string;
    };
  };
  create: {
    title: string;
    pending: string;
    success: string;
    error: string;
    form: {
      name: string;
      description: string;
      longSize: string;
      shortSize: string;
      submit: string;
    };
    validation: {
      name: {
        IsString: string;
        IsNotEmpty: string;
        MaxLength: string;
      };
      description: {
        IsString: string;
        MaxLength: string;
      };
      longSize: {
        IsNumber: string;
        Min: string;
      };
      shortSize: {
        IsNumber: string;
        Min: string;
      };
    };
  };
};
