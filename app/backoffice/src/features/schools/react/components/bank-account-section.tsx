import { BankAccountDto } from '@domain/schools';
import { PlusIcon } from '@heroicons/react/20/solid';

import { useI18n } from '#i18n/react';

interface BankAccountSectionProps {
  bankAccounts: BankAccountDto[];
  onAddAccount: () => void;
  onEditAccount: (account: BankAccountDto) => void;
}

export const BankAccountSection = ({
  bankAccounts = [],
  onAddAccount,
  onEditAccount,
}: BankAccountSectionProps) => {
  const { t } = useI18n();

  const formatIban = (iban: string) => {
    return iban.replace(/(.{4})/g, '$1 ').trim();
  };

  return (
    <div className="mt-8">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium text-gray-900">
          {t('schools.detail.bankAccounts.title')}
        </h3>
        <button
          type="button"
          onClick={onAddAccount}
          className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <PlusIcon className="-ml-0.5 mr-1 h-4 w-4" aria-hidden="true" />
          {t('schools.detail.bankAccounts.add')}
        </button>
      </div>

      {bankAccounts.length === 0 ? (
        <div className="text-center py-8 border-2 border-dashed border-gray-300 rounded-lg">
          <svg
            className="mx-auto h-12 w-12 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1}
              d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
            />
          </svg>
          <h3 className="mt-2 text-sm font-medium text-gray-900">
            {t('schools.detail.bankAccounts.empty.title')}
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            {t('schools.detail.bankAccounts.empty.description')}
          </p>
          <div className="mt-6">
            <button
              type="button"
              onClick={onAddAccount}
              className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <PlusIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
              {t('schools.detail.bankAccounts.add')}
            </button>
          </div>
        </div>
      ) : (
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <ul className="divide-y divide-gray-200">
            {bankAccounts.map((account) => (
              <li key={account.id} className="px-4 py-4 sm:px-6">
                <div className="flex items-center justify-between">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center rounded-full bg-blue-100">
                        <svg
                          className="h-6 w-6 text-blue-600"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.5}
                            d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                          />
                        </svg>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm text-gray-500">
                          {formatIban(account.iban)}
                        </div>
                        <div className="text-sm text-gray-500">
                          {formatIban(account.bic)}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="ml-4 flex-shrink-0">
                    <button
                      type="button"
                      onClick={() => onEditAccount(account)}
                      className="font-medium text-blue-600 hover:text-blue-500"
                    >
                      {t('common.actions.edit')}
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
