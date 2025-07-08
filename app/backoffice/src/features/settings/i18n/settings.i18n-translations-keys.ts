import { I18nDto, I18nForm } from '../../../i18n.types';

import {
  AddressDto,
  BankInfoDto,
  CompanyInfoDto,
  PersonalInfoDto,
} from '#features/settings/domain';

export type SettingsI18nTranslationsKeys = {
  dto: {
    PersonalInfoDto: I18nDto<PersonalInfoDto>;
    CompanyInfoDto: I18nDto<CompanyInfoDto>;
    AddressDto: I18nDto<AddressDto>;
    BankInfoDto: I18nDto<BankInfoDto>;
  };
  form: {
    AddressForm: I18nForm;
    BankInfoForm: I18nForm;
    CompanyInfoForm: I18nForm;
    PersonalInfoForm: I18nForm;
  };
  action: {};
  getter: {};
  title: string;
  common: {
    cancel: string;
    save: string;
  };
  personalInfo: {
    form: I18nForm;
  };
  companyInfo: {
    form: I18nForm;
  };
  address: {
    form: I18nForm;
    postalCode: string;
    city: string;
  };
  bankInfo: {
    form: I18nForm;
  };
};
