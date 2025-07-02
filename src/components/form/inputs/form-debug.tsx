import { useEffect } from 'react';
import { useForm } from '@mygoodstack/form-react';

export function FormDebug() {
  const {
    form: {
      formState: { errors },
    },
  } = useForm();

  useEffect(() => {
    console.log('errors : ', errors);
  }, [errors]);

  return null;
}
