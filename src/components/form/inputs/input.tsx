import { ComponentProps } from 'react';
import { useFormContext } from 'react-hook-form';
import { getMetadataStorage } from 'class-validator';

import { useFormOtherContext } from '../form';

import { Dto } from '#core/domain';
import { Type } from '#di/domain';
import { useI18n } from '#i18n/react';

type InputProps = Omit<ComponentProps<'input'>, 'hidden' | 'readOnly'> & {
  label: string;
  formKey: string;
};

function isFieldRequired<TDto extends object>(
  dtoClass: Type<Dto<TDto>>,
  property: string,
): boolean {
  const metadataStorage = getMetadataStorage();
  const validations = metadataStorage.getTargetValidationMetadatas(
    dtoClass,
    dtoClass.prototype,
    false,
    false,
    undefined,
  );
  const requiredTypes = ['isDefined', 'isNotEmpty', 'minLength'];
  return validations
    .filter((v) => v.propertyName === property)
    .some((v) => requiredTypes.includes(v.name as string));
}

export function Input({
  label,
  formKey,
  className = '',
  ...props
}: InputProps) {
  const { t } = useI18n();
  const {
    register,
    formState: { errors },
  } = useFormContext();
  const { dto } = useFormOtherContext();

  const isRequired = isFieldRequired(dto, formKey);

  const error = errors[formKey]?.message as string;

  return (
    <div className="space-y-1">
      <label
        htmlFor={formKey}
        className="block text-sm font-medium text-gray-700"
      >
        {t(label)}
        {isRequired && <span className="text-red-500">*</span>}
      </label>
      <input
        className={`
          w-full px-3 py-2 border rounded-lg shadow-sm
          focus:outline-none focus:ring-2 focus:ring-blue-500
          ${error ? 'border-red-500' : 'border-gray-300'}
          ${className}
        `}
        {...register(formKey)}
        {...props}
      />
      {error && <p className="text-sm text-red-600">{t(error)}</p>}
    </div>
  );
}
