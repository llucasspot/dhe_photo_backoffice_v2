import { forwardRef } from 'react';

import { useI18n } from '#i18n/react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className = '', ...props }, ref) => {
    const { t } = useI18n();

    return (
      <div className="space-y-1">
        <label className="block text-sm font-medium text-gray-700">
          {t(label)}
        </label>
        <input
          ref={ref}
          className={`
          w-full px-3 py-2 border rounded-lg shadow-sm
          focus:outline-none focus:ring-2 focus:ring-blue-500
          ${error ? 'border-red-500' : 'border-gray-300'}
          ${className}
        `}
          {...props}
        />
        {error && <p className="text-sm text-red-600">{t(error)}</p>}
      </div>
    );
  },
);
