import { I18nAction, I18nDto, I18nGetter } from '../../../i18n.types';
import { AddSchoolBankAccountBody } from '../domain/dtos/bodies/add-school-bank-account.body';

import { CreateSchoolBody } from '#features/schools/domain';

export type SchoolsI18nTranslationsKeys = {
  dto: {
    AddSchoolBankAccountBody: I18nDto<AddSchoolBankAccountBody>;
    CreateSchoolBody: I18nDto<CreateSchoolBody>;
  };
  action: {
    AddSchoolBankAccountAction: I18nAction;
    CreateSchoolAction: I18nAction;
  };
  getter: {
    SchoolGetter: I18nGetter;
    SchoolBankAccountsGetter: I18nGetter;
    SchoolsGetter: I18nGetter;
  };
  title: string;
  addSchool: string;
  detail: {
    title: string;
    subtitle: string;
    fields: {
      name: string;
      currency: string;
      city: string;
    };
    bankAccounts: {
      title: string;
      add: string;
      editTitle: string;
      default: string;
      empty: {
        title: string;
        description: string;
      };
      formDescription: string;
    };
  };
  create: {
    title: string;
    form: {
      submit: string;
    };
  };
};
