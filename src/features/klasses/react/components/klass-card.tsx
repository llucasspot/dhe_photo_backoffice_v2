import { KlassDto } from '#features/klasses/domain';
import { Link } from '#routing/react';

interface KlassCardProps {
  klass: Omit<KlassDto, 'project'>;
  numberStudentCodeToShow?: number;
}

export const KlassCard = ({
  klass,
  numberStudentCodeToShow = 2,
}: KlassCardProps) => {
  return (
    <Link
      to="/projects/$projectId/klasses/$klassId"
      params={{ projectId: klass.projectId, klassId: klass.id }}
      className="block"
    >
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
        <h4 className="text-sm font-medium text-gray-900 truncate">
          {klass.name}
        </h4>
        <p className="text-sm text-gray-500 mt-1">
          {klass.students.length} students
        </p>
        {numberStudentCodeToShow && (
          <div className="mt-2 flex flex-wrap gap-1">
            {klass.students.slice(0, numberStudentCodeToShow).map((student) => (
              <div
                key={student.id}
                className="px-2 py-1 bg-gray-100 rounded-full text-xs text-gray-600"
                title={student.code}
              >
                {student.code}
              </div>
            ))}
            {klass.students.length > 5 && (
              <div className="px-2 py-1 bg-gray-100 rounded-full text-xs text-gray-600">
                +{klass.students.length - numberStudentCodeToShow}
              </div>
            )}
          </div>
        )}
      </div>
    </Link>
  );
};
