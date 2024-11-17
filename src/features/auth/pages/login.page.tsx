import { LoginForm } from '../components';

export const LoginPage = () => {
  return (
    <div className="flex items-center justify-center p-8">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Welcome back</h1>
          <p className="text-gray-500 mt-2">Please sign in to your account</p>
        </div>
        <LoginForm />
      </div>
    </div>
  );
};
