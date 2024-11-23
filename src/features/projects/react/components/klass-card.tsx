import { KlassDto } from '#features/projects/domain';

interface KlassCardProps {
  klass: KlassDto;
}

export const KlassCard = ({ klass }: KlassCardProps) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
      <h4 className="text-sm font-medium text-gray-900 truncate">
        {klass.name}
      </h4>
    </div>
  );
};
