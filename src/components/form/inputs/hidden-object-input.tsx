import { useFormContext } from 'react-hook-form';

type HiddenObjectInputProps<TValue> = {
  formKey: string;
  value: TValue;
};

export function HiddenObjectInput<TValue>({
  formKey,
  value,
}: HiddenObjectInputProps<TValue>) {
  const {
    setValue,
    formState: { errors },
  } = useFormContext();

  const error = errors[formKey]?.message as string;
  if (error) {
    console.log('HiddenInput error : ', error);
  }

  setValue(formKey, value);

  return <></>;
}
