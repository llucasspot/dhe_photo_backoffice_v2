import { I18nAction, I18nDto, I18nForm, I18nGetter } from '../../../i18n.types';

import { LoginBody, RegisterBody } from '#features/auth/domain';

export type AuthI18nTranslationsKeys = {
  dto: {
    LoginBody: I18nDto<LoginBody>;
    RegisterBody: I18nDto<RegisterBody>;
  };
  action: {
    AuthenticateAction: I18nAction;
    SignInAction: I18nAction;
    SignOutAction: I18nAction;
    SignUpAction: I18nAction;
  };
  getter: {
    UserInfoGetter: I18nGetter;
  };
  form: {
    SignInForm: I18nForm;
    RegisterForm: I18nForm;
  };
  login: {
    oauthSeparatorLabel: string;
    notAClientQuestion: string;
    notAClientButtonLabel: string;
    form: I18nForm;
  };
};
