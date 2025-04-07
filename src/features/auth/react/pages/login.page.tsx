import { FieldValues, Path } from 'react-hook-form';

import { FormInput } from '../../../../components/form/inputs/form-input.tsx';
import { FormInputErrorMessage } from '../../../../components/form/inputs/form-input-error-message.tsx';
import { OAuthButton } from '../components/oauth-button.tsx';

import { useAction } from '#action/react';
import { Form } from '#components';
import { useService } from '#di/react';
import { LoginBody } from '#features/auth/domain';
import { SignInAction } from '#features/auth/use-cases';
import { useI18n } from '#i18n/react';
import { RoutingServicePort } from '#routing/domain';
import { Link } from '#routing/react';

export const LoginPage = () => {
  return (
    <div className="flex min-h-screen">
      <LeftSide />
      <RightSide />
    </div>
  );
};

type InputProps<TFormBody> = {
  formKey: Path<TFormBody>;
  type: string;
};

const Input = <TFormBody extends FieldValues>({
  formKey,
  type,
}: InputProps<TFormBody>) => {
  const { t } = useI18n();
  return (
    <div>
      <label
        htmlFor={formKey}
        className="block text-sm font-medium text-gray-700"
      >
        {t(`auth.login.form.input.${formKey}.label`)}
      </label>
      <div className="mt-1">
        <FormInput<TFormBody>
          formKey={formKey}
          type={type}
          className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
          classNameOnError="border-red-300 text-red-900 placeholder-red-300 focus:border-red-500 focus:outline-none focus:ring-red-500"
        />
      </div>
      <FormInputErrorMessage<TFormBody>
        formKey={formKey}
        className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3"
        render={(error) => {
          return (
            <p id={`${formKey}-error`} className="mt-2 text-sm text-red-600">
              {t(error)}
            </p>
          );
        }}
      />
    </div>
  );
};

const SignInForm = () => {
  const { t } = useI18n();
  const routingService = useService(RoutingServicePort);
  const signInAction = useAction(SignInAction);

  const onSubmit = async (data: LoginBody) => {
    await signInAction.mutateAsync(data);
    await routingService.redirect('/home');
  };

  return (
    <Form
      i18nPrefix="auth.login"
      dto={LoginBody}
      onSubmit={onSubmit}
      className="space-y-6"
    >
      <Input<LoginBody> formKey="email" type="email" />
      <Input<LoginBody> formKey="password" type="password" />
      <div>
        <button
          type="submit"
          className="flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          {t('auth.login.form.submitButton.label')}
        </button>
      </div>
    </Form>
  );
};

const LeftSide = () => {
  const { t } = useI18n();
  return (
    <div className="flex w-full flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:w-1/2 xl:px-24">
      <div className="mx-auto w-full max-w-sm lg:w-96">
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-10 w-10 text-indigo-600"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6zm0 8a5 5 0 1 1 0-10 5 5 0 0 1 0 10z" />
            <path d="M20 4h-3.17l-1.24-1.35A1.99 1.99 0 0 0 14.12 2H9.88c-.56 0-1.1.24-1.48.65L7.17 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm-8 13c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5z" />
          </svg>
          <h2 className="mt-6 text-3xl font-bold tracking-tight text-gray-900">
            {t('auth.login.title')}
          </h2>
          <h3 className="mt-6 text-3l tracking-tight text-gray-800">
            {t('auth.login.subtitle')}
          </h3>
        </div>

        <div className="mt-8">
          <div className="mt-6">
            <SignInForm />
          </div>
        </div>

        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-white px-2 text-gray-500">
                {t('auth.login.oauthSeparatorLabel')}
              </span>
            </div>
          </div>

          <div className="mt-6">
            <OAuthButton oauthProviderName="google">
              <svg
                className="h-5 w-5 mr-2"
                viewBox="0 0 533.5 544.3"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M533.5 278.4c0-17.4-1.6-34.1-4.6-50.3H272v95.1h147.1c-6.3 34.2-25.2 63.2-53.7 82.5v68.2h86.7c50.6-46.6 81.4-115.4 81.4-195.5z"
                  fill="#4285f4"
                />
                <path
                  d="M272 544.3c72.6 0 133.4-24.1 177.8-65.3l-86.7-68.2c-24.1 16.2-55 25.7-91.1 25.7-69.9 0-129.2-47.2-150.4-110.4H32.6v69.2c44.2 87.5 134.7 149 239.4 149z"
                  fill="#34a853"
                />
                <path
                  d="M121.6 326.1c-10.2-30.6-10.2-63.6 0-94.2V162.7H32.6c-41.3 82.6-41.3 180.9 0 263.5l89-69.2z"
                  fill="#fbbc04"
                />
                <path
                  d="M272 107.7c39.4-.6 77.1 13.9 106 40.6l79.1-79.1C407.3 24.3 341.7 0 272 0 167.3 0 76.8 61.4 32.6 149l89 69.2C142.8 154.9 202.1 107.7 272 107.7z"
                  fill="#ea4335"
                />
              </svg>
            </OAuthButton>
          </div>
        </div>

        <div className="mt-6">
          <p className="text-center text-sm text-gray-500">
            {t('auth.login.notAClientQuestion')}{' '}
            <Link
              to="/auth/register"
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              {t('auth.login.notAClientButtonLabel')}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

const RightSide = () => {
  return (
    <div className="relative hidden w-0 flex-1 lg:block">
      <img
        className="absolute inset-0 h-full w-full object-cover"
        src="https://images.unsplash.com/photo-1516383607781-913a19294fd1?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHNjaG9vbHxlbnwwfHwwfHx8MA%3D%3D"
        alt="Office workspace with laptop and desktop"
      />
    </div>
  );
};
