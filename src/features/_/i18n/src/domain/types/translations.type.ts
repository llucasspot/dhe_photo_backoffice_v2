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
    settings: string;
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
  settings: {
    title: string;
    common: {
      save: string;
    };
    personalInfo: {
      title: string;
      email: string;
      firstName: string;
      lastName: string;
      displayName: string;
      phoneNumber: string;
      validation: {
        email: {
          IsEmail: string;
          IsNotEmpty: string;
        };
        firstName: {
          IsString: string;
          Length: string;
          Matches: string;
        };
        lastName: {
          IsString: string;
          Length: string;
          Matches: string;
        };
        displayName: {
          IsString: string;
          Length: string;
        };
        phoneNumber: {
          IsNotEmpty: string;
          IsPhoneNumber: string;
        };
      };
    };
    companyInfo: {
      title: string;
      companyName: string;
      vatNumber: string;
      subjectToVat: string;
      validation: {
        companyNameRequired: string;
      };
    };
    address: {
      title: string;
      countryIsoCode: string;
      address1: string;
      postalCode: string;
      city: string;
      validation: {
        countryIsoCode: {
          IsString: string;
          Length: string;
          IsNotEmpty: string;
        };
        address1: {
          IsString: string;
          IsNotEmpty: string;
          MaxLength: string;
        };
        postalCode: {
          IsString: string;
          IsNotEmpty: string;
          IsPostalCode: string;
        };
        city: {
          IsString: string;
          IsNotEmpty: string;
          MaxLength: string;
        };
      };
    };
    bankInfo: {
      title: string;
      iban: string;
      bicNumber: string;
      validation: {
        ibanRequired: string;
        bicRequired: string;
      };
    };
  };
};
