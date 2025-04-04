import { ComponentProps } from 'react';
import { FieldValues, Path, useFormContext } from 'react-hook-form';

type FormInputProps<TFormBody extends FieldValues> = ComponentProps<'div'> & {
  formKey: Path<TFormBody>;
  render: (error: string) => React.ReactNode;
};

export function FormInputErrorMessage<TFormBody extends FieldValues>({
  formKey,
  render: render,
}: FormInputProps<TFormBody>) {
  const {
    formState: { errors },
  } = useFormContext();

  const error = errors[formKey]?.message as string;

  return error && render(error);
}
