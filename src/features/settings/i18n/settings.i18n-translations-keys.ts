export type SettingsI18nTranslationsKeys = {
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
      ibanInvalid: string;
      bicRequired: string;
      bicInvalid: string;
    };
  };
};
