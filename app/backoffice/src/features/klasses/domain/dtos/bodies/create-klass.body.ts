import { Dto } from '#core/domain';

export class CreateKlassBody extends Dto<CreateKlassBody> {
  projectId!: string;
  klass!: {
    name: string;
    studentPicture: {
      fileName: string;
      file: File;
    };
  };
}
