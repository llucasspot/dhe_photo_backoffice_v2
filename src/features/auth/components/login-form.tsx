import { useForm } from 'react-hook-form';

import { Button, Input } from '#components';
import { useService } from '#di/react';
import { useAuth } from '#lib/auth';
import { RoutingServicePort } from '#routing/domain';

interface LoginFormData {
  email: string;
  password: string;
}

export const LoginForm = () => {
  const routingService = useService(RoutingServicePort);
  const { login } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>();

  const onSubmit = async (data: LoginFormData) => {
    console.log(data);
    login('mock_token');
    await routingService.redirect('/home');
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <Input
        label="Email"
        type="email"
        error={errors.email?.message}
        {...register('email', {
          required: 'Email is required',
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message: 'Invalid email address',
          },
        })}
      />

      <Input
        label="Password"
        type="password"
        error={errors.password?.message}
        {...register('password', {
          required: 'Password is required',
          minLength: {
            value: 8,
            message: 'Password must be at least 8 characters',
          },
        })}
      />

      <Button type="submit" className="w-full">
        Sign In
      </Button>
    </form>
  );
};
