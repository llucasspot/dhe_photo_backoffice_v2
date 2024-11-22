export type SchoolsI18nTranslationsKeys = {
  title: string;
  addSchool: string;
  create: {
    title: string;
    form: {
      name: string;
      location: string;
      type: string;
      studentCount: string;
      submit: string;
    };
    validation: {
      name: {
        IsString: string;
        IsNotEmpty: string;
        MaxLength: string;
      };
      location: {
        IsString: string;
        IsNotEmpty: string;
        MaxLength: string;
      };
      type: {
        IsEnum: string;
        IsNotEmpty: string;
      };
      status: {
        IsEnum: string;
        IsNotEmpty: string;
      };
      studentCount: {
        IsNumber: string;
        Min: string;
        IsNotEmpty: string;
      };
    };
  };
  list: {
    students: string;
    type: {
      public: string;
      private: string;
    };
    status: {
      active: string;
      inactive: string;
    };
  };
};
