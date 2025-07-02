import { ComponentProps } from 'react';
import { FieldValues, Path } from 'react-hook-form';
import { useForm } from '@mygoodstack/form-react';

import { classNames } from '#core/react';

type FormInputProps<TFormBody extends FieldValues> = ComponentProps<'input'> & {
  formKey: Path<TFormBody>;
  classNameOnError?: string;
};

export function FormInput<TFormBody extends FieldValues>({
  formKey,
  className,
  classNameOnError,
  ...props
}: FormInputProps<TFormBody>) {
  const {
    form: {
      register,
      formState: { errors },
    },
  } = useForm<TFormBody>();

  const error = errors[formKey]?.message as string;

  return (
    <input
      {...register(formKey)}
      {...props}
      id={formKey}
      name={formKey}
      className={classNames(className, error ? classNameOnError : '')}
      aria-invalid={error ? 'true' : 'false'}
      aria-describedby={`${formKey}-error`}
    />
  );
}
