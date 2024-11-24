import { KlassDto } from './klass.dto.ts';

export abstract class KlassesServicePort {
  abstract getKlass(id: string): Promise<Omit<KlassDto, 'project'>>;
}
