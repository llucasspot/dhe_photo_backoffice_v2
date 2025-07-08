import { CreateProjectForm } from '../components/forms/create-project-form';

export const CreateProjectPage = () => {
  return (
    <div className="p-8">
      <div className="bg-white shadow rounded-lg p-6">
        <CreateProjectForm />
      </div>
    </div>
  );
};
