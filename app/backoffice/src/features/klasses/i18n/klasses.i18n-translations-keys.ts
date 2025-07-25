import { ProjectKlassDto } from '@domain/modules';

import { I18nDto } from '../../../i18n.types';

import {
  CreateGroupPictureBody,
  CreateKlassBody,
  CreateKlassesBody,
} from '#features/klasses/domain';

export type KlassesI18nTranslationsKeys = {
  dto: {
    CreateGroupPictureBody: I18nDto<CreateGroupPictureBody>;
    CreateKlassBody: I18nDto<CreateKlassBody>;
    CreateKlassesBody: I18nDto<CreateKlassesBody>;
    ProjectKlassDto: I18nDto<ProjectKlassDto>;
  };
  form: {};
  action: {};
  getter: {};
  title: string;
  addClass: string;
  detail: {
    title: string;
    subtitle: string;
    fields: {
      name: string;
    };
    groupPhoto: {
      title: string;
      dropzone: {
        instructions: string;
        hint: string;
        dragActive: string;
      };
      list: {
        empty: string;
      };
    };
  };
  create: {
    title: string;
  };
};
