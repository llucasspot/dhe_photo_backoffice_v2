import { useForm } from '@mygoodstack/form-react';

type HiddenObjectInputProps<TValue> = {
  formKey: string;
  value: TValue;
};

export function HiddenObjectInput<TValue>({
  formKey,
  value,
}: HiddenObjectInputProps<TValue>) {
  const {
    form: {
      setValue,
      formState: { errors },
    },
  } = useForm();

  const error = errors[formKey]?.message as string;
  if (error) {
    console.log('HiddenInput error : ', error);
  }

  setValue(formKey, value);

  return <></>;
}
