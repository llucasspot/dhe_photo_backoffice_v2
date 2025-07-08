import { I18nAction, I18nDto, I18nForm, I18nGetter } from '../../../i18n.types';

import {
  AddProductBody,
  CreateKlassesBody,
  CreateProjectBody,
  ProjectDto,
} from '#features/projects/domain';

export type ProjectsI18nTranslationsKeys = {
  dto: {
    AddProductBody: I18nDto<AddProductBody>;
    CreateKlassesBody: I18nDto<CreateKlassesBody>;
    CreateProjectBody: I18nDto<CreateProjectBody>;
    ProjectDto: I18nDto<ProjectDto>;
  };
  action: {
    AddProductToProjectAction: I18nAction;
    CreateGroupPictureFromFilesAction: I18nAction;
    CreateKlassesFromFilesAction: I18nAction;
    CreateProjectAction: I18nAction;
  };
  getter: {
    ProjectsGetter: I18nGetter;
    ProjectGetter: I18nGetter;
    KlassGetter: I18nGetter;
  };
  form: {
    CreateProjectForm: I18nForm;
  };
  title: string;
  addProject: string;
  detail: {
    title: string;
    subtitle: string;
    dropzone: {
      instructions: string;
      hint: string;
      dragActive: string;
    };
    klasses: {
      title: string;
    };
    products: {
      title: string;
      select: string;
      price: string;
      add: string;
      empty: string;
      table: {
        product: string;
        price: string;
      };
    };
  };
  create: {
    title: string;
  };
};
