import { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';

export function FormDebug() {
  const {
    formState: { errors },
  } = useFormContext();

  useEffect(() => {
    console.log('errors : ', errors);
  }, [errors]);

  return null;
}
