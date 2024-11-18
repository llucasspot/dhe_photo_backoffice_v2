export type Translations = {
  auth: {
    login: {
      title: string;
      subtitle: string;
      email: string;
      password: string;
      submit: string;
      validation: {
        emailRequired: string;
        emailInvalid: string;
        passwordRequired: string;
        passwordMinLength: string;
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
        emailRequired: string;
        emailInvalid: string;
        passwordRequired: string;
        passwordMinLength: string;
        confirmPasswordRequired: string;
        passwordsDoNotMatch: string;
      };
    };
  };
  navigation: {
    dashboard: string;
    schools: string;
    projects: string;
    signIn: string;
    signUp: string;
    signOut: string;
  };
  common: {
    actions: {
      add: string;
    };
    status: {
      active: string;
      inactive: string;
      published: string;
      unpublished: string;
    };
  };
  schools: {
    title: string;
    addSchool: string;
    list: {
      students: string;
      type: {
        public: string;
        private: string;
      };
    };
  };
  projects: {
    title: string;
    addProject: string;
  };
  dashboard: {
    title: string;
    welcome: string;
  };
  home: {
    title: string;
    subtitle: string;
  };
};