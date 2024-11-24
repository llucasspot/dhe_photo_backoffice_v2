import { CreateKlassBody } from './create-klass.body.ts';

import { Dto } from '#core/domain';

export class CreateKlassesBody extends Dto<CreateKlassesBody> {
  projectId!: string;
  klasses!: CreateKlassBody['klass'][];
}
