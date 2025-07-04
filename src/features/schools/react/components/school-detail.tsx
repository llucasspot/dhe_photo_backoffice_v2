import { match } from 'ts-pattern';

import { AddSchoolBankAccountBody } from '../../domain/dtos/bodies/add-school-bank-account.body.ts';
import { AddSchoolBankAccountAction } from '../../use-cases/actions/add-school-bank-account.action.ts';

import { useModal } from './modal/use-modal.hook.tsx';
import { BankAccountForm } from './bank-account-form.tsx';
import { BankAccountSection } from './bank-account-section.tsx';

import { useAction, useContextGetter } from '#action/react';
import { SchoolDto } from '#features/schools/domain';
import { SchoolGetter } from '#features/schools/use-cases';
import { useI18n } from '#i18n/react';
import { Link } from '#routing/react';

const SchoolDetailLoading = () => (
  <div className="p-8">
    <div className="animate-pulse space-y-4">
      <div className="h-8 bg-gray-200 rounded w-1/4"></div>
      <div className="space-y-3">
        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
      </div>
    </div>
  </div>
);

const SchoolDetailError = ({ error }: { error: Error | null }) => {
  const { t } = useI18n();
  const { getter } = useContextGetter(SchoolGetter);

  console.error('School detail error:', error);
  return (
    <div className="p-8">
      <div className="text-red-500">{t(getter.i18nKeys.error)}</div>
    </div>
  );
};

const SchoolDetailContent = ({ school }: { school: SchoolDto }) => {
  const { t } = useI18n();
  const { open } = useModal();
  const addSchoolBankAccount = useAction(AddSchoolBankAccountAction);

  const onAddBankAccountSubmit = async (data: AddSchoolBankAccountBody) => {
    console.log('form data : ', data);
    await addSchoolBankAccount.mutateAsync({
      schoolId: school.id,
      body: data,
    });
  };

  const onEditBankAccountSubit = async (data: AddSchoolBankAccountBody) => {
    console.log('form data : ', data);
  };

  const handleAddAccount = () => {
    open(<BankAccountForm onSubmit={onAddBankAccountSubmit} />, {
      title: 'common.actions.add',
      subtitle: 'schools.detail.bankAccounts.formDescription',
    });
  };

  const handleEditAccount = () => {
    open(<BankAccountForm edit onSubmit={onEditBankAccountSubit} />, {
      title: 'common.actions.edit',
      subtitle: 'schools.detail.bankAccounts.formDescription',
    });
  };

  return (
    <div className="p-8">
      <div className="md:flex md:items-center md:justify-between mb-8">
        <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
          {school.name}
        </h2>
        <div className="mt-4 flex space-x-3 md:mt-0 md:ml-4">
          <Link to="/schools">
            <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
              {t('common.actions.back')}
            </button>
          </Link>
        </div>
      </div>

      <div className="space-y-8">
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              {t('schools.detail.title')}
            </h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">
              {t('schools.detail.subtitle')}
            </p>
          </div>
          <div className="border-t border-gray-200">
            <dl>
              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">
                  {t('schools.detail.fields.name')}
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {school.name}
                </dd>
              </div>
              <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">
                  {t('schools.detail.fields.currency')}
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {school.currency}
                </dd>
              </div>
              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">
                  {t('schools.detail.fields.city')}
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {school.city}
                </dd>
              </div>
            </dl>
          </div>
        </div>

        <BankAccountSection
          bankAccounts={school.bankAccounts}
          onAddAccount={handleAddAccount}
          onEditAccount={handleEditAccount}
        />
      </div>
    </div>
  );
};

export const SchoolDetail = () => {
  const {
    queryResult: { data: school, isLoading, error },
  } = useContextGetter(SchoolGetter);

  return match({ school, isLoading, error })
    .with({ isLoading: true }, SchoolDetailLoading)
    .when(({ error }) => !!error, SchoolDetailError)
    .when(
      ({ school }) => !!school,
      ({ school }) => <SchoolDetailContent school={school!} />,
    )
    .run();
};
