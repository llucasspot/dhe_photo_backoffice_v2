import { KlassCard } from './klass-card';

import { KlassDto } from '#features/projects/domain';

interface KlassGridProps {
  klasses: Omit<KlassDto, 'project'>[];
}

export const KlassGrid = ({ klasses }: KlassGridProps) => {
  if (!klasses.length) return null;

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mt-4">
      {klasses.map((klass) => (
        <KlassCard key={klass.id} klass={klass} />
      ))}
    </div>
  );
};
