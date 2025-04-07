export type SettingsI18nTranslationsKeys = {
  title: string;
  common: {
    cancel: string;
    save: string;
  };
  personalInfo: {
    form: {
      title: string;
      input: {
        email: {
          label: string;
          validation: {
            IsEmail: string;
            IsNotEmpty: string;
          };
        };
        firstName: {
          label: string;
          validation: {
            IsString: string;
            Length: string;
            Matches: string;
          };
        };
        lastName: {
          label: string;
          validation: {
            IsString: string;
            Length: string;
            Matches: string;
          };
        };
        phoneNumber: {
          label: string;
          validation: {
            IsNotEmpty: string;
            IsPhoneNumber: string;
          };
        };
      };
    };

    displayName: string;
    validation: {
      displayName: {
        IsString: string;
        Length: string;
      };
    };
  };
  companyInfo: {
    title: string;
    companyName: string;
    vatNumber: string;
    subjectToVat: string;
    validation: {
      companyName: {
        IsString: string;
        IsNotEmpty: string;
        MaxLength: string;
      };
      vatNumber: {
        IsString: string;
        Matches: string;
      };
      subjectToVat: {
        IsBoolean: string;
      };
    };
  };
  address: {
    form: {
      title: string;
      submitButton: {
        label: string;
      };
      input: {
        street: {
          label: string;
          validation: {
            IsNotEmpty: string;
          };
        };
        city: {
          label: string;
          validation: {
            IsString: string;
            IsNotEmpty: string;
            MaxLength: string;
          };
        };
        state: {
          label: string;
          validation: {
            IsNotEmpty: string;
          };
        };
        postalCode: {
          label: string;
          validation: {
            IsString: string;
            IsNotEmpty: string;
            IsPostalCode: string;
          };
        };
      };
    };

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
    };
  };
  bankInfo: {
    title: string;
    iban: string;
    bicNumber: string;
    validation: {
      ibanRequired: string;
      ibanInvalid: string;
      bicRequired: string;
      bicInvalid: string;
    };
  };
};
