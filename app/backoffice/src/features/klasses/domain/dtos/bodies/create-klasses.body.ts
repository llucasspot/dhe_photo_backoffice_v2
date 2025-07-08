import { CreateKlassBody } from './create-klass.body';

import { Dto } from '#core/domain';

export class CreateKlassesBody extends Dto<CreateKlassesBody> {
  projectId!: string;
  klasses!: CreateKlassBody['klass'][];
}
