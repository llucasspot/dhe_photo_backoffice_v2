import { I18nDto, I18nGetter } from '../../../i18n.types';

import { CreateStudentBody } from '#features/students/domain';

export type StudentsI18nTranslationsKeys = {
  dto: {
    CreateStudentBody: I18nDto<CreateStudentBody>;
  };
  form: {};
  action: {};
  getter: {
    StudentsGetter: I18nGetter;
  };
  title: string;
  addStudent: string;
  detail: {
    title: string;
    subtitle: string;
    fields: {
      name: string;
    };
  };
  create: {
    title: string;
  };
};
