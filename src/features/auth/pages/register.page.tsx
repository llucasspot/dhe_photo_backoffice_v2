import { RegisterForm } from '../components';

export const RegisterPage = () => {
  return (
    <div className="flex items-center justify-center p-8">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Create an account
          </h1>
          <p className="text-gray-500 mt-2">Sign up to get started</p>
        </div>
        <RegisterForm />
      </div>
    </div>
  );
};
