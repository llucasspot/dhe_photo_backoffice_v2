import { AddSchoolBankAccountBody } from '@domain/modules';

import { FormDebug } from '../../../../components/form/inputs/form-debug';

import { form } from '#components';
import { FormButton } from '#components';
import { useI18n } from '#i18n/react';

type BankAccountFormProps = {
  edit?: boolean;
  onSubmit?: (data: AddSchoolBankAccountBody) => void;
  onCancel?: () => void;
};

export const BankAccountForm = ({
  edit = false,
  onSubmit = () => {},
  onCancel = () => {},
}: BankAccountFormProps) => {
  const { t } = useI18n();

  return (
    <form.Form
      formName="BankAccountForm"
      dto={AddSchoolBankAccountBody}
      onSubmit={onSubmit}
      className="space-y-6"
    >
      <div>
        <div className="mt-1">
          <form.InputContainer>
            <form.Label formKey="iban" />
            <form.Input
              formKey="iban"
              type="text"
              placeholder="FR76 3000 1007 1600 0000 0000 123"
            />
            <form.ErrorLabel formKey="iban" />
          </form.InputContainer>
          {/*<Input*/}
          {/*  formKey="iban"*/}
          {/*  label="iban"*/}
          {/*  type="text"*/}
          {/*  id="iban"*/}
          {/*  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm uppercase"*/}
          {/*  placeholder="FR76 3000 1007 1600 0000 0000 123"*/}
          {/*/>*/}
        </div>
      </div>

      <div>
        <div className="mt-1">
          <form.InputContainer>
            <form.Label formKey="bic" />
            <form.Input formKey="bic" type="text" placeholder="SOGEFRPP" />
            <form.ErrorLabel formKey="bic" />
          </form.InputContainer>
          {/*<Input*/}
          {/*  formKey="bic"*/}
          {/*  label="bic"*/}
          {/*  type="text"*/}
          {/*  id="bic"*/}
          {/*  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm uppercase"*/}
          {/*  placeholder="SOGEFRPP"*/}
          {/*/>*/}
        </div>
      </div>

      <div className="flex items-start">
        <div className="flex h-5 items-center">
          <input
            id="isDefault"
            type="checkbox"
            className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
        </div>
        <div className="ml-3 text-sm">
          <label htmlFor="isDefault" className="font-medium text-gray-700">
            {/*// @ts-expect-error I18n*/}
            {t('schools.detail.bankAccounts.fields.isDefault')}
          </label>
          <p className="text-gray-500">
            {/*// @ts-expect-error I18n*/}
            {t('schools.detail.bankAccounts.fields.isDefaultHelp')}
          </p>
        </div>
      </div>

      <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
        <FormButton className="w-full justify-center sm:col-start-2">
          {edit ? t('common.actions.edit') : t('common.actions.add')}
        </FormButton>
        <button
          type="button"
          className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:col-start-1 sm:mt-0"
          onClick={onCancel}
          // disabled={isLoading}
        >
          {t('common.actions.cancel')}
        </button>
      </div>
      <FormDebug />
    </form.Form>
  );
};
